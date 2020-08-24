import React from "react";
import Scroll from "../../../../components/scroll";
import cns from 'classnames';
import { songInfoTypes } from "../../store/reducer";

interface playListPropsTypes {
  currentIndex: number;
  list: Array<songInfoTypes>;
  changeSong: (index: number) => void;
  hidePlayList: () => void;
}

const PlayList: React.FC<playListPropsTypes> = (props) => {
  const { currentIndex, list, hidePlayList, changeSong } = props;
  return (
    <div className="play-l-modal" onClick={hidePlayList}>
      <div
        className="play-l-wrap"
        onClick={(evt) => {
          evt.stopPropagation();
        }}
      >
        <div className="title">
          当前播放 <span>({list.length})</span>
        </div>
        <div className="play-list">
          <Scroll>
            {list.map((item, index) => {
              return (
                <div className="list-item" key={item.id} onClick={() => changeSong(index)}>
                  <span className={cns("name", currentIndex === index && 'active')}>{item.name}</span>
                  <span className={cns("author", currentIndex === index && 'active')}>&nbsp;-&nbsp;{item.ar[0].name}</span>
                </div>
              );
            })}
          </Scroll>
        </div>
      </div>
    </div>
  );
};

export default PlayList;
