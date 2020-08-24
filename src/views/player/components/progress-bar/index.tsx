import React, { useRef } from "react";
import {formatePlayTime} from '../../../../utils/index';
import cns from 'classnames';
 
interface progressPropsTypes {
  currentTime: number;
  duringTime: number;
  changePercent: (time: number) => void
}

const ProgressBar: React.FC<progressPropsTypes> = (props) => {
  const { currentTime, duringTime, changePercent } = props;

  const circlrRef = useRef() as any;
  const progressRef = useRef() as any;

  const handleClick = (evt: any) => {
    evt.persist();
    const rect = progressRef.current.getBoundingClientRect();
    const offsetWidth = evt.pageX - rect.left;   // 获取进度条边距
    const time = (offsetWidth/rect.width) * duringTime;
    circlrRef.current.style.left = `${offsetWidth}px`;
    changePercent(time)

  }
  return (
    <div className="progress-bar">
      <div className="time start">{formatePlayTime(currentTime)}</div>
      <div className="line" onClick={handleClick} ref={progressRef}>
          <span className="circle" style={{left: `${(Math.floor(currentTime)/duringTime*100)}%`}} ref={circlrRef}></span>
      </div>
      <div className="time end">{formatePlayTime(duringTime)}</div>
    </div>
  );
};

export default ProgressBar;
