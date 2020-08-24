import React, { useEffect } from "react";
import Swiper from "swiper";
import "swiper/css/swiper.css";
import './index.scss';

interface sliderPropsTypes {
  bannerList: Array<any>;
}

const Slider: React.FC<sliderPropsTypes> = (props) => {
  const { bannerList } = props;

  useEffect(() => {
    let sliderSwiper = null;
    if(!sliderSwiper) {
      sliderSwiper = new Swiper(".slider-container", {
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: { el: ".swiper-pagination" },
      });
    }
  }, [bannerList.length]);

  return (
    <div className="slider-container">
      <div className="swiper-wrapper">
        {bannerList.map((slider) => {
          return (
            <div className="swiper-slide" key={slider.imageUrl}>
              <div className="slider-nav">
                <img
                  src={slider.imageUrl}
                  width="100%"
                  height="100%"
                  alt="推荐"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default Slider;

Slider.defaultProps = {
	bannerList: []
}
