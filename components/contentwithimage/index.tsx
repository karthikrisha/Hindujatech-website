import React, { useRef, useState, useEffect } from "react";
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";


export default function contentwithimage({data, componentId}) {
  return (
    <section className={`${styles.contentwithimage}`} id={componentId} >
      <div className={styles.bg}></div>
      <div className="container">
        <div className={styles.content}>
          <h3 dangerouslySetInnerHTML={{ __html: data?.title }}></h3>
          <p dangerouslySetInnerHTML={{ __html: data?.descripition }}></p>
        </div>
      </div>
    </section>
  );
}
