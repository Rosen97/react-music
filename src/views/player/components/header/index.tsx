import React from "react";
interface headerPropsTypes {
  name: string;
  author?: string;
  onClick: () => void;
}

const PlayHeader: React.FC<headerPropsTypes> = (props) => {
  return (
    <div className="player-header">
      <span className="back" onClick={props.onClick}>
        返回
      </span>
      <div className="title">
        <span>{props.name}</span>
        <span>{props.author}</span>
      </div>
    </div>
  );
};

export default PlayHeader;
