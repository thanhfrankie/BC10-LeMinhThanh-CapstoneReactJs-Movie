import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { quanLyPhimServ } from "../../services/quanLyPhim";
import "./banner.scss";
import ReactPlayer from "react-player";

export default function Banner() {
  const [arrBanner, setArrBanner] = useState([]);
  const [trailerMovie, setTrailerMovie] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [currentBannerId, setCurrentBannerId] = useState(null);

  useEffect(() => {
    quanLyPhimServ
      .getAllBanner()
      .then(function (res) {
        setArrBanner(res.data.content);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const handleOpen = (idBanner) => {
    setCurrentBannerId(idBanner);
    if (idBanner === 1) {
      setTrailerMovie("https://www.youtube.com/watch?v=uqJ9u7GSaYM");
    } else if (idBanner === 2) {
      setTrailerMovie("https://www.youtube.com/watch?v=QnrHVynRwTM");
    } else if (idBanner === 3) {
      setTrailerMovie("https://www.youtube.com/watch?v=3JPgwgMoMZE");
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentBannerId(null);
  };

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <div className="carousel_banner">
      <div>
        <Carousel
          nextArrow={
            <div>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          }
          prevArrow={
            <div>
              <i className="fa-solid fa-arrow-left"></i>
            </div>
          }
          arrows={true}
          dots={true}
          afterChange={onChange}
        >
          {arrBanner.map((banner, index) => (
            <div key={index} className="h-screen-70 relative">
              <img className="w-full" src={banner.hinhAnh} alt="" />
              <div className=" absolute inset-0 flex items-center justify-center">
                <button
                  className="play-button"
                  onClick={() => handleOpen(banner.maBanner)}
                >
                  <div className="icon_item">
                    <i class="fa-light fa-play icon_content"></i>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      {currentBannerId && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="relative modal-content">
            <ReactPlayer
              url={trailerMovie}
              playing
              controls
              width="800px"
              height="450px"
            />
            <button
              className="absolute top-2 right-2 text-white"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
