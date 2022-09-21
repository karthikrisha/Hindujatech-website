import React, { useRef, useState, useEffect } from "react";
import Link from 'next/link';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import styles from "./style.module.scss";
import { Readmore } from "@components/common/readmore";
import { ReadmoreText } from "@components/common/readmoretext";

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

export default function casestudies({ data, componentId }) {
  return (
    <section className={styles.casestudies} id={componentId} >
      <div className="container">
        <h3 className="title">{data?.title || 'Case Studies'}</h3>
        <div className={styles.wrap}>
          <div className="swiper-button-prev prev_cs" />
          <div className="swiper-button-next next_cs" />
          <Swiper
            navigation={{
              prevEl: '.prev_cs',
              nextEl: '.next_cs',
            }}
            spaceBetween={40}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 3,
              },
              500: {
                slidesPerView: 2,
              },
            }}
          // onSlideChange={(e) => console.log(e)}
          // onSwiper={(swiper) => console.log(swiper)}
          >
            {data.casestudies?.map(({ title, shortdescription, slug, image }, index) => (
              <SwiperSlide key={'csSlider' + index}>
                <div key={index} className={styles.box}>
                  <div className={styles.content}>
                    <figure>
                      {image && <img
                        src={image?.url}
                        alt={title}
                      />}
                    </figure>
                    <div className={styles.cnt}>
                      <h3>{title}</h3>
                      <p>
                        <ReadmoreText content={shortdescription} min={120} />
                      </p>
                    </div>
                    <div className={styles.action}>
                      <Link href={`/case-studies/${slug}`}><a className="btn">Know more</a></Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
