import React, { useState, useEffect } from "react";
import cns from "classnames";

interface playCDPropstypes {
  currentTime: number;
  url: string;
  playing: boolean;
}

const PlayCD: React.FC<playCDPropstypes> = (props) => {
  const {url, playing } = props;
  const [setCurrentIndex] = useState<number>(0);

  return (
    <div className="play-cd">
      <div className={cns("needle", !playing && "is-pause")}></div>
      <div className={cns("cd-con", "is-play", !playing && "is-pause")}>
        <img src={url} width="100%" height="100%" alt="" />
      </div>
    </div>
  );
};

export default PlayCD;
