import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";
import "./history.css";
import "swiper/swiper-bundle.css";
import avatar from "../../assets/running.svg";

SwiperCore.use([Navigation, Pagination, Autoplay]);
const HistoryList = ({ data, error, isLoading }) => {
  let shown = (
    <SwiperSlide>
      <p>Fetching data...</p>
    </SwiperSlide>
  );
  if (error) {
    shown = (
      <SwiperSlide>
        <p>{error}</p>
      </SwiperSlide>
    );
  }
  if (data.length > 0) {
    shown = data.map((item) => {
      return (
        <SwiperSlide key={item.id} tag="li">
          <div>
            <div className="avatar">
              <img src={avatar} alt="image" />
            </div>
          </div>
          <div className="info-container">
            <div>
              <h5>Name: </h5>
              <span> {item.name}</span>
            </div>
            <div>
              <h5>Distance:</h5>
              <span> {item.distance}</span>
            </div>
            <div>
              <h5>Time:</h5>
              <span> {item.time}</span>
            </div>
          </div>
        </SwiperSlide>
      );
    });
  }
  return (
    <>
      <h2 className="header">Leaderboard</h2>
      <div className="wrapper">
        <Swiper
          tag="section"
          wrapperTag="ul"
          spaceBetween={0}
          slidesPerView={1}
          speed={500}
          centeredSlides={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          navigation={{ clickable: true }}
          pagination={{ clickable: true }}
          id="main"
        >
          {shown}
        </Swiper>
      </div>
    </>
  );
};
export default HistoryList;
