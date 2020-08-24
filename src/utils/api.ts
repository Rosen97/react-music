import HTTP from "./http";

// 歌单搜索
export const keywordSearchRequest = (keywords: string) => {
  return HTTP.get(`/search/suggest?keywords=${keywords}`);
};

// 首页轮播图
export const bannerListRequest = () => {
  return HTTP.get("/banner");
};

// 歌单推荐
export const recommendListRequest = () => {
  return HTTP.get("/personalized");
};

// 专辑信息
export const ablumInfoRequest = (id: number) => {
  return HTTP.get(`/playlist/detail?id=${id}`);
};

// 歌词
export const getLyricRequest = (id: number) => {
  return HTTP.get(`/lyric?id=${id}`);
};

// MV
export const getMvDetail = (id: number) => {
  return HTTP.get(`/mv/url?id=${id}`);
}
