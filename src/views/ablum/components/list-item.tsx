import React from "react";

export interface songInfo {
  index?: number;
  id: number;
  name: string;
  [propsName: string]: any;
}

interface listPropsTypes {
  info: songInfo;
  index: number;
  onClick: (index: number)=> void
}

const ListItem: React.FC<listPropsTypes> = (props) => {
  const { info, index, onClick } = props;
  const handleClick = () => {
    onClick(index)
  }
  return (
    <div className="song-item" onClick={handleClick}>
      <div className="song-num">{index+1}</div>
      <div className="song-info">
        <span>{info.name}</span>
        <span>
          {info.ar[0].name} - {info.al.name}
        </span>
      </div>
    </div>
  );
};

export default ListItem;
