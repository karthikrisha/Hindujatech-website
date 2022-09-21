import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import styles from "./style.module.scss";

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

export default function casestudies({ data, componentId }) {
  return (
    <section className={styles.whyus} id={componentId}>
      <div className={styles.bg}>
        <em></em>
      </div>
      <div className="container">
        <div className={styles.whyWrap}>
          <div className={styles.why}>
            <figure><h5 className="title">{data?.title || 'Why Us?'} </h5></figure>
          </div>
          <div className={styles.list}>
            {data?.why_us?.map(why => <div key={'wi' + why?.id} className={styles.box2}>
              <figure><img src={why?.image?.url} /></figure>
              <p dangerouslySetInnerHTML={{ __html: why?.description }} />
            </div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
