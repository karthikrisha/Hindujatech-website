import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { slice } from 'ramda';
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";


export default function boxlist({ data, componentId }) {
  return (
    <section className={`${styles.boxlist}`} id={componentId} >
      <div className={styles.bg}>
        <em></em>
      </div>
      <div className="container">
        <h3 className="title" dangerouslySetInnerHTML={{ __html: data.title }} />
        <ul className={styles.grid}>
          {data.submodule?.map(({ id, title, link, image }, index) => (
            <li key={id}>
              <figure><Imagecomponent image={image} /></figure>
              <p>{title}</p>
              <Link href={link}><a></a></Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
