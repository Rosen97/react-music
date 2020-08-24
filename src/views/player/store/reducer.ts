import * as actionTypes from "./constants";

export interface songInfoTypes {
  id?: number;
  name?: string;
  [propsName: string]: any;
}

export interface actionProps {
  type: string;
  data: any;
}

export interface stateProps {
  mode: number; // 播放模式
  songInfo: songInfoTypes;
  playerShow: boolean; // 是否显示播放器
  playing: boolean; // 播放状态
  currentIndex: number; // 当前播放索引
  playList: Array<songInfoTypes>; // 播放列表
  listShow: boolean; // 播放列表窗口
}

const defaultState: stateProps = {
  mode: 0,   // 0-顺序播放  1-随机播放  3-循环播放
  songInfo: {},
  playerShow: false,
  playing: false,
  currentIndex: 0,
  playList: [],
  listShow: false,
};

export default (state = defaultState, action: actionProps) => {
  const { type, data } = action;
  switch (type) {
    case actionTypes.SET_PLAY_MODE:
      return {...state, mode: data};
    case actionTypes.SET_SONG_INFO:
      return { ...state, songInfo: data };
    case actionTypes.SET_PLAY_SHOW:
      return { ...state, playerShow: data };
    case actionTypes.SET_PLAYING:
      return { ...state, playing: data };
    case actionTypes.SET_CURRENT_INDEX:
      return { ...state, currentIndex: data };
    case actionTypes.SET_PLAY_LIST:
      return { ...state, playList: data };
    case actionTypes.SET_LIST_SHOW:
      return { ...state, listShow: data };
    default:
      return state;
  }
};