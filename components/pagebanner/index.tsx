import React, { useRef, useState, useEffect } from "react";
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";
import { isMobile } from "react-device-detect";

interface IProps {
  data: any,
  componentId?: string
}

export default function Pagebanner({ data, componentId }: IProps) {
  const bannerImage = (isMobile && data?.mobile_banner_image) ? data?.mobile_banner_image : data?.banner_image;
  return (
    <section id={componentId ? componentId : data?.id} className={`${styles.banner} ${data?.fade == false ? styles.overlayNone : ''} ${data?.alignment ? styles[data?.alignment] : ''} ${data?.bannerheight ? styles[data?.bannerheight] : ''}`} >
      <div className={styles.image}>
      <picture>
        <source media="(max-width: 767px)" srcSet={data?.mobile_banner_image?.url} />
        <Imagecomponent image={data?.banner_image} />
      </picture>
      </div>
      <div className={styles.content}>
        <div className="container">
          <h1 dangerouslySetInnerHTML={{ __html: data?.title }}></h1>
          {data?.subtitle && <h3 dangerouslySetInnerHTML={{ __html: data?.subtitle }} />}
          {data?.description && <div dangerouslySetInnerHTML={{ __html: data?.description }} />}
        </div>
      </div>
    </section>
  );
}
