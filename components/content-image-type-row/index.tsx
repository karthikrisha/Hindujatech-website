import React, { useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./style.module.scss";

export default function contentimagerow({ data, componentId }) {
  return (
    <section className={`${styles.contentimagerow}`} id={componentId} >
      {data?.backgroundimage &&
        <div className={styles.bg}>
          <img src={data?.backgroundimage?.url} className={data?.backgroundtype === 'cover' ? styles.cover : styles.contain} />
        </div>}
      <div className="container">
        <div className={styles.content}>
          <h3 className="title" dangerouslySetInnerHTML={{ __html: data?.title }} />          
          <ReactMarkdown className={data?.imagesize} skipHtml={true}>{data?.description}</ReactMarkdown>          
          {/* <div className={data?.imagesize} dangerouslySetInnerHTML={{ __html: '<p>Hinduja Tech helps our OEM and Tier 1 clients achieve faster time-to-market and product cost reduction using Frugal Engineering methodologies. With our proven delivery model & processes, decades of automotive domain expertise, skilled engineers and industry leaders, and 700+ supplier network, we have saved millions of dollars for our customers when they released the product to the market. By doing so, we’re your go-to partner for Product Development.</p><img src="/static/Hinduja-Tech_Frugal-EngiNEARing-Paradigm_10_10.png" alt="EngiNEARing" /><p>With the evolution of green and next-gen mobility, Hinduja Tech is all geared to drive innovation and meet the growing advancements in EV technologies, and our engineering teams have been executing a diverse portfolio of EV programs for various mobility applications for our OEM customers. For our TIER customers, we have been co-developing smart IP development & innovation leveraging our service offerings in electrical, embedded and electronics systems.</p><p>Our 60+ client list from Fortune 100 includes 7 of top 10 Global Auto OEMs, leading disruptive and emerging OEMs & Global Tier1, 2 Suppliers in Asia, Europe, UK and USA. </p>' }} /> */}
        </div>
      </div>
    </section>
  );
}
