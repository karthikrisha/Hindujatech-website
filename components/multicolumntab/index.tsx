import React, { useRef, useState, useEffect } from "react";
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";

export default function MultiColumnTab({data, componentId}) {
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    setActiveTab(data?.pes_tab[0]?.id);
  }, []);

  return (
    <section className={styles.multicolumntab} id={componentId} >
      <div className={styles.bg}>
        <em></em>
      </div>
      <div className="container">
        {data?.title && <h3 className="title">{data?.title}</h3>}
        <div className={styles.contactTab}>
          <div className={styles.tabs}>
            {data?.pes_tab?.length > 0 && data?.pes_tab?.map((tab) => (
            <span key={`pesmt${tab?.id}`} className={`${activeTab === tab?.id ? styles.active : ''}`} onClick={(e) => { setActiveTab(tab?.id); }}>
              {tab?.tab_title}
            </span>))}
          </div>
          <div className={styles.tabContents}>

          {data?.pes_tab?.length > 0 && data?.pes_tab?.map((tab) => (
            <div className={styles.content} key={`pesmtd${tab?.id}`}>
              {activeTab === tab?.id && <div className={styles.tab}>
              <div className={styles.disc} dangerouslySetInnerHTML={{ __html: tab?.description }} />
              <div className={styles.image}>
                <div>
                  <figure>
                    <Imagecomponent image={tab?.image} />
                  </figure>
                </div>
              </div>
              </div>}
            </div>
          ))}
            {/* <div className={styles.content}>
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
              </div> */}

          </div>
        </div>
      </div>
    </section>
  );
}
