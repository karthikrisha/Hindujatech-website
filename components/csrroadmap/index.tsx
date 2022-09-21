import React, { useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./style.module.scss";


export default function Csrroadmap({ data, componentId }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <section className={styles.roadcontent} id={componentId}>
      <div className={styles.wrap}>
        <div className="container">
          <div className={styles.tabWrap}>
            <div className={styles.tabs}>
              {data?.roadmap?.map(({ id, title }, index) => (
                <span className={`${styles.tab} ${activeTab === index ? styles.active : ''}`} onClick={(e) => {
                  setActiveTab(index);
                }} key={id}>{title}</span>
              ))}
            </div>
            <div className={styles.tabContents}>
              {data?.roadmap?.map((st, idex) => (
                <div key={`tab${idex}`}>
                  {activeTab === idex && <div className={styles.content}>
                    {/* <div dangerouslySetInnerHTML={{ __html: st?.description }}></div> */}
                    <ReactMarkdown skipHtml={true}>{st?.description}</ReactMarkdown>
                  </div>}
                </div>
              ))}
            </div>
          </div>
          <figure>
            <img src="/img/road.png" />
          </figure>
        </div>
      </div>
    </section>
  );
}
