import React, { useRef, useState, useEffect } from "react";
import { slice } from 'ramda';
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";


export default function CompanyInfo({ data, componentId }) {
  const [readMore, setreadMore] = useState(false);
  const txtLimit = 525;
  const firstHalf = slice(0, txtLimit, data.readmoretxt);
  const secondHalf = slice(txtLimit, Infinity, data.readmoretxt)

  return (
    <section className={styles.simpletext} id={componentId} >
      <div className={styles.bg}>
        <em></em>
      </div>
      <div className="container">
        {data?.toptext && <h4>{data?.toptext}</h4>}
        {data?.readmoretxt?.length > txtLimit && <div className={styles.disc1}>
          <span dangerouslySetInnerHTML={{ __html: firstHalf }} />
          {readMore == false ? <span onClick={() => setreadMore(true)} className={styles.readmore}>Read more</span> : ''}
          {readMore && <span className={styles.extra} dangerouslySetInnerHTML={{ __html: secondHalf }} />}
          {readMore == true ? <span onClick={() => setreadMore(false)} className={styles.readmore}>Read less</span> : ''}
        </div>}
        {data?.readmoretxt?.length < txtLimit && <div className={styles.disc1}>
          <span dangerouslySetInnerHTML={{ __html: firstHalf }} />
        </div>}
        {data?.grid && <div className={styles.grids}>
          {data.grid?.map(({ feature, featurehover, content }, index) => (
            <div className={styles.grid} key={index}>
              <div>
                <figure>
                  <Imagecomponent image={feature} />
                  <Imagecomponent image={featurehover} />
                </figure>
                <p dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            </div>
          ))}
          <div></div>
        </div>}
        {data.bottomtext && <p>{data.bottomtext}</p>}
      </div>
    </section>
  );
}
