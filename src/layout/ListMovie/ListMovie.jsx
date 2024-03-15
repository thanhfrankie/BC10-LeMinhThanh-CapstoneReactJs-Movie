import React, { useEffect, useState } from "react";
import { quanLyPhimServ } from "../../services/quanLyPhim";
import { Carousel } from "antd";
import "./listMovie.scss";
const ListMovie = () => {
  const [arrMovieChunks, setArrMovieChunks] = useState([]);

  useEffect(() => {
    quanLyPhimServ
      .getAllMovie()
      .then((res) => {
        const movies = res.data.content;
        const chunks = [];
        for (let i = 0; i < movies.length; i += 6) {
          chunks.push(movies.slice(i, i + 6));
        }
        setArrMovieChunks(chunks);
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
        {arrMovieChunks.map((chunk, index) => (
          <div className="listMovie">
            <div key={index}>
              <div className="grid grid-cols-3 gap-10">
                {chunk.map((movie) => (
                  <div className="carousel_banner" key={movie.maPhim}>
                    <div className="movie_item space-y-4">
                      <img
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
