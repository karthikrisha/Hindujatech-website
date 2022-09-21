import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { slice } from 'ramda';
import styles from "./style.module.scss";


export default function videobanner({data, componentId}) {
  const [play, setPlay] = useState(false);

  const videoPlay = () => {
    if(document.getElementById(`video_${componentId}`)) {
      //@ts-ignore
      document.getElementById(`video_${componentId}`).play();
    }
  }
  return (
    <section className={styles.videoBanner} id={componentId}>
      <div className={styles.bg}>
        <video controls={play ? true : false} id={`video_${componentId}`} loop>
          <source src={data?.video?.url} type="video/mp4" />
        </video>
        {!play ? <i className={styles.play} onClick={() => { setPlay(true); videoPlay(); }}></i> : ''}
      </div>
    </section>
  );
}
