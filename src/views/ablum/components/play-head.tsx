import React from "react";
import { formatNum } from "../../../utils/index";

export interface headPropsType {
  length: number;
  count: number;
}

const PlayHead: React.FC<headPropsType> = (props) => {
  return (
    <div className="play-con">
      <div className="play-left">
        播放全部 <span> &nbsp;&nbsp;(共{props.length}首)</span>
      </div>
      <div className="save">收藏({formatNum(props.count, 'zero', 4, 1)}万)</div>
    </div>
  );
};

export default PlayHead;
