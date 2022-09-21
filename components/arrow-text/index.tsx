import React, { useRef, useState, useEffect } from "react";
import styles from "./style.module.scss";
import ReactMarkdown from "react-markdown";


export default function WorkwithusFeedback({data, componentId}) {
  return (
    <section className={`${styles.arrowText}`} id={componentId}>
      <div className="container">
        <div className={styles.twq}><em></em>
          <p>“{data?.content}” – <span>{data?.user}</span></p>
        </div>
      </div>
    </section>
  );
}
