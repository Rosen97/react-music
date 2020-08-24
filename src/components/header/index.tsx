import React from "react";
import cns from 'classnames';
import "./index.scss";

interface HeaderProps {
  title: string;
  isMarquee: boolean;
  backMethod?: () => void;
  [propsName: string]: any;
}

// 函数组件拿不到ref，需要使用forwardRef
const Header = React.forwardRef(
  (props: HeaderProps, ref?: React.Ref<HTMLDivElement>) => {
    const { title, isMarquee , backMethod, history } = props;

    const goBack = () => {
      backMethod ? backMethod() : history.goBack();
    };

    return (
      <div className="header-wrap" ref={ref}>
        <span className={cns('head-left', isMarquee && 'slide')} onClick={goBack}>返回</span>
        {!isMarquee ? (
          <span className="title">歌单</span>
        ) : (
          <span className="marquee">{title}</span>
        )}
      </div>
    );
  }
);

export default React.memo(Header);
