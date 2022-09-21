import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  EffectFade,
  Controller,
} from "swiper";
import Link from "next/link";
import useInView from "react-cool-inview";
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";
import { textAbstract } from "@lib/helpers";

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Controller, EffectFade]);

export default function Blog(props) {
  // store controlled swiper instance
  const [controlledSwiper, setControlledSwiper] = useState(null);
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  const { observe, inView } = useInView({
    threshold: 0.7, // Default is 0
    unobserveOnEnter: true
  });

  return (
    <section
      ref={observe}
      className={`${styles.blog} ${inView ? styles.animate : ""}`}
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
                  {props?.data?.blogs?.map( blog =><SwiperSlide key={`bi${blog.id}`}>
                    <div className={styles.image}>
                      <i></i>
                      <figure>
                        <Imagecomponent image={blog?.image} />
                      </figure>
                    </div>
                  </SwiperSlide>)}
                </Swiper>
                <h3 className={styles.title}>
                  <span>{props?.data?.title || 'Blog'}</span>
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
                  {props?.data?.blogs?.map( blog => <SwiperSlide key={`bid${blog.id}`}>
                    <div className={styles.content}>
                      <h4>{textAbstract(blog?.title, 45)}</h4>
                      <p>
                        <Link href={`/blog/${blog?.slug}`}>
                          <a>
                            {blog?.shortdescription}
                          </a>
                        </Link>
                      </p>
                      <div className={styles.action}>
                        <Link href={`/blog/${blog?.slug}`}><a className="btn blue">{props?.data?.readmore || 'Read more'}</a></Link>
                        <Link href={`/blogs`}><a className="btn">{props?.data?.viewall || 'View all'}</a></Link>
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
