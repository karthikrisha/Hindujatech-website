import React, { useRef, useState, useEffect } from "react";
import styles from "./style.module.scss";
import ReactMarkdown from "react-markdown";
import { Imagecomponent } from "@components/common/image";

export default function Csrbanner({ data, componentId }) {
  const hasVideo = data?.banner_media && data?.banner_media?.mime?.indexOf('video/') !== -1;
  return (
    <section className={`${styles.banner} ${styles.inner}`} id={componentId}>
      <div className={styles.childInPos}>
        <figure>
          <img src="/static/008.jpg" alt="event" />
        </figure>
        <div className={styles.video}>
            {hasVideo && <video loop autoPlay preload="">
              <source src={data?.banner_media?.url} type="video/mp4" />
            </video>}
            {!hasVideo && !data?.youtube && <Imagecomponent image={data?.banner_media}/>}
            {!hasVideo && data?.youtube && <iframe width="560" height="315" src={data?.youtube} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>}
        </div>
        
        <div className={styles.content}>
          <div> 
            <h1>{data?.title}</h1>
            <p>{data?.subtitle}</p>
            <div className={styles.twq}><em></em><ReactMarkdown skipHtml={true}>{data?.description}</ReactMarkdown></div>
          </div>
        </div>
      </div>
    </section>
  );
}
