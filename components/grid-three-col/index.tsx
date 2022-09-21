import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { slice } from 'ramda';
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";


export default function gridthreecol({ data, componentId }) {
  return (
    <section className={`${styles.gridthreecol}`} id={componentId} >
      <div className="container">
        <h3 className="title" dangerouslySetInnerHTML={{ __html: data?.title }} />
        <ul className={styles.grid}>
          {data.seg_lists?.map((list, index) => (
            <li key={list?.id}>
              <figure><Imagecomponent image={list?.image} /></figure>
              <p>{list?.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
