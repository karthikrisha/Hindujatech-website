import React, { useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";


export default function imgminilist({ data, componentId }) {
  return (
    <section className={styles.imgminilist} id={componentId} >
      <div className="container">
        <div className={styles.content}>
          <figure> <Imagecomponent image={data?.image} /></figure>
        </div>
      </div>
    </section>
  );
}
