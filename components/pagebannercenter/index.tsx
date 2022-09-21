import React, { useRef, useState, useEffect } from "react";
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";

interface IProps {
  data: any,
  componentId?: string
}

export default function pagebannercenter({ data, componentId }: IProps) {
  return (
    <section id={componentId} className={`${styles.banner} ${styles.inner}`} >
      <div className={styles.childInPos}>
        <div className={styles.image}>
          <Imagecomponent image={data.banner_image} />
        </div>
        <div className={styles.content}>
          <div className="container">
            <h1 dangerouslySetInnerHTML={{ __html: data?.title }}></h1>
            {data?.subtitle && <h3 dangerouslySetInnerHTML={{ __html: data?.subtitle }} />}
            {data?.description && <div dangerouslySetInnerHTML={{ __html: data?.description }} />}
          </div>
        </div>
      </div>
    </section>
  );
}
