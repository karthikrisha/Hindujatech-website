import React, { useRef, useState, useEffect } from "react";
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";


export default function ThinkTankContent({data, componentId}) {
  return (
    <section className={`${styles.topBanner}`} id={componentId} >
      <div className="container">
        <div className={`${styles.content}`}>        
          <div className={styles.jointOfferSection}>
            <div className={styles.jointOfferHeader}>
              <span dangerouslySetInnerHTML={{__html: data?.title}} />
            </div>
            <div className={styles.jointOffersubtitle}>
            <span dangerouslySetInnerHTML={{__html: data?.subtitle}} />
            </div>
            <div className={styles.jointOfferDetails}>
              <span dangerouslySetInnerHTML={{__html: data?.description}} />
            </div>
            <div className={styles.jointImage}>
                <Imagecomponent image={data?.image} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
