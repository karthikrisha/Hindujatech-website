import React, { useRef, useState, useEffect } from "react";
import styles from "./style.module.scss";


export default function MunroAssociatesBanner({ data, componentId }) {
  return (
    <section id={componentId} className={`${styles.topBanner} ${styles.inner} ${data.overlay == false ? styles.overlayNone : ''} ${data.class ? styles[data.class] : ''}`} >
      <div className="container">
        <div className={`${styles.content}`}>
          <div className={`${styles.LeftHeadingText}`}>
            <h1 dangerouslySetInnerHTML={{ __html: data?.title }}></h1>
            {data?.subtitle && <h3 dangerouslySetInnerHTML={{ __html: data?.subtitle }} />}
          </div>
          <div className={styles.videoContainer}>
            <video poster="https://storage.googleapis.com/htlwebsite/munro_fin_ban_0040175350/munro_fin_ban_0040175350.jpg" autoPlay={true} muted={true} controls={true} loop={true} width="100%" height="100%">
              <source src={data?.videourl ? data?.videourl : "/video/HindujaTech_Munro_Partnership.m4v"} type="video/mp4" />Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
