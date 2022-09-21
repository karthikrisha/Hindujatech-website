import React, { useRef, useState, useEffect } from "react";
import styles from "./style.module.scss";
import ReactMarkdown from "react-markdown";
import { Imagecomponent } from "@components/common/image";
import formatDate from "@lib/helpers";


export default function Eduforall({ data, componentId }) {
  return (
    <section className={styles.eduforall} id={componentId}>
      <div className={styles.row1}>
        <div className={styles.wrap}>
          <figure className={styles.img}>
            <img src="/img/page/hand.png" />
          </figure>
          <div className={styles.content}>
            <div className={styles.cnt1}>
              <h3>{data?.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: data?.description }} />
            </div>
            <div className={styles.cnt2}>
              <div className={styles.left}>
                <figure>
                  <Imagecomponent image={data?.box_image} />
                </figure>
              </div>
              <div className={styles.right}>
                <p dangerouslySetInnerHTML={{ __html: data?.box_description }} />
                <a className="btn" href={data?.box_link} target="_blank">know more</a>
              </div>
            </div>
            {(data?.read_title && data?.read_description) && <div className={styles.cnt3}>
              <h6>{data?.read_title}</h6>
              <p dangerouslySetInnerHTML={{ __html: data?.read_description }} />
              <h5>{formatDate(data?.date, 'mmmm d, yyyy')}</h5>
            </div>}
          </div>
        </div>
      </div>
      <div className={styles.row2}>
        <div className="conatainer">
          <p dangerouslySetInnerHTML={{ __html: data?.query }} />
          {/* <p>Get in touch with us, in case you have any queries <a href="#">corpcomm@hindujatech.com</a></p> */}
        </div>
      </div>
    </section>
  );
}
