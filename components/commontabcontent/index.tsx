import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";

export default function Commontabcontent({data, componentId}) {
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    setActiveTab(1);
  }, []);
  return (
    <>
      <section className={styles.simpletabcontent} id={componentId}>
        <div className={styles.bg}>
          <em></em>
        </div>
        <div className="container">
          <h3 className={`${styles[data?.aligntitle]} title`} dangerouslySetInnerHTML={{ __html: data?.title }} />
          <div className={`${styles.description} ${styles[data?.aligndescription]}`}>
            {/* <span dangerouslySetInnerHTML={{ __html: data?.description }} /> */}
            <ReactMarkdown skipHtml={true}>{data?.description}</ReactMarkdown>
          </div>
          <div className={styles.brochuresWrap}>
            <div className={styles.contactTab}>
              <div className={styles.tabs}>
                {data.subtap?.map(({ id, tabname }) => (
                  <span className={`${styles.tab} ${activeTab === id ? styles.active : ''}`} onClick={(e) => {
                    setActiveTab(id);
                  }} key={id}>{tabname}</span>
                ))}
              </div>
              <div className={styles.tabContents}>
                {data.subtap?.map((st) => (
                  <div key={`ctab${st?.id}`}>
                    {activeTab === st?.id && <div className={styles.content}>
                      {st?.title && <h3 dangerouslySetInnerHTML={{ __html: st?.title }} />}
                      {st?.description_tap_top && <div className={`${styles.description}`} dangerouslySetInnerHTML={{ __html: st?.description_tap_top }} />}
                      {<div className={`${styles.tabContent}`}>
                        {st?.image && <figure>
                          <Imagecomponent image={st?.image} />
                        </figure>}
                        {st?.description_tap_bottom && <div className={styles.tc}>
                          <ReactMarkdown skipHtml={true}>{st?.description_tap_bottom}</ReactMarkdown>
                          {/* <div dangerouslySetInnerHTML={{ __html: st?.description_tap_bottom }} /> */}
                        </div>}
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
