import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { slice } from 'ramda';
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";


export default function boxlistmini({ data, componentId }) {
  const [count, setCount] = useState(data?.pdsmod?.length);
  return (
    <section className={`${styles.boxlistmini}`} id={componentId} >
      <div className={styles.bg}>
        <em></em>
      </div>
      <div className="container">
        {data.title && <h3 className="title" dangerouslySetInnerHTML={{ __html: data?.title }} />}
        <ul className={styles.grid} data-count={'count' + count}>
          {data?.pdsmod?.map((mod, index) => (
            <li key={mod?.id}>
              <figure><Imagecomponent image={mod?.image} /></figure>
              <p>{mod?.title}</p>
              <Link href={mod?.link}><a></a></Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
