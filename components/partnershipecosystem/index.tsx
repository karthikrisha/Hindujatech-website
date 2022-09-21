import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";

export default function Partnershipecosystem({data, componentId}) {
  return (
    <>
      <section className={styles.partnershipecosystem} id={componentId}>
        <div className="container">
          <h1>{data?.title || 'Partnership Ecosystem'}</h1>
          <div className={styles.gridBox}>
            {data.partner?.map(part => (part?.technologypartner ? <div key={part?.id} className={styles.box}>
              <h4>{part?.technologypartnertitle}</h4>
              <div className={styles.imgs}>
                {part?.technologypartners?.map(tp => <a key={tp?.id} href={tp?.link} target="_blank" className={styles.img}>
                  <Imagecomponent image={tp?.logo} />
                </a>)}
              </div>
            </div> : <div className={styles.box} key={part?.id}>
              <h4>{part?.title}</h4>
              <Link href={part?.link}><a className={styles.img}><Imagecomponent image={part?.logo} /></a></Link>
              <Link href={part?.link}><a className="btn">View more</a></Link>
            </div>))}
          </div>
        </div>
      </section>
    </>
  );
}
