import React, { useEffect, useState } from "react";
import { quanLyPhimServ } from "../../services/quanLyPhim";
import { Carousel } from "antd";
import "./listMovie.scss";
const ListMovie = () => {
  const [arrMovie, setArrMovie] = useState([]);

  useEffect(() => {
    quanLyPhimServ
      .getAllMovie()
      .then((res) => {
        const movies = res.data.content;
        const chunks = [];
        for (let i = 0; i < movies.length; i += 3) {
          chunks.push(movies.slice(i, i + 3));
        }
        setArrMovie(chunks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <div className="listMovie">
      <Carousel
        arrows={true}
        afterChange={onChange}
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
      >
        {arrMovie.map((chunk, index) => (
          <div className="listMovie">
            <div key={index}>
              <div className="grid grid-cols-3 gap-10">
                {chunk.map((movie) => (
                  <div key={movie.maPhim}>
                    <div className="movie_item space-y-4">
                      {/* <img
                        className="w-full h-96 object-cover rounded"
                        src={movie.hinhAnh}
                        alt=""
                      />
                      <div>
                        <h3 className="mb-3">
                          <span className="bg-orange-600 text-white rounded py-1 px-2 text-lg font-semibold mr-3">
                            C18
                          </span>
                          <span className="text-xl font-semibold">
                            {movie.tenPhim}
                          </span>
                        </h3>
                        <p className="line-clamp-2">{movie.moTa}</p>
                      </div> */}
                      <div className="movie_content">
                        <div>
                          <img
                            className=" img_content w-full h-96 object-cover rounded mt-3 mb-5 "
                            src={movie.hinhAnh}
                            alt=""
                          />
                          <div>
                            <span></span>
                          </div>
                        </div>
                        <h3>
                          <span className="bg-orange-500 text-white rounded py-1 px-2 text-lg font-semibold mr-3">
                            C18
                          </span>
                          <span className="text-xl font-semibold">
                            {movie.tenPhim}
                          </span>
                        </h3>
                        <p className="line-clamp-2">{movie.moTa}</p>
                      </div>
                      <div className="btn_button">
                        <button>Mua Vé</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ListMovie;
