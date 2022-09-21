import React, { useRef, useState, useEffect } from "react";
import styles from "./style.module.scss";
import ReactMarkdown from "react-markdown";


export default function Arrowtextbg({data, componentId}) {
  return (
    <section className={`${styles.arrowTextbg}`} id={componentId}>
      <div className={styles.bg} ></div>
      <div className="container">
        <div className={styles.wrap}>
          <div className={styles.twq}><em></em>
            <ReactMarkdown skipHtml={true}>{data?.content}</ReactMarkdown>
            {/* <p>Hinduja Tech conducts Employee Satisfaction survey (ESAT) at regular intervals of time through a third party vendor to measure, analyse and gain insights about culture, value system and engagement levels within the organisation</p> */}
          </div>
        </div>
      </div>
    </section>
  );
}
