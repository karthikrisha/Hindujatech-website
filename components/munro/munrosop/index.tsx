import React, { useRef, useState, useEffect } from "react";
import MunroHexagon from '@components/munro/munrosop/hexagon';
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";


export default function MunroOfferings({ data, componentId }) {
  return (
    <section className={`${styles.sopSection}`} id={componentId} >
      <div className="container">
        <h3 className="title" dangerouslySetInnerHTML={{ __html: data?.title }}></h3>
        <p dangerouslySetInnerHTML={{ __html: data?.subtitle }}></p>
        <div className={`${styles.offeringContent}`}>
          {data?.offerings.map((val, index) => {
            return (
              <div key={index} className={`${styles.munroOffering}`}>
                {/* <div className={`${styles.hexagon1} ${styles.fitpositionCls}`}></div> */}
                <svg xmlns="http://www.w3.org/2000/svg" className={` ${styles.fitpositionCls}`} width="132" height="120" viewBox="0.722 0.617 131 119">
                  <path paintOrder="stroke fill markers" fillRule="evenodd" d="M98.972.617l32.75 59.5-32.75 59.5h-65.5l-32.75-59.5 32.75-59.5h65.5z" />
                </svg>
                <Imagecomponent image={val?.image} className={`${styles.munroImage} ${styles.normal}`} alt="first" />
                <Imagecomponent image={val?.hoverimage} className={`${styles.munroImage} ${styles.hover}`} alt="first" />
                {/* <img src="/static/Partnership-Ecosystem/Group 1960.png" className={`${styles.munroImage} ${styles.normal}`} alt="first" />
                <img src="/static/Partnership-Ecosystem/Group 1960-w.png" className={`${styles.munroImage} ${styles.hover}`} alt="first" /> */}
                {/* <img src={val?.image?.url} className={`${styles.munroImage}`} alt="first" /> */}
                <div className={styles.offeringInnerContentBox}>
                  <h3>{val?.title}</h3>
                  <span dangerouslySetInnerHTML={{ __html: val?.points }}></span>
                </div>
              </div>
            )
          })}

        </div>
        <div className={styles.expertiseBox}>
          <a href="https://www.munro.com" className={`${styles.colortext}`} target="_blank" title="webdetails">WWW.MUNROLIVE.COM</a> &nbsp;{data?.linkdescripiton}
        </div>
      </div>
    </section>
  );
}
