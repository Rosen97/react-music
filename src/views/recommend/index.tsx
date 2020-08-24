import React, { useEffect } from "react";
import { renderRoutes } from "react-router-config";
import Slider from "../../components/slider";
import List from "./components/list/index";
import FloorTitle from "../../components/floor-title";
import Refresh from "../../components/refresh";
import { connect } from "react-redux";
import {
  changeCount,
  getRecommendList,
  getBannerList,
} from "./store/actionCreator";
import { stateProps } from "./store/reducer";

const Recommend = (props: any) => {
  const {
    bannerList,
    recommendList,
    getRecommendListDispatch,
    getBannerListDispatch,
    route,
  } = props;

  // 获取推荐订单列表
  useEffect(() => {
    if (!bannerList.length) {
      getBannerListDispatch();
    }

    if (!recommendList.length) {
      getRecommendListDispatch();
    }

    // eslint-disable-next-line
  }, []);

  const onRefresh = (callback: () => void) => {
    getBannerListDispatch();
    getRecommendListDispatch();
    setTimeout(() => {
      callback && callback();
    }, 2000);
  };

  return (
    <div className="container">
      <div className="page-wrap">
        <Refresh container=".page-wrap" onRefresh={onRefresh} />
        <Slider bannerList={bannerList}></Slider>
        <FloorTitle title={"推荐歌单"} />
        <List list={recommendList} {...props} />
      </div>
      {renderRoutes(route.routes)}
    </div>
  );
};

interface recommendState {
  recommend: stateProps;
}

const mapStateToProps = (state: recommendState) => ({
  count: state.recommend.count,
  bannerList: state.recommend.bannerList,
  recommendList: state.recommend.recommentList,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    initCount(count: number) {
      dispatch(changeCount(count));
    },
    getRecommendListDispatch() {
      dispatch(getRecommendList());
    },
    getBannerListDispatch() {
      dispatch(getBannerList());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Recommend));
