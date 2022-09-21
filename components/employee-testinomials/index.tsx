import React, { useRef, useState, useEffect } from "react";
import styles from "./style.module.scss";
import ReactMarkdown from "react-markdown";
import { Imagecomponent } from "@components/common/image";


export default function Employeetestinomials({ data, componentId }) {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <section className={styles.employeeTestinomials} id={componentId}>
      <div className="container">
        <h2 className="title">{data?.title}</h2>

        {data.testimony?.map((add) => (
          <div className={`${styles.etContent} ${activeTab === add.id ? styles.active : ''}`} key={'wwutestimonydesc' + add?.id}>
            <div className={styles.content}>
              <p dangerouslySetInnerHTML={{ __html: add?.description }} />
            </div>
          </div>
        ))}

        <ul className={styles.list}>
          {data?.testimony?.map((pr) => (
            <li onClick={(e) => {
              setActiveTab(pr.id);
            }} className={activeTab === pr.id ? styles.active : ''} key={'wwutestimony' + pr?.id}>
              <figure>
                <Imagecomponent image={pr?.userimage} />
              </figure>
              <h5><span>{pr?.name}</span><small>{pr?.role}</small></h5>
              {/* <div className={styles.cnt} dangerouslySetInnerHTML={{ __html: pr?.descripiton }} /> */}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
