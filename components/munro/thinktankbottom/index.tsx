import React, { useRef, useState, useEffect } from "react";
import styles from "./style.module.scss";

export default function ThinkTankBottom({ data, componentId }) {
  return (
    <section className={`${styles.topBanner}`} id={componentId} >
      <div className="container">
        <div className={`${styles.content}`}>
          <div className={styles.left}>
            <div className={styles.header}>{data?.title}</div>
              <div className={styles.hexgonContainer}>
                {data?.smsbottom?.map((val,index)=>{
                  return(
                    <div key={index} className={val?.title.toLowerCase() === 'execution'?styles.execution:val?.title.toLowerCase() === 'education'?styles.education:val?.title.toLowerCase() === 'consulting'? styles.consulting: val?.title.toLowerCase() === 'support'? styles.support:''}>
                      <div className={styles.listTitle}>{val?.title}</div>
                      <span dangerouslySetInnerHTML={{__html: val?.points}} />
                    </div>
                    // <div className={val.classname === 'execution'?styles.execution:val.classname === 'education'?styles.education:val.classname === 'consulting'? styles.consulting: val.classname === 'support'? styles.support:''}>
                    //   <div className={styles.listTitle}>{val?.title}</div>
                    //   <ul>
                    //     {val.points.map((point,index)=>{
                    //       return(<li>{point}</li>)
                    //     })}
                    //   </ul>
                    // </div>  
                  )
                })}
              
              <svg strokeLinejoin="bevel" fillRule="evenodd" viewBox="0 0 409.6 409.6"  overflow="visible" >
                <g strokeMiterlimit="79.8403193612775" transform="matrix(1.6253968,0,0,1.6253968,0.15441051,-265.12538)">
                  <path style={{markerEnd:"none",markerStart:"none"}} fill="" d="M88.238,311.53,126,333.34,163.77,311.53,163.77,267.93,126,246.12,88.238,267.93,88.238,311.53z"/>
                  <path style={{markerEnd:"none",markerStart:"none"}} fill="" d="M132.36,387.95,170.12,409.75,207.88,387.95,207.88,344.34,170.12,322.54,132.36,344.34,132.36,387.95z"/>
                  <path style={{markerEnd:"none",markerStart:"none"}} fill="" d="M132.16,235.01,169.92,256.81,207.69,235.01,207.69,191.4,169.92,169.6,132.16,191.4,132.16,235.01z"/>
                  <path style={{markerEnd:"none",markerStart:"none"}} fill="" d="M176.47,311.54,214.24,333.34,252,311.54,252,267.93,214.24,246.12,176.47,267.93,176.47,311.54z"/>
                </g>
              </svg>  
          </div>  
          </div>
        </div>
        </div>
    </section>
  );
}
