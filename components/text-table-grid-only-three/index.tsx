import React, { useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";


export default function Texttablegridonlythree({ data, componentId }) {
  const [readMore, setreadMore] = useState(false);
  const hasReadMoreTxt = data?.readmoretext?.length > 0;

  return (
    <section className={styles.Texttablegridonlythree} id={componentId} >
      <div className="container">
        <h3 className="title">{data?.title} </h3>
        <p dangerouslySetInnerHTML={{ __html: data?.description }} />
        <div className={styles.grids}>
          {data.cbdata?.map((cb) => (
            <div className={styles.grid} key={cb?.id}>
              <figure>
                <Imagecomponent image={cb?.image} />
              </figure>
              <h5>{cb?.title}</h5>
              <div className={styles.cnt} dangerouslySetInnerHTML={{ __html: cb?.descripiton }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
