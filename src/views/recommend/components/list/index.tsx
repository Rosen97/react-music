import React from "react";
// import LazyLoad from "react-lazyload";
import { formatNum } from "../../../../utils/index";
import "./index.scss";

interface listPropsTypes {
  list: Array<any>,
  [propsName: string]: any
}

const List: React.FC<listPropsTypes> = (props) => {
  const { list, history } = props;

  const toDetail = (id: number) => {
    history.push(`/recommend/${id}`);
  }

  return (
    <div className="recommend-list">
      {list.length > 0 &&
        list.map((item) => {
          return (
            <div className="list-item" key={item.id} onClick={() => toDetail(item.id)}>
              {/* <LazyLoad
                scrollContainer={'.recommend-list'}
                placeholder={
                  <img
                    src={require("./music.png")}
                    alt="music"
                  />
                }
              >
                <img
                  src={item.picUrl + "?param=300x300"}
                  alt="music"
                />
              </LazyLoad> */}
              <img
                  src={item.picUrl + "?param=300x300"}
                  alt="music"
                />
              <div className="desc">{item.name}</div>
              <span className="count">
                {formatNum(item.playCount, "zero", 4)}万
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default List;

List.defaultProps = {
  list: [],
};
