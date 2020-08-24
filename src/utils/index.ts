// 处理数字
export const formatNum = (
  num: number,
  type: string = "",
  zeroNum?: number,
  zeroPoint?: number
) => {
  switch (type) {
    case "thounsand":
      let reg = /\d{1,3}(?=(\d{3})+$)/g;
      return (num + "").replace(reg, "$&,");
    case "zero":
      return `${(num / Math.pow(10, zeroNum || 1)).toFixed(zeroPoint || 0)}`;
    default:
      return `${num}`;
  }
};

// 转化播放时间
export const formatePlayTime = (time: number) => {
  const minute = parseInt((time / 60).toString())
    .toString()
    .padStart(2, "0");
  const second = parseInt((time % 60).toString())
    .toString()
    .padStart(2, "0");

  return `${minute}:${second}`;
};

//拼接出歌曲的url链接
export const getSongUrl = (id: number) => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};
