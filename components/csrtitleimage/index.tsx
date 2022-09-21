import React, { useRef, useState, useEffect } from "react";
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";


export default function Csrtitleimage({ data, componentId }) {
  return (
    <section className={`${styles.Titleandimage}`} id={componentId} >
      <div className="container">
        <div className={styles.content}>
          {data?.title && <h3 dangerouslySetInnerHTML={{ __html: data?.title }}></h3>}
        </div>
        <figure><Imagecomponent image={data?.image} /></figure>
      </div>
    </section>
  );
}
