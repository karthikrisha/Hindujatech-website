import React, { useEffect, useState } from "react";
import useInView from "react-cool-inview";
import Link from "next/link";
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";

export default function Homecareers(props) {
  const [view, setView] = useState(false);

  const { observe, inView } = useInView({
    threshold: 0.6,
    unobserveOnEnter: true
  });
  return (
    <section
      ref={observe}
      className={`${styles.Homecareers} ${inView ? styles.animate : ""}`}
    >
      <div className={styles.bg}>
        <Imagecomponent image={props?.data?.bgImage} />
        <em></em>
      </div>
      <div className="container">
        <div className={styles.wrap}>
          <div className={styles.figure}>
            <figure>
              <Imagecomponent image={props?.data?.VideoBackground} />
              <span
                className={styles.play}
                onClick={() => setView(true)}
              ></span>
            </figure>
          </div>
          <div className={styles.content}>
            <h3 className="title">{props?.data?.title || 'Careers'} </h3>
            <span dangerouslySetInnerHTML={{ __html: props?.data?.description }} />
            <Link href={props?.data?.link}><a className="btn">{props?.data?.cta || 'Explore more'}</a></Link>
          </div>
        </div>
      </div>
      {view && (
        <div className={styles.lightVideo}>
          <span className="icon-close-1" onClick={() => setView(false)}></span>
          <div className={styles.video}>
            <iframe
              width="560"
              height="315"
              src={props?.data?.Videourl}
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
