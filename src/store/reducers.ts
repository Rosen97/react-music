import { combineReducers } from "redux";
import { reducer as recommendReducer } from "../views/recommend/store/index";
import { reducer as ablumReducer } from "../views/ablum/store/index";
import { reducer as playerReducer } from "../views/player/store/index";

// 合并reducer
export default combineReducers({
  recommend: recommendReducer,
  ablum: ablumReducer,
  player: playerReducer,
});
