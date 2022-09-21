import React, { useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./style.module.scss";


export default function textonly({ data, componentId }) {
  return (
    <section className={styles.textonly} id={componentId} >
      <div className="container">
        <h3 className={`${styles[data?.alignTitle]} title`}>{data?.title} </h3>
        <div className={`${styles.description} ${styles[data?.alignDescription]}`}><ReactMarkdown skipHtml={true}>{data?.descripiton}</ReactMarkdown></div>
      </div>
    </section>
  );
}
