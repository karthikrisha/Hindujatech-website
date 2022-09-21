import { Imagecomponent } from "@components/common/image";
import React, { useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./style.module.scss";

interface IProps {
  data: any,
  componentId?: string
}

export default function simpletext({ data, componentId }: IProps) {
  const [readMore, setreadMore] = useState(false);
  const [readMoreBox, setreadMoreBox] = useState(false);
  const hasReadMoreTxt = data?.readmoretext?.length > 0;
  const hasReadMoreBoxTxt = data?.box_readmoretext?.length > 0;

  return (
    <section className={styles.simpletext} id={componentId} style={{ backgroundImage: "url(" + data?.background?.url + ")"}}>
      {/* {data?.background && <figure>
        <Imagecomponent image={data?.background} />
      </figure>} */}
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

        {(data?.boxtitle || data?.boxdescription) && <div className={styles.disc2}>
          <h3 className="title">{data?.boxtitle} </h3>
          {/* <p dangerouslySetInnerHTML={{ __html:data.boxdescription }} /> */}
          {hasReadMoreBoxTxt && <>
            {!readMoreBox && <span dangerouslySetInnerHTML={{ __html: data?.box_readmoretext }} />}
            {!readMoreBox && <span onClick={() => setreadMoreBox(true)} className={styles.readmore}>Read more</span>}
            {readMoreBox && <ReactMarkdown skipHtml={true}>{data?.boxdescription}</ReactMarkdown>}
            {readMoreBox && <span onClick={() => setreadMoreBox(false)} className={styles.readmore}>Read less</span>}
          </>}
          {!hasReadMoreBoxTxt && <ReactMarkdown skipHtml={true}>{data?.boxdescription}</ReactMarkdown>}
        </div>}
      </div>
    </section>
  );
}
