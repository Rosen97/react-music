import React from "react";
import Home from "../views/home/index";
import Hot from "../views/hot/index";
import Recommend from "../views/recommend/index";
import Ablum from "../views/ablum/index";
import { Redirect } from "react-router";

const routes = [
  {
    path: "/",
    component: Home,
    routes: [
      {
        path: "/",
        exact: true,
        // 重定向
        render: () => <Redirect to={"/recommend"} />,
      },
      {
        path: "/recommend",
        component: Recommend,
        routes: [
          {
            path: "/recommend/:id",
            component: Ablum,
          },
        ],
      },
      {
        path: "/hot",
        component: Hot,
      },
    ],
  },
];

export default routes;
