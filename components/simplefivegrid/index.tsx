import { Imagecomponent } from "@components/common/image";
import React, { useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./style.module.scss";


export default function simplefivegrid({ data, componentId }) {
  return (
    <section className={styles.simplefivegrid} id={componentId} >
      {data?.background && <figure>
        <Imagecomponent image={data?.background} />
      </figure>}
      <div className={styles.bg}>
        <em></em>
      </div>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.grids}>
            {data?.sfg_submodule?.map((sfg) => (
              <div className={styles.grid} key={sfg?.id}>
                <figure>
                  <div>
                    <h5 dangerouslySetInnerHTML={{ __html: sfg?.title }} />
                  </div>
                </figure>
                <div className={styles.cnt} dangerouslySetInnerHTML={{ __html: sfg?.descripiton }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
