import { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import Link from "next/link";
import useInView from "react-cool-inview";
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";
import { hasVideo } from "@lib/helpers";

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

export default function Testimonials(props) {
  const [view, setView] = useState(false);
  const [videourl, setVideourl] = useState('');
  const { observe, inView } = useInView({
    threshold: 0.6,
    unobserveOnEnter: true
  });
  return (
    <section
      ref={observe}
      className={`${styles.testimonials} ${inView ? styles.animate : ""}`}
    >
      <div className={styles.bg}>
        <i></i>
        <span></span>
        <em></em>
      </div>
      <div className="container">
        <div className={styles.wrap}>
          <i className="icon-left-quote"></i>
          <i className="icon-right-quote"></i>
          <Swiper
            pagination={{ clickable: true }}
          >
            {props?.data?.userstories?.map( us => <SwiperSlide key={`temo${us.id}`}>
              <div className={styles.box}>
                <div className={styles.image}>
                  {/* {hasVideo(us?.media) ? <figure> */}
                  {(us?.videourl) ? <figure>
                    <Imagecomponent image={us?.media} defaultImg="/static/004.jpg" />
                    <span className={styles.play} onClick={() => {setVideourl(us?.videourl);setView(true)}}></span>
                  </figure> : <figure>
                    <Imagecomponent image={us?.media} defaultImg="/static/004.jpg"/>
                  </figure>}
                </div>
                <div className={styles.content}>
                  <h3 className="title">{us?.title}</h3>
                  <p>{us?.description}</p>
                  <div className={styles.bottom}>
                    <p>
                      <strong>- {us?.customerName}</strong>
                      <span>{us?.position}</span>
                    </p>
                    <Imagecomponent image={us?.logo} />
                  </div>
                </div>
              </div>
            </SwiperSlide>)}
          </Swiper>
        </div>
      </div>
      
      {view && (
        <div className={styles.lightVideo}>
          <span className="icon-close-1" onClick={() => setView(false)}></span>
          <div className={styles.video}>
            <iframe
              width="560"
              height="315"
              src={videourl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}
