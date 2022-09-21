import React, { useRef, useState, useEffect } from "react";
import axios from 'axios';
import Link from "next/link";
import Image from "next/image";
import styles from "./style.module.scss";
import Layout from "@components/layout";
import { tabData } from "@lib/constants";
import { getPageData, getCommonPageData } from "@lib/helpers";
import ResourceList from "@components/resources-list";

function whitepaper(props) {
  const { data, headerData: {menuItems} } = props;
  const pageData = getPageData(menuItems, 'white-paper');
  return (
    <Layout {...props}>
    <section className={styles.brochures}>
      <div className="container">
        <div className={styles.brochuresWrap}>
          <h1 className="title">{pageData?.title || 'White Paper'}</h1>
          <div className={styles.contactTab}>
            <div className={styles.tabs}>
              {tabData.map(({ title, link }) => (
                <Link href={link} key={title}>
                  <span className={`${styles.tab} ${link === '/white-paper' ? styles.active : ''}`}>{title}</span>
                </Link>
              ))}
            </div>            
            <ResourceList list={data} sectionLink='/white-paper'/>
          </div>
        </div>

      </div>
    </section>
    </Layout>
  );
}

export async function getStaticProps(appContext) {
  try {    
    const props = await getCommonPageData(`/whitepaper?_limit=-1`);
    console.log(`Building slug: /whitepaper?_limit=-1`)
    return { props, revalidate: process.env.reValidation }
  } catch (error) {
    console.error(error);
    return { props: { data: null } };
  }
}

export default whitepaper;
