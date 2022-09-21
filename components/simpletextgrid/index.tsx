import { Imagecomponent } from "@components/common/image";
import React, { useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./style.module.scss";


export default function simpletextgrid({ data, componentId }) {
  const [readMore, setreadMore] = useState(false);
  const [readMoreBox, setreadMoreBox] = useState(false);
  const hasReadMoreTxt = data?.readmoretext?.length > 0;
  const hasReadMoreBoxTxt = data?.box_readmoretext?.length > 0;

  return (
    <section className={styles.simpletextgrid} id={componentId}>
      {data?.background && <figure>
        <Imagecomponent image={data?.background} />
      </figure>}
      <div className={styles.bg}>
        <em></em>
      </div>
      <div className="container">
        {hasReadMoreTxt && <div className={styles.disc1}>
          {!readMore && <span dangerouslySetInnerHTML={{ __html: data?.readmoretext }} />}
          {!readMore && <span onClick={() => setreadMore(true)} className={styles.readmore}>Read more</span>}
          {/* { readMore && <div className={styles.extra} dangerouslySetInnerHTML={{ __html:data?.simpletext }} />} */}
          {readMore && <ReactMarkdown skipHtml={true}>{data?.simpletext}</ReactMarkdown>}
          {readMore && <span onClick={() => setreadMore(false)} className={styles.readmore}>Read less</span>}
        </div>}
        {!hasReadMoreTxt && <div className={styles.disc1}>
          <ReactMarkdown skipHtml={true}>{data?.simpletext}</ReactMarkdown>
        </div>}

        {(data?.boxtitle || data?.boxdescription || (data?.points && data?.points?.length > 0)) && <div className={styles.content}>
          <h3 className="title">{data?.boxtitle} </h3>
          {hasReadMoreBoxTxt && <>
            {!readMoreBox && <span dangerouslySetInnerHTML={{ __html: data?.box_readmoretext }} />}
            {!readMoreBox && <span onClick={() => setreadMoreBox(true)} className={styles.readmore}>Read more</span>}
            {readMoreBox && <p dangerouslySetInnerHTML={{ __html: data?.boxdescription }} />}
            {readMoreBox && <span onClick={() => setreadMoreBox(false)} className={styles.readmore}>Read less</span>}
          </>}
          {!hasReadMoreBoxTxt && <p dangerouslySetInnerHTML={{ __html: data?.boxdescription }} />}
          {/* <p dangerouslySetInnerHTML={{ __html: data?.boxdescription }} /> */}
          <ul className={styles.grid}>
            {data?.points?.map((point) => (
              <li key={point?.id}>
                <h5>{point?.title}</h5>
                <p>{point?.descripiton}</p>
              </li>
            ))}
          </ul>
        </div>}
      </div>
    </section>
  );
}
