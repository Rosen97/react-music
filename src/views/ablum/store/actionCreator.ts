import * as actionTypes from "./constants";
import { ablumInfoRequest } from "../../../utils/api";
import { ablumPropsTypes } from "./reducer";
import {setPlayList} from '../../player/store/actionCreator';

export const setAblumInfo = (data: ablumPropsTypes) => ({
  type: actionTypes.ABLUM_INFO,
  data,
});

export const setAblumSongList = (data: Array<any>) => ({
  type: actionTypes.ABLUM_SONG_LIST,
  data
})

export const getAblunInfo = (id: number) => {
  return async (dispatch: any) => {
    const data = await ablumInfoRequest(id);
    dispatch(setAblumInfo(data.playlist));
    dispatch(setAblumSongList(data.privileges));
    dispatch(setPlayList(data.playlist.tracks));
  };
};
