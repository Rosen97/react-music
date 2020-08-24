import React from "react";
import { renderRoutes } from "react-router-config";
import Player from "../player";
import Menu from "./components/Menu/index";

const Home = (props: any) => {
  const { route } = props;
  const list = [
    { label: "推荐", path: "/recommend" },
    { label: "热歌榜", path: "/hot" },
    { label: "搜索", path: "/search" },
  ];

  return (
    <div className="page-container">
      <Menu list={list} />
      <Player />
      {renderRoutes(route.routes)}
    </div>
  );
};

export default Home;
