import React, { useState, useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import Link from "next/link";
import styles from "@styles/blogs/style.module.scss";
import Layout from "@components/layout";
import { getCommonPageData, getPathData } from "@lib/helpers";
import { Imagecomponent } from "@components/common/image";
import Nodata from "@components/nodata";

function Tags(props) {
  const { data } = props;
  //const pageData = getPageData(menuItems, 'blogs');
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const postPerView = 10;

  useEffect(() => {
    setPosts(data?.blogs?.slice(0, page * postPerView));
  }, [page]);

  return (
    <Layout {...props}>
      <section className={styles.brochures}>
        <div className="container">
          <div className={styles.brochuresWrap}>
          <h1 className="title">Tag: {props.data?.tag}</h1>
            <div className={styles.contactTab}>              
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
                      {posts?.length === 0 && <Nodata />}
                      <InfiniteScroll
                        dataLength={posts?.length}
                        hasMore={posts?.length < data?.blogs?.length}
                        loader={<h4>Loading...</h4>}
                        pullDownToRefreshThreshold={300}
                        next={() => {
                          setPage(page + 1);
                        }}
                      >
                        {posts?.map(({ title, image, slug }) => (
                          <div className={styles.grid} key={title}>
                            <i></i>
                            <div>
                              <figure>
                                <Imagecomponent image={image} alt={title} layout="fill" element="img"/>
                              </figure><em></em>
                              <div className={styles.cnt}>
                                <h3>{title}</h3>
                                <Link href={`/blog/${slug}`} key={title}>
                                  <a className="btn white">Read more</a>
                                </Link>
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
  )
}

export async function getStaticPaths() {
  const paths = await getPathData('/tags');

  return {
    paths,
    fallback: true // See the "fallback" section below
  };
}

export async function getStaticProps({params}) {
  const slug = params.slug.pop() || process.env.homeUrl;
  try {
    const props = await getCommonPageData(`/tags/find/${slug}`);
    console.log(`Building slug: /tags/find/${slug}`)
    return { props, revalidate: process.env.reValidation }
  } catch (error) {
    console.error(error);
    return { props: { data: null } };
  }
}

export default Tags;
