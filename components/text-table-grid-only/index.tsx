import React, { useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";


export default function texttablegridonly({ data, componentId }) {
  const [readMore, setreadMore] = useState(false);
  const hasReadMoreTxt = data?.readmoretext?.length > 0;

  return (
    <section className={styles.Texttablegridonly} id={componentId} >
      <div className="container">
        <h3 className="title">{data?.title} </h3>
        <p dangerouslySetInnerHTML={{ __html: data?.description }} />
        <div className={styles.grids}>
          {data.dv_submodule?.map((sm) => (
            <div className={styles.grid} key={sm?.id}>
              <h5>{sm?.title}</h5>
              <div className={styles.cnt} dangerouslySetInnerHTML={{ __html: sm?.description }} />
              <h6>{sm?.subtitle}</h6>
              <figure>
                <Imagecomponent image={sm?.image} />
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
