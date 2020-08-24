import React from "react";
import { formatNum } from "../../../utils/index";
import { ablumPropsTypes } from "../store/reducer";

const HeadInfo: React.FC<ablumPropsTypes> = (props) => {
  const { coverImgUrl, subscribedCount, name, creator } = props;

  return (
    <div className="ablum-head">
      <div
        className="drag-head"
        style={{ background: `url(${coverImgUrl})` }}
      ></div>
      <div className="ablum-pic">
        <img src={coverImgUrl} alt="背景"/>
        <span className="count">{formatNum(subscribedCount, 'zero', 4, 1)}</span>
      </div>
      <div className="ablum-info">
        <div className="name">{name}</div>
        <div className="author">
          <img src={creator.avatarUrl} alt="头像" />
          <span>{creator.nickname}</span>
        </div>
      </div>
    </div>
  );
};

export default HeadInfo;

HeadInfo.defaultProps = {
  coverImgUrl: "",
  subscribedCount: 0,
  name: "",
};
