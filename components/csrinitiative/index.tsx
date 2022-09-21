import React, { useRef, useState, useEffect } from "react";
import styles from "./style.module.scss";
import ReactMarkdown from "react-markdown";
import { Imagecomponent } from "@components/common/image";


export default function Csrinitiative({ data, componentId}) {
  return (
    <section className={styles.csrinitiative} id={componentId}>
      <div className={styles.row1}>
        <div className={styles.wrap}>
          <h3>{data?.title}</h3>
          <p>{data?.subtitle}</p>
        </div>
      </div>
      <div className={styles.row2}>
        <div className={styles.wrap}>
          <div className={styles.twq}><em></em>
            <p><ReactMarkdown skipHtml={true}>{data?.description}</ReactMarkdown></p>
          </div>
        </div>
      </div>
      <div className={styles.figures}>
        <figure className={`${styles.figure} ${styles.figure1}`}>
          <Imagecomponent image={data?.image1} />
        </figure>
        <figure className={`${styles.figure} ${styles.figure2}`}>
          <Imagecomponent image={data?.image2} />
        </figure>
        <figure className={`${styles.figure} ${styles.figure3}`}>
          <Imagecomponent image={data?.image3} />
        </figure>
        <figure className={`${styles.figure} ${styles.figure4}`}>
          <Imagecomponent image={data?.image4} />
        </figure>
      </div>
    </section>
  );
}
