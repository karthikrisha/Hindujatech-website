import React, { useRef, useState, useEffect } from "react";
import { slice } from 'ramda';
import styles from "./style.module.scss";


export default function simpletext({data}) {
  const [readMore, setreadMore] = useState(false);
  const txtLimit = 525;
  const firstHalf = slice(0, txtLimit, data.simpletext);
  const secondHalf = slice(txtLimit, Infinity, data.simpletext)
  
  return (
    <section className={styles.simpletext} >
      <div className={styles.bg}>
        <em></em>
      </div>
      <div className="container">
         {data.simpletext?.length > txtLimit && <div className={styles.disc1}>
            <span dangerouslySetInnerHTML={{ __html:firstHalf }} />
            { readMore == false ? <span onClick={() => setreadMore(true)} className={styles.readmore}>Read more</span> : ''}
            { readMore && <div className={styles.extra} dangerouslySetInnerHTML={{ __html:secondHalf }} />}
            { readMore == true ? <span onClick={() => setreadMore(false)} className={styles.readmore}>Read less</span> : ''}
         </div>}
         {data.simpletext?.length < txtLimit && <div className={styles.disc1}>
            <span dangerouslySetInnerHTML={{ __html:firstHalf }} />
          </div>}

         <div className={styles.disc2}>
            <h3 className="title">{data.boxtitle} </h3>
            <p dangerouslySetInnerHTML={{ __html:data.boxdescription }} />
         </div>
      </div>
    </section>
  );
}
