import * as actionTypes from './constants';

export interface stateProps{
    count: number,
    recommentList: Array<any>,
    bannerList: Array<any>
}

export interface actionProps{
    type: string,
    data: any
}

const defaultState: stateProps = {
    count: 0,
    recommentList: [],
    bannerList: []
}

export default(state = defaultState, action: actionProps) => {
    const {type, data} = action;
    switch (type) {
        case actionTypes.CHANGE_COUNT:
            return {...state, count: data};
        case actionTypes.RECOMMEND_LIST:
            return {...state, recommentList: data}
        case actionTypes.BANNER_LIST:
            return {...state, bannerList: data}
        default:
            return state;
    }
}