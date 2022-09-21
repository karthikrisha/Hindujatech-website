import React, { useRef, useState, useEffect } from "react";
import { slice } from 'ramda';
import styles from "./style.module.scss";


export default function readMore({text, length = 525}) {
  const [readMore, setreadMore] = useState(false);
  const firstHalf = slice(0, length, text);
  const secondHalf = slice(length, Infinity, text)
  
  return (
    <>    
        {text?.length > 525 && <div className={styles.disc1}>
            <span dangerouslySetInnerHTML={{ __html:firstHalf }} />
            { readMore == false ? <span onClick={() => setreadMore(true)} className={styles.readmore}>Read more</span> : ''}
            { readMore && <div className={styles.extra} dangerouslySetInnerHTML={{ __html:secondHalf }} />}
            { readMore == true ? <span onClick={() => setreadMore(false)} className={styles.readmore}>Read less</span> : ''}
        </div>}
        {text?.length < 525 && <div className={styles.disc1}>
        <span dangerouslySetInnerHTML={{ __html:firstHalf }} />
        </div>}
    </>
  );
}
