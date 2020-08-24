import React, { useEffect, useState } from "react";
import cns from "classnames";

interface controlPropsTypes {
  mode: string,
  playing: boolean;
  changeMode: () => void;
  changePlayStatus: () => void;
  changeToPre: () => void;
  changeToNext: () => void;
  showPlayList: () => void;
} 

const Control: React.FC<controlPropsTypes> = (props) => {
  const {mode, playing, changeMode, changePlayStatus, changeToPre, changeToNext, showPlayList} = props;
  const iconList = [
    {
      label: "mode",
      name: "",
    },
    {
      label: "pre",
      name: "iconLeftarrow",
    },
    {
      label: "play",
      name: "",
    },
    {
      label: "next",
      name: "iconRightarrow",
    },
    {
      label: "list",
      name: "iconPlayListbofangliebiao",
    },
  ];
  const modeStatus: any = {
    0: 'iconshunxubofang',
    1: 'iconsuijibofang',
    2: 'iconxunhuan'
  }
  const [list, setList] = useState<Array<{label: string, name: string}>>([]);

  useEffect(() => {
    iconList[0].name = modeStatus[mode];
    iconList[2].name = playing ? 'iconpause' : 'iconbofang';
    setList(iconList)
  }, [playing, mode])

  const handleClick = (label: string) => {

    switch(label){
      case 'mode':
        changeMode();
        break;
      case 'pre':
        changeToPre();
        break;
      case 'next':
        changeToNext();
        break;
      case 'play':
        changePlayStatus();
        break;
      case 'list':
        showPlayList();
        break;
      default:
        break;

    }
  }

  return (
    <div className="control-config">
      {list.map((item) => {
        return (
          <span className="icon" key={item.label} onClick={()=>handleClick(item.label)}>
            <i className={cns("iconfont", item.name)}></i>
          </span>
        );
      })}
    </div>
  );
};

export default Control;
