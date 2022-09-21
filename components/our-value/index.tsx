import React, { useRef, useState, useEffect } from "react";
import styles from "./style.module.scss";
import ReactMarkdown from "react-markdown";


export default function Ourvalue({data, componentId}) {
  return (
    <section className={`${styles.ourValue}`} id={componentId}>
      <div className="container">
        <div className={styles.wrap}>
          <div className={styles.content}>
            <h2 dangerouslySetInnerHTML={{ __html: data?.title }} />
            <ReactMarkdown skipHtml={true}>{data?.description}</ReactMarkdown>
            {/* <h2>Our Values <br />Define Us</h2>
            <p>We Listen. We are Fair and take Pride in the Growth of our people</p> */}
          </div>
          <figure>
            <i></i>
            <i></i>
            <i></i>
          </figure>
        </div>
      </div>
    </section>
  );
}
