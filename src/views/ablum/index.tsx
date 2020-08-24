import React, { useEffect, useRef, useState, useCallback } from "react";
import Header from "../../components/header/index";
import HeadInfo from "./components/head-info";
import PlayHead from "./components/play-head";
import ListItem from "./components/list-item";
import Scroll from "../../components/scroll";
import { connect } from "react-redux";
import { playSong} from '../player/store/actionCreator';
import { stateProps } from "./store/reducer";
import { getAblunInfo } from "./store/actionCreator";
import { songInfo } from "./components/list-item";
import { CSSTransition } from "react-transition-group";
import "./index.scss";

const Ablum = (props: any) => {
  const { ablumInfo, playList, playInfo ,getAblumInfoDispatch, playSongDispatch } = props;
  const id = props.match.params.id;
  const headRef = useRef() as any;
  const [isMarquee, setMarquee] = useState<boolean>(false);
  const [showStatus, setSHowStatus] = useState<boolean>(true);

  useEffect(() => {
    getAblumInfoDispatch(id);
    // eslint-disable-next-line
  }, [id]);

  // 监听滚动
  const handleScroll = useCallback(
    (pos: any) => {
      if (!headRef || !headRef.current) return;
      const headHeight = 40;
      let percent = Math.abs(pos.y / headHeight);
      if (-pos.y > 0) {
        headRef.current.style.backgroundColor = "#d44439";
        headRef.current.style.opacity = Math.min(1, (percent - 1) / 2);
        setMarquee(true);
      } else {
        headRef.current.style.backgroundColor = "";
        headRef.current.style.opacity = 1;
        setMarquee(false);
      }
    },
    // eslint-disable-next-line
    [ablumInfo]
  );

  const backMethod = useCallback(() => {
    setSHowStatus(false);
  }, []);

  const handleClick = (index: number) => {
    const isSame = playInfo.id === playList[index].id;
    playSongDispatch({list: playList, isSame, index, isShow: true})
  }

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={props.history.goBack}
    >
      <div className="ablum-wrap">
        <Header
          title={ablumInfo.name}
          isMarquee={isMarquee}
          {...props}
          ref={headRef}
          backMethod={backMethod}
        ></Header>
        <div className="ablum-content">
          <Scroll handleScroll={handleScroll}>
            <HeadInfo {...ablumInfo} />
            <div className="song-list">
              <PlayHead
                {...{
                  length: (ablumInfo.tracks && ablumInfo.tracks.length) || 0,
                  count: ablumInfo.subscribedCount,
                }}
              />
              {ablumInfo.tracks &&
                ablumInfo.tracks.map((item: songInfo, index: number) => {
                  return (
                    <ListItem
                      key={item.id}
                      info={{ ...item}}
                      index={index}
                      onClick={(index: number) => handleClick(index)}
                    />
                  );
                })}
            </div>
          </Scroll>
        </div>
      </div>
    </CSSTransition>
  );
};

interface ablumState {
  ablum: stateProps;
  player: any
}

const mapStateToProps = (state: ablumState) => ({
  ablumInfo: state.ablum.ablumInfo,
  playList: state.player.playList,
  playInfo: state.player.songInfo
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getAblumInfoDispatch(id: number) {
      dispatch(getAblunInfo(id));
    },
    playSongDispatch(data: {list:any, isSame: boolean, index: number, isShow: boolean}){
      playSong(dispatch, data);
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Ablum));
