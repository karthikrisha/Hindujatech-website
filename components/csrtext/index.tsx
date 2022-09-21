import React, { useRef, useState, useEffect } from "react";
import styles from "./style.module.scss";
import ReactMarkdown from "react-markdown";


export default function Csrtext({ data, componentId }) {
  return (
    <section className={`${styles.csrtext} ${styles[data?.style]}`} id={componentId}>
      <div className="container">
        {data?.title && <h3 dangerouslySetInnerHTML={{ __html: data?.title }}></h3>}
        {data?.subtitle && <h4 dangerouslySetInnerHTML={{ __html: data?.subtitle }}></h4>}
        <div className={styles.twq}><em></em>
          <ReactMarkdown skipHtml={true}>{data?.description}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
}
