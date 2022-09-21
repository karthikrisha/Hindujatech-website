import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import Link from "next/link";
import Image from "next/image";
import useInView from "react-cool-inview";
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";
import { isMobile } from "react-device-detect";

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay]);

export default function HomeBanner(props) {
  const { observe, unobserve, inView, scrollDirection, entry } = useInView({
    threshold: 0, // Default is 0
    onChange: ({ observe, unobserve }) => {
      // Triggered whenever the target meets a threshold, e.g. [0.25, 0.5, ...]
      unobserve(); // To stop observing the current target element
      observe(); // To re-start observing the current target element
    },
    onEnter: ({ observe }) => {
      observe(); 
    },
    onLeave: ({ unobserve }) => {
      // Triggered when the target leaves the viewport 
      unobserve(); 
    },
  });

  const country_array = { 'usa': 'en', 'france': 'fr', 'germany': 'de', 'japan': 'ja', 'spanish': 'es', 'sweden': 'sv' };
  const country_data = props.data?.media?.filter(
    m => (
      m.country === 'all' ||
      m.country === country_array[props?.country] ||
      m.country === null ||
      m.country === '' ||
      m.country === undefined
    ));

  return (
    <section
      ref={observe}
      className={`${styles.banner} ${inView ? styles.animate : ""}`}
    >
      {props.data?.media && <Swiper
        speed={1000}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
      >
        {props.data?.media?.map(banner => {
          const mediaUrl = isMobile && banner?.phonemediaurl ? banner?.phonemediaurl : banner?.mediaurl;
          const hasVideo = mediaUrl?.mime?.indexOf('video/') !== -1;
          return (hasVideo ? <SwiperSlide key={`hb${banner.id}`}>
            <div className={styles.childInPos}>
              <div className={styles.video}>
                {inView && (
                  <video
                    src={mediaUrl?.url}
                    muted
                    autoPlay
                    loop
                  />
                )}
              </div>
              <div className={styles.content}>
                <div className="container">
                  <h3 className="title" dangerouslySetInnerHTML={{ __html: banner?.title }} />
                  {banner?.list?.length > 0 && <div className={styles.links}>
                    {banner?.list?.map(list => <React.Fragment key={`hblnk${list.id}`}>{list?.cta && <Link href={list?.cta}>
                      <a>{list?.link}</a>
                    </Link>}</React.Fragment>)}
                  </div>}
                </div>
              </div>
            </div>
          </SwiperSlide> : <SwiperSlide key={`hb${banner.id}`}>
            <div className={`${styles.childInPos} ${styles.childInPos2}`}>
              <div className={styles.image}>
                <picture>
                  <source media="(max-width: 767px)" srcSet={banner?.phonemediaurl?.url} />
                  <Imagecomponent image={banner?.mediaurl} />
                </picture>
              </div>


              {/* <div className={styles.content}>
                <div className="container">
                  <h1>Do You Know<span><span>30% - 40%</span></span><em><em>of EVS are not Profitable?</em></em></h1>
                  <h5>Crack the Ev Profitable code <br />with hinduja tech!</h5>
                  <a className="btn orange fill">ASK US NOW</a>
                </div>
              </div> */}

              {<div className={styles.content} {...!banner?.title && { style: { top: '70%' } }}>
                {banner?.title && <div className="container" dangerouslySetInnerHTML={{ __html: banner?.title }} />}
                {banner?.cta_link && <div className="container">
                  <Link href={banner?.cta_link}><a className="btn white fill">{banner?.cta || 'ASK US NOW'}</a></Link>
                </div>}
              </div>}

            </div>
          </SwiperSlide>)
        })}
      </Swiper>}
    </section>
  );
}
