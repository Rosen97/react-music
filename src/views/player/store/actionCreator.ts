import * as actionTypes from "./constants";
import { songInfoTypes } from "./reducer";

export const setPlayMode = (data: number) => ({
  type: actionTypes.SET_PLAY_MODE,
  data,
});

export const setSongInfo = (data: songInfoTypes) => ({
  type: actionTypes.SET_SONG_INFO,
  data,
});

export const setPlayerShow = (data: boolean) => ({
  type: actionTypes.SET_PLAY_SHOW,
  data,
});

export const setPlaying = (data: boolean) => ({
  type: actionTypes.SET_PLAYING,
  data,
});

export const setCurrentIndex = (data: number) => ({
  type: actionTypes.SET_CURRENT_INDEX,
  data,
});

export const setPlayList = (data: Array<songInfoTypes>) => ({
  type: actionTypes.SET_PLAY_LIST,
  data,
});

export const setListShow = (data: boolean) => ({
  type: actionTypes.SET_LIST_SHOW,
  data,
});

// 播放歌单
export const playSong = (
  dispatch: any,
  data: { list: any; isSame: boolean; index: number; isShow: boolean }
) => {
  if (data.isShow && !data.isSame) {
    dispatch(setPlaying(true));
    dispatch(setCurrentIndex(data.index));
    dispatch(setSongInfo({ ...data.list[data.index] }));
  }
  dispatch(setPlayerShow(data.isShow));
};
