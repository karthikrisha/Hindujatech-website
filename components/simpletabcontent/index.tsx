import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";

export default function simpletabcontent({ data, componentId }) {
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    setActiveTab(1);
  }, []);
  return (
    <>
      <section className={styles.simpletabcontent} id={componentId}>
        <figure>
          <img src="/img/black-bg-1.jpg" alt="" />
        </figure>
        <div className={styles.bg}>
          <em></em>
        </div>
        <div className="container">
          <div className={styles.brochuresWrap}>
            <div className={styles.contactTab}>
              <div className={styles.tabs}>
                {data.tabcontent?.map(({ id, tabname }) => (
                  <span className={`${styles.tab} ${activeTab === id ? styles.active : ''}`} onClick={(e) => {
                    setActiveTab(id);
                  }} key={id}>{tabname}</span>
                ))}
              </div>
              <div className={styles.tabContents}>
                {data.tabcontent?.map(({ id, tabname, title, image, descriptiontitle, description, powerhouse }) => (
                  <div key={`ctab${id}`}>
                    {activeTab === id && <div className={styles.content}>
                      <h3 dangerouslySetInnerHTML={{ __html: title }} />

                      {powerhouse?.length != 0 ? <div className={styles.gridsWrap}><div className={styles.grids}>
                        {powerhouse?.map(({ count, content }) => (
                          <div className={styles.grid} key={count}>
                            <p><b>{count}</b><span dangerouslySetInnerHTML={{ __html: content }} /></p>
                          </div>
                        ))}
                      </div></div>
                        : <div className={`${styles.tabContent} ${descriptiontitle ? styles.sc : styles.nc}`}>
                          {image && <figure>
                            <Imagecomponent image={image} />
                          </figure>}
                          <div className={styles.tc}>
                            <h5>{descriptiontitle}</h5>
                            <div dangerouslySetInnerHTML={{ __html: description }} />
                          </div>
                        </div>}
                    </div>}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
