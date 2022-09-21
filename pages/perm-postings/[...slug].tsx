import React, { useRef, useState, useEffect } from "react";
import {pluck} from 'ramda';
import Link from "next/link";
import styles from "./style/style.module.scss";
import Banner from "@components/pagebanner"
import formatDate, { getPathData, getCommonPageData } from "@lib/helpers";
import axios from "axios";
import Layout from "@components/layout";
import ExperienceJobForm from "@components/forms/experienceJobForm";

function PermPostings(props) {
  const [liteBox, setliteBox] = useState(false);
  const [bannerData, setBannerData] = useState({});
  const { data } = props;
  useEffect(() => {
    setBannerData ({
      class: 'leftbottom',
      fade: true,
      banner_image: { url: '/static/Careers.jpg' },
      title: data?.title
    })
  }, []);
  
  return (
    <Layout {...props}>
      <Banner data={bannerData} />
      <section className={styles.currentopeningsview}>
        <div className="container">
          <div className={styles.content}>
            <div className={styles.boxs}>
              <div className={styles.box}>
                <figure>
                  <img src="/static/Group 1887.png" />
                </figure>
                <p><b>Job Title:</b> {data?.title}</p>
              </div>
              <div className={styles.box}>
                <figure>
                  <img src="/static/Group 1888.png" />
                </figure>
                <p><b>Qualification:</b> {data?.qualification} </p>
              </div>
              <div className={styles.box}>
                <figure>
                  <img src="/static/Group 1889.png" />
                </figure>
                <p><b>Experience:</b> {data?.experience} </p>
              </div>
              <div className={styles.box}>
                <figure>
                  <img src="/static/Group 1891.png" />
                </figure>
                <p><b>Job Post Date:</b> {formatDate(data?.published_at, 'dd/mm/yyyy')}</p>
              </div>
              <div className={styles.box}>
                <figure>
                  <img src="/static/Group 1892.png" />
                </figure>
                <p><b>Job Expiry Date:</b> {formatDate(data?.expiry_date, 'dd/mm/yyyy')}</p>
              </div>
              <div className={styles.box}>
                <figure>
                  <img src="/static/Group 1893.png" />
                </figure>
                <p><b>Location:</b> Novi, MI</p>
              </div>
            </div>
            <br />
            <br />
            <br />
            <h3>Job Description:</h3>
            <span dangerouslySetInnerHTML={{ __html: data?.description }} />
            <h3>Qualification:</h3>
            <span dangerouslySetInnerHTML={{ __html: data?.qualificationdescription }} />
            <div className={styles.action}>
              <span className="btn orange" onClick={() => setliteBox(true)}>Apply now</span>
            </div>
          </div>
        </div>
      </section>
      {liteBox && <section className={styles.liteBox}>
        <div className={styles.inner}>
          <div className={`icon-close-2 ${styles.close}`} onClick={() => setliteBox(false)}></div>
          <div className={styles.content}>
            <ExperienceJobForm data={props.data} styles={styles} closePopup={setliteBox}/>
          </div>
        </div>
      </section>}
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getPathData('/permpostings')

  return {
    paths,
    fallback: 'blocking' // See the "fallback" section below
  };
}

export async function getStaticProps({params}) {
  const slug = params.slug.pop();
  try {
    let props = await getCommonPageData(`/permpostings/find/${slug}`);
    console.log(`Building slug: /permpostings/find/${slug}`)

    return { props, revalidate: process.env.reValidation }
  } catch (error) {
    console.error(error);
    return { props: { data: null }, revalidate: process.env.reValidation };
  }
}

export default PermPostings;
