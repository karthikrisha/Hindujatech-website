import React, { useRef, useState, useEffect } from "react";
import styles from "./style.module.scss";

export default function queriesform({data, componentId}) {
  const [activeTab, setActiveTab] = useState(null);
  useEffect(() => {
    setActiveTab(1);
  }, []);
  return (
    <section className={styles.customerssay} id={componentId} >
      <div className="container">
         <h3 className="title">{data.title || 'What Our Customers Say About Us'}</h3>
         <div className={styles.flexBox}>
            {data?.customer_says?.map((cs, index) => (
                <div key={'csays'+index} className={`${styles.box} ${activeTab === index ? styles.active : ''}`}
                onClick={(e) => { setActiveTab(index);}}>
                  <div>
                    <p dangerouslySetInnerHTML={{ __html: cs?.testimonial }}/>
                    <p className={styles.credits} dangerouslySetInnerHTML={{ __html: cs?.customer }}/>
                  </div>
              </div>
            ))}
         </div>
      </div>
    </section>
  );
}
