import React, { useRef, useState, useEffect } from "react";
import MunroHexagon from '@components/munro/munrosop/hexagon';
import styles from "./style.module.scss";


export default function MunroShowcase({ data, componentId }) {
  return (
    <section className={`${styles.sopSection}`} id={componentId} >
      <div className="container">
        <div className={`${styles.expertiseOfHTContainer}`}>
            <div className={`${styles.expertiseOfHTHead}`}> 
              {data?.title} 
            </div>
            <div className={`${styles.expertiseOfHTSubHead}`}>
              {data?.subtitle}
            </div>
            <div className={`${styles.expertiseBox} ${styles.boxRadius} expertiseOfHTBox`} dangerouslySetInnerHTML={{ __html: data?.shortinfo }} />
        </div>
        <div className={`${styles.expertiseDetailBox} ${styles.detailBox}`}>
            <div className={`${styles.expertiseBox} ${styles.list1}`}>
              <span dangerouslySetInnerHTML={{ __html: data?.infoone }}></span>
            </div>
            <div className={`${styles.expertiseBox} ${styles.list1}`}>
              <span dangerouslySetInnerHTML={{ __html: data?.infotwo }}></span>
            </div>
        </div>
      </div>
    </section>
  );
}
