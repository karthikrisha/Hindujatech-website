import React, { useRef, useState, useEffect } from "react";
import styles from "./style.module.scss";

export default function twocolumntab({data, componentId}) {
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    setActiveTab(data.column_1_title);
  }, []);
  return (
    <section className={styles.twocolumntab} id={componentId} >
      <div className={styles.bg}>
        <em></em>
      </div>
      <div className="container">
        <h3 className="title">{data?.title || 'Simulation Services'}</h3>
        <div className={styles.contactTab}>
          <div className={styles.tabs}>
            <span key={data.column_1_title} className={`${activeTab === data.column_1_title ? styles.active : ''}`} onClick={(e) => { setActiveTab(data.column_1_title); }}>
              {data.column_1_title}
            </span>
            <span key={data.column_2_title} className={`${activeTab === data.column_2_title ? styles.active : ''}`} onClick={(e) => { setActiveTab(data.column_2_title); }}>
              {data.column_2_title}
            </span>
          </div>
          <div className={styles.tabContents}>
            
            <div className={styles.content}>
              {activeTab === data.column_1_title && <div className={styles.tab}>
              <div className={styles.disc} dangerouslySetInnerHTML={{ __html: data.column_1_description }} />
              <div className={styles.image}>
                <div>
                  <figure>
                    <img
                      src={data.column_1_image?.url}
                      alt={data.column_1_title}
                    />
                  </figure>
                </div>
              </div>
              </div>}
            </div>

            <div className={styles.content}>
                {activeTab === data.column_2_title && <div className={styles.tab}>
                <div className={styles.disc} dangerouslySetInnerHTML={{ __html: data.column_2_description }} />
                <div className={styles.image}>
                  <div>
                    <figure>
                      <img
                        src={data.column_2_image?.url}
                        alt={data.column_2_title}
                      />
                    </figure>
                  </div>
                </div>
                </div>}
              </div>

          </div>
        </div>
      </div>
    </section>
  );
}
