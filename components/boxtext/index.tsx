import React, { useRef, useState, useEffect } from "react";
import { slice } from 'ramda';
import styles from "./style.module.scss";


export default function boxtext({data}) {  
  return (
    <section className={`${styles.simpletext} ${data.class ? styles[data.class] : ''}`} >
      <div className="container">
         <div className={styles.disc2}>
            <h3 className="title">{data.boxtitle} </h3>
            <p dangerouslySetInnerHTML={{ __html:data.boxdescription }} />
         </div>
      </div>
    </section>
  );
}
