import React, { useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";

export default function ImageType({ data, componentId }) {
  return (
    <section className={`${styles.imagetype}`} id={componentId} >
      {data?.backgroundimage &&
        <div className={styles.bg}>
          <img src={data?.backgroundimage?.url} className={data?.backgroundtype === 'cover' ? styles.cover : styles.contain} />
        </div>}
      <div className="container">
        <div className={`${styles.content} ${data.contentimgsize ? styles[data.contentimgsize] : ''}`}>
          {/* cover, contain, half */}
          <h3 className={`${styles[data?.titlealign]} title`} dangerouslySetInnerHTML={{ __html: data?.title }} />
          <div className={`${styles.description} ${styles[data?.aligndescription]}`}>
            <p dangerouslySetInnerHTML={{ __html: data?.description }} />
          </div>
          {data?.image && <div className={data?.imagesize}>
            <Imagecomponent image={data?.image} />
          </div>}
        </div>
      </div>
    </section>
  );
}
