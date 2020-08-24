import React from "react";

interface titlePropsTypes {
  title: string;
}

const FloorTitle: React.FC<titlePropsTypes> = (props) => {
  return <div className="floor-title">{props.title}</div>;
};

export default FloorTitle;

FloorTitle.defaultProps = {
  title: "",
};
