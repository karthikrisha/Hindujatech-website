import React, { useRef, useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';
import { trim } from 'ramda';
import Layout from "@components/layout";
import Link from "next/link";
import Banner from "@components/pagebanner";
import styles from "./style.module.scss";
import { getCommonPageData } from "@lib/helpers";
import formatDate, { getPageData } from "lib/helpers";

function Search(props) {
  const { data } = props;
  const [result, setResult] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bannerData, setBannerData] = useState({});
  const [page, setPage] = useState(1);
  const postPerView = 5;
  const router = useRouter();
  
  const getSearchResult = () => {
    if(!router?.query?.keyword || router?.query?.keyword === undefined) return;
    setLoading(true);
    axios.get(`/api/search?_q=${trim(router?.query?.keyword)}`)
      .then((response => {
        setResult(response?.data?.data)
        setSearchResult(response?.data?.data?.slice(0, page * postPerView));
      }))
      .catch(err => {console.log('ERROR: ', err)})
      .finally(() => setLoading(false))
  }
  
  useEffect(() => {
    if(page === 1)
      getSearchResult();
    else
      setSearchResult(result?.slice(0, page * postPerView));

    const { content } = data;
    
    if(content?.length > 0 && content[0] && content[0].__component === 'product-engineering-services.banner') {      
      setBannerData ({...content[0], title: `${content[0].title} : ${router?.query?.keyword}` })
    }
  }, [router?.query?.keyword, page]);

  const getResult = (data) => {

    const contentType = data?.contentType;

    switch (contentType) {
      case 'blogs': 
        return <div className={styles.box}>
                  <Link href={`/blog/${data?.slug}`}><a><div>
                    <h3>{data?.title}</h3>
                    <b>{contentType}</b>
                    </div></a>
                  </Link></div>
      case 'brochures': 
        return <div className={styles.box}><Link href={`/brochure/${data?.slug}`}><a><div>
                    <h3>{data?.title}</h3>
                    <b>{contentType}</b>
                  </div>
                </a></Link></div>
      case 'casestudies': 
        return <div className={styles.box}><Link href={`/case-studies/${data?.slug}`}><a><div>
                    <h3>{data?.title}</h3>
                    <b>{contentType}</b>
                  </div>
                </a></Link></div>
      case 'category': 
        return <div className={styles.box}><Link href={`/blogs/category/${data?.slug}`}><a><div>
                    <h3>{data?.title || data?.slug}</h3>
                    <b>{contentType}</b>
                  </div>
                </a></Link></div>
      case 'news': 
        return <div className={styles.box}><Link href={`/news-and-events/${data?.slug}`}><a><div>
                    <h3>{data?.title}</h3>
                    <b>{contentType}</b>
                  </div>
                </a></Link></div>
      case 'tags': 
        return <div className={styles.box}><Link href={`/blogs/tag/${data?.slug}`}><a><div>
                    <h3>{data?.title || data?.slug}</h3>
                    <b>{contentType}</b>
                  </div>
                </a></Link></div>
      case 'pages': 
        return <div className={styles.box}><Link href={`/${data?.slug}`}><a><div>
                    <h3>{data?.title}</h3>
                    <b>{contentType}</b>
                  </div>
                </a></Link></div>
      case 'whitepaper': 
        return <div className={styles.box}><Link href={`/white-paper/${data?.slug}`}><a><div>
                    <h3>{data?.title}</h3>
                    <b>{contentType}</b>
                  </div>
                </a></Link></div>
      default :
        return <></>
    }
    
  }

  return (
    <Layout {...props}>
    <Banner data={bannerData} />
    <section className={styles.events}>
      {/* <section className={`${styles.banner} ${styles.inner}`} >
        <div className={styles.childInPos}>
            <div className={styles.image}>
              <img
                src="/static/event-bg.jpg"
                alt="event"
              />
            </div>
            <div className={styles.content}>
              <div className="container">
                <h1>{`Search : ${router?.query?.keyword}`}</h1>
              </div>
            </div>
          </div>
      </section> */}
      <div className="container">
        <div className={styles.boxs}>
        <InfiniteScroll
          dataLength={searchResult?.length}
          hasMore={searchResult?.length < result.length}
          loader={<h4>Loading...</h4>}
          pullDownToRefreshThreshold={300}
          // endMessage={
          //   <h6 style={{ textAlign: 'center', marginTop: '4em' }}>
          //     Thank you! You have seen it all
          //   </h6>
          // }
          next={() => {
            setPage(page + 1);
          }}
        >
          {searchResult?.length > 0 && searchResult?.map((res, index) => (
            <React.Fragment key={index}>
              {getResult(res)}
            </React.Fragment>
          ))}
        </InfiniteScroll>
        </div>
        {!loading && searchResult?.length === 0 && <div className={styles.boxs}>
          <div className={styles.box}>
            No Result Found
          </div>
        </div>}
      </div>
    </section>
    </Layout>
  );
}

export async function getStaticProps(appContext) {
  try {
    console.error('search us slufggggg' );
    const props = await getCommonPageData(`/pages/find/search`);
    return { props, revalidate: process.env.reValidation }
  } catch (error) {
    console.error(error);
    return { props: { data: null } };
  }
}

export default Search;
