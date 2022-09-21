import React, { useRef, useState, useEffect } from "react";
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios'; 
import Header from "components/header";
import Footer from "components/footer";
import Link from "next/link";
import Image from "next/image";
import styles from "@styles/blogs/style.module.scss";
import Layout from "@components/layout";
import { tabData } from "@lib/constants";
import { getThumb, getPageData, getCommonPageData } from "@lib/helpers";
import { Imagecomponent } from "@components/common/image";

function blogs(props) {
  const { data, headerData: {menuItems} } = props;
  const pageData = getPageData(menuItems, 'blogs');
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const postPerView = 10;
  const router = useRouter();
  useEffect(() => {
    setPosts(data.slice(0, page * postPerView));
  }, [page]);

  return (
    <Layout {...props}>
    <section className={styles.brochures}>
      <div className="container">
        <div className={styles.brochuresWrap}>
        <h1 className="title">{pageData.title || 'Blogs'}</h1>
          <div className={styles.contactTab}>
            <div className={styles.tabs}>
              {tabData.map(({ title, link }) => (
                <Link href={link} key={title}>
                  <span className={`${styles.tab} ${link === '/blogs' ? styles.active : ''}`}>{title}</span>
                </Link>
              ))}
            </div>
            <div className={styles.tabContents}>
              {/* <div className={styles.filter}>
                <div className={styles.filtercheck}>
                  <label className="checkbox"><input name="brochures" type="radio" /><i className="icon-polygon"></i> All Brochures</label>
                  <label className="checkbox"><input name="brochures" type="radio" /><i className="icon-polygon"></i> Product Engineering Services</label>
                  <label className="checkbox"><input name="brochures" type="radio" /><i className="icon-polygon"></i> Digital Technology & Solutions</label>
                </div>
                <div className={styles.filterSearch}>
                  <input type="text" placeholder="Search" />
                  <button className="icon-search"></button>
                </div>
              </div> */}
                <div className={styles.content}>
                  {<div className={`${styles.listGrid} ${styles.columnlist}`}>
                    <InfiniteScroll
                      dataLength={posts.length}
                      hasMore={posts.length < data.length}
                      loader={<h4>Loading...</h4>}
                      pullDownToRefreshThreshold={300}
                      endMessage={
                        <h6 style={{ textAlign: 'center', marginTop: '4em' }}>
                          Thank you! You have seen it all
                        </h6>
                      }
                      next={() => {
                        setPage(page + 1);
                      }}
                    >
                      {posts.map(({ title, image, slug }) => (
                        <div className={styles.grid} key={title}>
                          <i></i>
                          <div>
                            <figure>
                              <Imagecomponent image={image} alt={title} layout="fill" element="img"/>
                            </figure><em></em>
                            <div className={styles.cnt}>
                              <h3>{title}</h3>
                              <a onClick={(e) => {e.preventDefault();router.push(`/blog/${slug}`)}} key={title}>
                              {/* <Link href={`/blog/${slug}`} key={title}> */}
                                <a className="btn white">Read more</a>
                              {/* </Link> */}
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </InfiniteScroll>
                  </div>}
                </div>
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
    const props = await getCommonPageData(`/blogs?_limit=-1`);
    return { props, revalidate: process.env.reValidation }
  } catch (error) {
    console.error(error);
    return { props: { data: null }, revalidate: process.env.reValidation };
  }
}

export default blogs;
