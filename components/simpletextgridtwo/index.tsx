import React, { useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./style.module.scss";


export default function simpletextgrid({ data, componentId }) {
  return (
    <section className={styles.simpletextgrid} id={componentId} >
      <div className="container">
        <div className={styles.content}>
          <h3 className="title">{data?.title} </h3>
          <p dangerouslySetInnerHTML={{ __html: data?.description }} />
          <ul className={styles.grid}>
            {data?.cossrc_tab?.map((tab) => (
              <li key={tab?.id}>
                <h5>{tab?.title}</h5>
                <p dangerouslySetInnerHTML={{ __html: tab?.descripiton }} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
