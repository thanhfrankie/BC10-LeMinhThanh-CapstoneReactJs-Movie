import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { quanLyPhimServ } from "../../services/quanLyPhim";
import "./banner.scss";
const Banner = () => {
  const [arrBanner, setArrBanner] = useState([]);
  const contentStyle = {
    margin: 0,
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  useEffect(() => {
    quanLyPhimServ
      .getAllBanner()
      .then((res) => {
        console.log(res);
        setArrBanner(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="carousel_banner">
      <Carousel
        nextArrow={
          <div>
            <i class="fa-solid fa-chevron-right"></i>
          </div>
        }
        prevArrow={
          <div>
            <i class="fa-solid fa-chevron-left"></i>
          </div>
        }
        arrows={true}
        afterChange={onChange}
      >
        {arrBanner.map((banner, index) => {
          return (
            <div key={index} className="h-screen-70 ">
              <img className="w-full" src={banner.hinhAnh} alt="" />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Banner;
