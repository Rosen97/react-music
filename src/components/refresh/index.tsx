import React, { useEffect, useState, useRef, TouchEvent } from "react";
import cns from "classnames";
import "./index.scss";

interface refreshPropstypes {
  // 滚动容器dom selector 指定
  container: string;
  // 下拉距离
  distance?: number;
  // 刷新回调
  onRefresh?: (func: () => void) => void;
}

const Refresh: React.FC<refreshPropstypes> = (props) => {
  const { container, distance = 80 , onRefresh } = props;
  const [moveY, setMoveY] = useState<number>(0);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const refreshRef = useRef() as any;
  const scrollRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const moveRef = useRef<number>(0);
  const isLoadingRef = useRef<boolean>(false);

  const handleScroll: any = (evt: { target: HTMLDivElement }) => {
    scrollRef.current = evt.target.scrollTop;
  };

  const touchstartHandle: any = (evt: TouchEvent) => {
    startRef.current = evt.touches[0].pageY;
  };

  const touchmoveHandle: any = (evt: TouchEvent) => {
    if (isLoadingRef.current) return;

    const offsetY = evt.touches[0].pageY - startRef.current;
    if (offsetY > 0 && scrollRef.current === 0) {
      const movePageY = offsetY > distance ? distance : offsetY;
      moveRef.current = movePageY;
      refreshRef.current.style.opacity = movePageY / distance;
      refreshRef.current.style.top = movePageY + "px";
      setMoveY(movePageY);
    }
  };

  const touchendHandle = () => {
    // 刷新中 or 非下拉
    if(isLoadingRef.current || moveRef.current === 0) return;

    isLoadingRef.current = true;
    if (moveRef.current === distance) {
      // 刷新
      setIsLoading(true);
      onRefresh && onRefresh(markReset);
    } else {
      markReset();
    }
  };

  // 重置参数
  const markReset = () => {
    setIsLoading(false);
    setIsEnd(true);
    setMoveY(0);
    setTimeout(() => {
      isLoadingRef.current = false;
      moveRef.current = 0;
      setIsEnd(false);
    }, 300);
  };

  useEffect(() => {
    const conEle = document.querySelector(container);
    conEle?.addEventListener("scroll", handleScroll, false);
    conEle?.addEventListener("touchstart", touchstartHandle, false);
    conEle?.addEventListener("touchmove", touchmoveHandle, false);
    conEle?.addEventListener("touchend", touchendHandle, false);

    return () => {
      conEle?.removeEventListener("scroll", handleScroll);
      conEle?.removeEventListener("touchstart", touchstartHandle);
      conEle?.removeEventListener("touchmove", touchmoveHandle);
      conEle?.removeEventListener("touchend", touchendHandle);
    };
  }, [container]);

  return (
    <div
      className={cns("refresh", isEnd && "back", isLoading && 'is-loading')}
      style={{ opacity: moveY / distance, top: moveY, transform: `rotate(${moveY/distance * 360}deg)` }}
      ref={refreshRef}
    >
      <div className="refresh-con"></div>
    </div>
  );
};

export default Refresh;

Refresh.defaultProps = {
  container: "document",
  distance: 100,
};
