import React, { useRef, useState, useEffect } from "react";
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";


export default function readcontent({data, componentId}) {
  return (
    <section className={`${styles.readcontent}`} id={componentId} >
      <div className="container">
        <div className={styles.row}>
          <h3>Read: <a href={data?.link} target="_blank">{data?.title}</a><small>June 19, 2020</small></h3>
        </div>
        <div className={styles.row2}>
          <p>{data?.touch_text} <a href={`mailto:${data?.touch_email}`}>{data?.touch_email}</a></p>
        </div>
      </div>
    </section>
  );
}
