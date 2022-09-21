import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import styles from "./style.module.scss";

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

export default function virtualsoftware({ data, componentId }) {
  return (
    <section className={styles.virtualSoftware} id={componentId} >
      <div className="container">
        <h3 className="title">{data?.title || 'Our Virtual Testing Software'}</h3>
        <div className={styles.list}>
          <div className="swiper-button-prev prev" />
          <div className="swiper-button-next next" />
          <Swiper
            navigation={{
              prevEl: '.prev',
              nextEl: '.next',
            }}
            slidesPerView={1}
            breakpoints={{
              // when window width is >= 640px
              '500': {
                slidesPerView: 2,
              },
              // when window width is >= 768px
              '800': {
                slidesPerView: 3,
              }
            }}
          >
            {data.logo?.map(fig => <SwiperSlide key={'ovts' + fig.id}>
              <figure><img src={fig.url} /><img src={fig.url} /></figure>
            </SwiperSlide>)}
          </Swiper>

        </div>
      </div>
    </section>
  );
}
