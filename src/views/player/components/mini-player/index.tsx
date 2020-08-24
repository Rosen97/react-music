import React from "react";
import { songInfoTypes } from "../../store/reducer";
import cns from "classnames";

interface miniPlayerPropsTypes {
  info: songInfoTypes;
  playing: boolean;
  changePlayStatus: () => void;
  changePlayShow: () => void;
  showPlayList: () => void;
}

const MiniPlayer: React.FC<miniPlayerPropsTypes> = (props) => {
  const { info, playing, changePlayStatus, changePlayShow, showPlayList } = props;
  return (
    <div className="mini-player" onClick={changePlayShow}>
      <div className="mini-left">
        <img src={info.al.picUrl} alt="" />
        <div className="info">
          <span className="name">{info.name}</span>
          <span className="desc">横滑可以切换上下首哦</span>
        </div>
      </div>
      <div className="mini-right">
        <span
          className="icon"
          onClick={(evt) => {
            evt.stopPropagation();
            changePlayStatus();
          }}
        >
          <i
            className={cns("iconfont", playing ? "iconpause" : "iconbofang")}
          ></i>
        </span>
        <span
          className="icon"
          onClick={(evt) => {
            evt.stopPropagation();
            showPlayList();
          }}
        >
          <i className="iconfont iconPlayListbofangliebiao"></i>
        </span>
      </div>
    </div>
  );
};

export default MiniPlayer;
