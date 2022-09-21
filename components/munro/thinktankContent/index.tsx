import React, { useRef, useState, useEffect } from "react";
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";


export default function ThinkTankContent({ data, componentId }) {
  return (
    <section className={`${styles.thinktankContent}`} id={componentId} >
      <div className="container">
        <h3 className="title" dangerouslySetInnerHTML={{ __html: data?.title }} />
        <div className={`${styles.content}`}>
          <div className={`${styles.list}`}>
            {data.htpartner.map((val, index) => {
              return (
                <React.Fragment key={index}>
                  {index === 1 ? <hr className={`${styles.leadersLine}`} /> : ''}
                  <div className={`${styles.leadersList} ${styles[val?.class]}`}>
                    <Imagecomponent image={val?.image} />
                    <div className={`${styles.cnt}`}>
                      <h4 dangerouslySetInnerHTML={{ __html: val?.title }} />
                      <div className={styles.leadersdetails} dangerouslySetInnerHTML={{ __html: val?.description }} />
                    </div>
                  </div>
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
