import React, { useRef, useEffect, useState } from "react";
import PlayHeader from "./components/header";
import PlayCD from "./components/play-cd";
import PlayLyric from "./components/play-lyric";
import ProgressBar from "./components/progress-bar";
import Control from "./components/contorl";
import PlayList from "./components/play-list";
import MiniPlayer from "./components/mini-player";  
import { connect } from "react-redux";
import { stateProps, songInfoTypes } from "./store/reducer";
import {
  setPlayMode,
  setPlaying,
  setPlayerShow,
  setCurrentIndex,
  setSongInfo,
  setListShow,
} from "./store/actionCreator";
import { CSSTransition } from "react-transition-group";
import { getSongUrl } from "../../utils/index";
import { getLyricRequest } from "../../utils/api";
import Lyric from "../../utils/lyric-parser";
import cns from "classnames";
import "./index.scss";

export interface lyricPropsTypes {
  time: number;
  txt: string;
}

const Player = (props: any) => {
  const {
    mode,
    songInfo,
    playerShow,
    playing,
    currentIndex,
    playList,
    listShow,
    setSongInfoDispatch,
    setPlayerShowDispatch,
    setPlayingDispatch,
    setCurrentIndexDispatch,
    setListShowDispatch,
    setPlayModeDispatch,
  } = props;

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duringTime, setDuringTime] = useState<number>(0);
  const [currentState, setCurrentState] = useState<string>("cd");
  const [lyricList, setLyricList] = useState<Array<lyricPropsTypes>>([]);
  const audioRef = useRef() as any;

  useEffect(() => {
    if (playList.length === 0 || Object.keys(songInfo).length === 0) return;
    const info = playList[currentIndex];
    audioRef.current.src = getSongUrl(info.id);
    audioRef.current.autoplay = true;
    audioRef.current.timeUpdate = timeUpdateHandle;
    setSongInfoDispatch(info);
    setDuringTime(info.dt / 1000);
    getLyric(info.id);
  }, [currentIndex, songInfo]);

  // 转换歌词信息
  const getLyric = async (id: number) => {
    const data = await getLyricRequest(id);
    const lyric = data.lrc && data.lrc.lyric;
    const list = new Lyric(lyric, () => {}, 1);
    setLyricList(list.lines);
  };

  // 更换播放模式
  const changeMode = () => {
    const modeNum = mode === 2 ? 0 : mode + 1;
    setPlayModeDispatch(modeNum);
  };

  // 播放进度更新
  const timeUpdateHandle = (data: any) => {
    setCurrentTime(data.target.currentTime);
  };

  // 切换播放进度
  const changePercent = (time: number) => {
    audioRef.current.currentTime = time;
  };

  // 播放/暂停
  const changePlayStatus = () => {
    const playEventName = playing ? "pause" : "play";
    audioRef.current[playEventName]();
    setPlayingDispatch(!playing);
  };

  // 上一首
  const changeToPre = () => {
    const index = currentIndex === 0 ? playList.length - 1 : currentIndex - 1;
    setCurrentIndexDispatch(index);
  };

  // 下一首 or 播放结束
  const changeToNext = () => {
    if (mode === 3) {
      setTimeout(handleLoop, 1000);
    } else {
      // 下一首索引
      const index = currentIndex === playList.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndexDispatch(index);
    }
  };

  // 循环播放
  const handleLoop = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  // 更换歌曲
  const changeSong = (index: number) => {
    setCurrentIndexDispatch(index);
  };

  // 加载歌曲失败
  const handleError = () => {
    console.log("播放失败！");
  };

  return (
    <div>
      {playerShow ? (
        <CSSTransition
          in={playerShow}
          timeout={300}
          classNames="fade"
          appear={true}
          unmountOnExit
        >
          <div className="player-wrap">
            <PlayHeader
              name={songInfo.name || ""}
              author={songInfo.ar[0].name}
              onClick={() => setPlayerShowDispatch(false)}
            />
            <div className="player-bg">
              <img src={songInfo.al.picUrl} alt="songBg" />
            </div>
            <div
              className="player-middle"
              onClick={() => {
                currentState === "cd"
                  ? setCurrentState("lyric")
                  : setCurrentState("cd");
              }}
            >
              <div className={cns(currentState === "cd" && "active")}>
                <PlayCD
                  currentTime={currentTime}
                  url={songInfo.al.picUrl}
                  playing={playing}
                ></PlayCD>
              </div>
              <div className={cns(currentState === "lyric" && "active")}>
                <PlayLyric
                  currentIndex={currentIndex}
                  lyricList={lyricList}
                  currentTime={currentTime}
                ></PlayLyric>
              </div>
            </div>

            <ProgressBar
              currentTime={currentTime}
              duringTime={duringTime}
              changePercent={changePercent}
            ></ProgressBar>
            <Control
              mode={mode}
              playing={playing}
              changeMode={changeMode}
              changePlayStatus={changePlayStatus}
              changeToPre={changeToPre}
              changeToNext={changeToNext}
              showPlayList={() => setListShowDispatch(true)}
            ></Control>
          </div>
        </CSSTransition>
      ) : null}

      {Object.keys(songInfo).length > 0 && (
        <MiniPlayer
          playing={playing}
          info={songInfo}
          changePlayStatus={changePlayStatus}
          changePlayShow={() => setPlayerShowDispatch(true)}
          showPlayList={() => setListShowDispatch(true)}
        ></MiniPlayer>
      )}
      {listShow && playList.length > 0 && (
        <PlayList
          currentIndex={currentIndex}
          list={playList}
          hidePlayList={() => setListShowDispatch(false)}
          changeSong={changeSong}
        ></PlayList>
      )}
      <audio
        autoPlay={playing}
        ref={audioRef}
        onTimeUpdate={timeUpdateHandle}
        onEnded={changeToNext}
        onError={handleError}
      ></audio>
    </div>
  );
};

const mapStateToProps = (state: { player: stateProps }) => ({
  mode: state.player.mode,
  songInfo: state.player.songInfo,
  playerShow: state.player.playerShow,
  playing: state.player.playing,
  currentIndex: state.player.currentIndex,
  playList: state.player.playList,
  listShow: state.player.listShow,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    setPlayModeDispatch(mode: number) {
      dispatch(setPlayMode(mode));
    },
    setSongInfoDispatch(info: songInfoTypes) {
      dispatch(setSongInfo(info));
    },
    setPlayerShowDispatch(bool: boolean) {
      dispatch(setPlayerShow(bool));
    },
    setPlayingDispatch(bool: boolean) {
      dispatch(setPlaying(bool));
    },
    setCurrentIndexDispatch(index: number) {
      dispatch(setCurrentIndex(index));
    },
    setListShowDispatch(bool: boolean) {
      dispatch(setListShow(bool));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player));
