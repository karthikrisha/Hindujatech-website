import React, { useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";


export default function Texttablegridonlytwo({ data, componentId }) {
  const [readMore, setreadMore] = useState(false);
  const hasReadMoreTxt = data?.readmoretext?.length > 0;

  return (
    <section className={styles.Texttablegridonlytwo} id={componentId} >
      <div className="container">
        <h3 className="title">{data?.title} </h3>
        <p dangerouslySetInnerHTML={{ __html: data?.description }} />
        <div className={styles.gridtitle}>{data?.gridtitle}</div>
        <div className={styles.grids}>
          {data.pvvsubmodule?.map((pvv) => (
            <div className={styles.grid} key={pvv?.id}>
              <h5>{pvv?.title}</h5>
              <div className={styles.content}>
                
                  <div className={styles.cnt}>
                    <div className={styles.desc} dangerouslySetInnerHTML={{ __html: pvv?.part_one }} />
                    <div className={styles.images}>
                        {pvv?.part_one_image1 && <figure>
                          <Imagecomponent image={pvv?.part_one_image1} />
                        </figure>}
                        {pvv?.part_one_image2 && <figure>
                          <Imagecomponent image={pvv?.part_one_image2} />
                        </figure>}
                    </div>
                  </div>

                  <div className={styles.cnt}>
                    <div className={styles.desc} dangerouslySetInnerHTML={{ __html: pvv?.part_two }} />
                    <div className={styles.images}>
                        {pvv?.part_two_image1 && <figure>
                          <Imagecomponent image={pvv?.part_two_image1} />
                        </figure>}
                        {pvv?.part_two_image2 && <figure>
                          <Imagecomponent image={pvv?.part_two_image2} />
                        </figure>}
                    </div>
                  </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
