import React from "react";
import { Route, Switch } from "react-router-dom";

export interface routeProps {
  readonly path: string;
  exact?: boolean;
  component: any;
  [propsName: string]: any;
}

const renderRoutes = (
  routes: Array<routeProps>,
  extraProps: any = {},
  switchProps: any = {}
) => {
  routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => {
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={(props) => (
            <route.component {...props} {...extraProps} route={route} />
          )}
        ></Route>;
      })}
    </Switch>
  ) : null;
};

export default renderRoutes;
