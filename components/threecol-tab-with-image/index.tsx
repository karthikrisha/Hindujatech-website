import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { slice } from 'ramda';
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";


export default function threecoltabwithimage({ data, componentId }) {
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    setActiveTab(data?.ps_tabs[0]?.id);
  }, []);
  return (
    <section className={`${styles.threecoltabwithimage}`} id={componentId} >
      <div className={styles.bg}>
        <em></em>
      </div>
      <div className="container">
        <h3 className="title" dangerouslySetInnerHTML={{ __html: data?.title }} />
        <div className={styles.imgGrid}>
          {data?.ps_tabs?.map((tab) => (
            <figure key={tab?.id}><Imagecomponent image={tab?.image} /></figure>
          ))}
        </div>
        <div className={styles.tabs}>
          {data?.ps_tabs?.map((tabb) => (
            <span className={`${styles.tab} ${activeTab === tabb?.id ? styles.active : ''}`} onClick={(e) => {
              setActiveTab(tabb?.id);
            }} key={tabb?.id}>{tabb?.title}</span>
          ))}
        </div>
        <div className={styles.tabContent}>
          {data?.ps_tabs?.map((tabs) => (<div key={tabs?.id} className={styles.content}>
            {activeTab === tabs?.id && <div className={styles.content}>
              <Imagecomponent image={tabs?.image} />
              <p dangerouslySetInnerHTML={{ __html: tabs?.description }} />
            </div>}
          </div>
          ))}
        </div>
      </div>
    </section>
  );
}
