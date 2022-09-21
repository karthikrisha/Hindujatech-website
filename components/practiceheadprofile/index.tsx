import { Imagecomponent } from "@components/common/image";
import React, { useRef, useState, useEffect } from "react";
import styles from "./style.module.scss";

interface IProps {
  data: any,
  componentId?: string
}

export default function Practiceheadprofile({ data, componentId }) {

  return (
    <section className={styles.practiceheadprofile} id={componentId}>
      <div className="container">
        <div className={styles.pw}>
          <div className={styles.profile}>
            <figure>
              <Imagecomponent image={data?.image} alt={data?.name} />
            </figure>
          </div>
          {data?.linkedin && <div className={styles.splite}><i></i><a href={data?.linkedin} target="_blank"><em className="icon-linkedin"></em></a></div>}
          <div className={styles.cnt}>
            <h2>{data?.name}</h2>
            <h3>{data?.designation}</h3>
            <p dangerouslySetInnerHTML={{ __html: data?.about }} />
          </div>
        </div>
      </div>
    </section >
  );
}
