import * as actionTypes from "./constants";

export interface authorCreator {
  avatarUrl: string;
  nickname: string;
  [propsName: string]: any;
}

export interface ablumPropsTypes {
  id: number;
  coverImgUrl: string;
  subscribedCount: number;
  name: string;
  creator: authorCreator;
  [propsName: string]: any;
}

export interface actionProps {
  type: string;
  data: any;
}

export interface privilegesTypes{
  id: number,
  
}

export interface stateProps {
  ablumInfo: ablumPropsTypes;
  privileges: Array<any>
}

const defaultState: stateProps = {
  ablumInfo: {
    id: 0,
    coverImgUrl: "",
    subscribedCount: 0,
    name: "",
    creator: {
      avatarUrl: "",
      nickname: "",
    },
  },
  privileges: []
};

export default (state = defaultState, action: actionProps) => {
  const { type, data } = action;
  switch (type) {
    case actionTypes.ABLUM_INFO:
      return { ...state, ablumInfo: data };
    case actionTypes.ABLUM_SONG_LIST:
      return {...state, privileges: data}
    default:
      return state;
  }
};
