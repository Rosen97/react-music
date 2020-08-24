import React, { useState, useRef, useEffect, useCallback } from "react";
import { lyricPropsTypes } from "../../index";
import Scroll from "../../../../components/scroll";
import cns from "classnames";

interface RefObject {
  getBScroll: () => void;
}

const PlayLyric = (props: {
  lyricList: Array<lyricPropsTypes>;
  currentTime: number;
  currentIndex: number;
}) => {
  const { lyricList, currentTime, currentIndex } = props;
  const [currentLineIndex, setCurrentIndex] = useState<number>(0);
  const lyricLineRefs = useRef<any>([]);
  const lyricScrollRef = useRef<RefObject>(null);

  useEffect(() => {
    if (lyricList.length === 0 || currentTime === 0 || !lyricScrollRef.current)
      return;
    let index = lyricList.findIndex((item) => item.time > currentTime * 1000);
    let bScroll: any = lyricScrollRef.current.getBScroll();
    index >= 0 && setCurrentIndex(index - 1);
    if (index > 6) {
      let lineEl = lyricLineRefs.current[index - 6].current;
      bScroll &&
        bScroll.scrollToElement &&
        bScroll.scrollToElement(lineEl, 1000);
    } else {
      bScroll && bScroll.scrollTo && bScroll.scrollTo(0, 0, 0);
    }
  }, [currentTime, currentIndex]);

  return (
    <Scroll ref={lyricScrollRef}>
      <ul>
        {lyricList.length > 0 &&
          lyricList.map((item, index) => {
            lyricLineRefs.current[index] = React.createRef();
            return (
              <li
                className={cns(currentLineIndex === index && "active")}
                key={item.time}
                ref={lyricLineRefs.current[index]}
              >
                {item.txt}
              </li>
            );
          })}
      </ul>
    </Scroll>
  );
};

export default PlayLyric;
