import React, { useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";


export default function imgcontentmini({ data, componentId }) {
  return (
    <section className={styles.imgcontentmini} id={componentId} >
      <div className="container">
        <div className={styles.content}>
          <figure> <Imagecomponent image={data?.image} /></figure>
          <p dangerouslySetInnerHTML={{ __html: data?.description }} />
        </div>
      </div>
    </section>
  );
}
