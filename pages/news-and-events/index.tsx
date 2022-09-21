import React, { useRef, useState, useEffect } from "react";
import Header from "@components/header";
import Footer from "@components/footer";
import Layout from "@components/layout";
import Link from "next/link";
import styles from "./style.module.scss";
import { getCommonPageData } from "@lib/helpers";
import formatDate, { getPageData } from "lib/helpers";

function NewsAndEvents(props) {
  const { data, headerData: {menuItems} } = props;
  const pageData = getPageData(menuItems, 'news-and-events');
  return (
    <Layout {...props}>
    <section className={styles.events}>
      <section className={`${styles.banner} ${styles.inner}`} >
        <div className={styles.childInPos}>
            <div className={styles.image}>
              <img
                src="/static/event-bg.jpg"
                alt="event"
              />
            </div>
            <div className={styles.content}>
              <div className="container">
                <h1>{pageData.title || 'News & Events'}</h1>
                <p>{pageData.excerpt || 'Welcome to Hinduja Tech Newsroom. Browse our latest Press Releases, News and Events. Find out more!'}</p>
              </div>
            </div>
          </div>
      </section>
      <div className="container">
        <div className={styles.boxs}>
          {data.map(({ title, published_at, slug }) => (
            <div key={slug} className={styles.box}>
              <Link href={`/news-and-events/${slug}`}><a><div>
                  <h3>{title}</h3>
                  <p>{formatDate(published_at)}</p>
                </div>
              </a></Link>
            </div>
          ))}
        </div>
      </div>
    </section>
    </Layout>
  );
}

export async function getStaticProps(appContext) {
  try {    
    const props = await getCommonPageData(`/news?_limit=-1`);
    return { props, revalidate: process.env.reValidation }
  } catch (error) {
    console.error(error);
    return { props: { data: null } };
  }
}

export default NewsAndEvents;
