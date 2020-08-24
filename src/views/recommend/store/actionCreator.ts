import * as actionTypes from './constants';
import {recommendListRequest, bannerListRequest} from '../../../utils/api';

export const changeCount = (data: number) => ({
    type: actionTypes.CHANGE_COUNT,
    data
})

export const setRecommendList = (data: Array<any>) => ({
    type: actionTypes.RECOMMEND_LIST,
    data
})

export const setBannerList = (data: Array<any>) => ({
    type: actionTypes.BANNER_LIST,
    data
})

// 获取推荐列表信息
export const getRecommendList = () => {
    return async(dispatch: any) => {
        const data = await recommendListRequest();
        dispatch(setRecommendList(data.result))
    }
}

// 获取轮播图数据
export const getBannerList = () => {
    return async(dispatch: any) => {
        const data = await bannerListRequest();
        dispatch(setBannerList(data.banners));
    }
} 