import React from "react";
import { NavLink } from "react-router-dom";

interface listItem {
  label: string;
  path: string;
}

interface MenuProps {
  list: Array<listItem>;
}

const Menu: React.FC<MenuProps> = (props) => {
  const { list } = props;
  return (
    <div className="menu-list">
      {list.map((item) => {
        return (
          <NavLink to={item.path} activeClassName="selected" key={item.label}>
            {item.label}
          </NavLink>
        );
      })}
    </div>
  );
};

export default Menu;

Menu.defaultProps = {
  list: [],
};
