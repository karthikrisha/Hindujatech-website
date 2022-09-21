import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { pluck, clone, trim } from 'ramda';
import styles from "./style.module.scss";
import Banner from "@components/pagebanner"
import formatDate, { getCommonPageData } from "@lib/helpers";
import axios from "axios";
import Layout from "@components/layout";

const testData = {
  class: 'centermiddle',
  fade: true,
  banner_image: { url: '/static/Careers.jpg' },
  title: 'PERM Postings'
}

function PermPostings(props) {
  const [careersList, setCareersList] = useState([]);

  useEffect(() => {
    let list = clone(props?.data);
    setCareersList(list)
  }, []);
  
  return (
    <Layout {...props}>
      <Banner data={testData} />
      <section className={styles.currentopenings}>
        <div className="container">
          <div className={styles.formWrap}>
            <div className={styles.contactTab}>             
              <div className={styles.tabContents}>
                {<div className={`${styles.content}`}>
                  <div className={styles.list}>
                    {careersList?.map((career) => (
                      <div key={career?.id} className={styles.box}>
                        <div>
                          <h5>{career?.title}</h5>
                          <p>Posted on: {formatDate(career?.published_at)}</p>
                          <Link href={`/perm-postings/${career?.slug}`}><a className="btn" >View Job Details</a></Link>
                        </div>
                      </div>
                    ))}
                    {careersList?.length === 0 && <div> No LCA Postings Found</div>}
                  </div>
                  {/* <div className={styles.loadMore}>
                    <a className="btn orange">Load more</a>
                  </div> */}
                </div>
                }                
              </div>

            </div>
          </div>

        </div>

      </section>
    </Layout>
  );
}

export async function getStaticProps(appContext) {
  try {
    let props = await getCommonPageData(`/permpostings?_limit=-1`);
    return { props, revalidate: process.env.reValidation }
  } catch (error) {
    console.error(error);
    return { props: { data: null }, revalidate: process.env.reValidation };
  }
}

export default PermPostings;
