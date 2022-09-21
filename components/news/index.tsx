import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  EffectFade,
  Controller,
} from "swiper";
import Link from 'next/link'
import useInView from "react-cool-inview";
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";
import { textAbstract } from "@lib/helpers";

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Controller, EffectFade]);

export default function News(props) {
  // store controlled swiper instance
  const [controlledSwiper, setControlledSwiper] = useState(null);
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  const { observe, inView } = useInView({
    threshold: 0.7,
    unobserveOnEnter: true
  });

  return (
    <section
      ref={observe}
      className={`${styles.news} ${inView ? styles.animate : ""}`}
    >
      <div className={styles.si}>
        <div className={styles.bg}>
          <div className={styles.bar}>
            <i></i>
            <span></span>
          </div>
          <em></em>
        </div>
        <div className="container">
          <div className={styles.wrap}>
            <div className={styles.box}>
              <div className={styles.box1}>
                <Swiper onSwiper={setControlledSwiper} effect="fade">
                  {props?.data?.news?.map( n =><SwiperSlide key={`bi${n.id}`}>
                    <div className={styles.image}>
                      <i></i>
                      <figure>
                        <Imagecomponent image={n?.image} />
                      </figure>
                    </div>
                  </SwiperSlide>)}
                </Swiper>
                <h3 className={styles.title}>
                  <span>{props?.data?.title || 'News'}</span>
                </h3>
              </div>
              <div className={styles.box2}>
                <Swiper
                  navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                  }}
                  controller={{ control: controlledSwiper }}
                >
                  {props?.data?.news?.map( nw => <SwiperSlide key={`bid${nw.id}`}>
                    <div className={styles.content}>
                      <h4>{textAbstract(nw?.title, 45)}</h4>
                      <p>
                        <Link href={`/news-and-events/${nw?.slug}`}>
                          <a>
                            {nw?.shortdescription}
                          </a>
                        </Link>
                      </p>
                      <div className={styles.action}>
                        <Link href={`/news-and-events/${nw?.slug}`}><a className="btn blue">{props?.data?.readmore || 'Read more'}</a></Link>
                        <Link href={`/news-and-events`}><a className="btn">{props?.data?.viewall || 'View all'}</a></Link>
                      </div>
                    </div>
                  </SwiperSlide>)}
                </Swiper>
                <div className={styles.arrowbox}>
                  <div
                    className="swiper-button-prev"
                    ref={navigationPrevRef}
                  ></div>
                  <div
                    className="swiper-button-next"
                    ref={navigationNextRef}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
