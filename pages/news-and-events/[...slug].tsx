import axios from 'axios';
import Link from "next/link";
import { pluck } from 'ramda';
import ReactMarkdown from "react-markdown";
import Layout from '@components/layout';
import Share from '@components/share';
import Image from "next/image";
import formatDate, { getThumb, getCommonPageData, getPathData } from '@lib/helpers';
import styles from "./style.module.scss";
import { Imagecomponent } from '@components/common/image';
import SubscriptionForm from '@components/forms/subscriptionForm';

function News(props) {
  const { linkedinList } = props;
  return (
      <Layout {...props}>
      <section className={styles.blogView}>
        <div className="container">
          <div className={styles.wrap}>
            <h1 className={styles.title}>{props.data?.title || ''}</h1>
            <p className={styles.date}>{formatDate(props.data?.created_at)}</p>
            <div className={styles.blogRow}>
              <div className={styles.content}>
                <div className={styles.disc}>
                  <Imagecomponent image={props.data?.image} layout="fill" />
                  <ReactMarkdown skipHtml={false}>{props.data?.description}</ReactMarkdown>
                </div>
                {props?.data?.tags?.length > 0 && <div className={styles.tags}>
                  <h3>Tags</h3>
                  <ul>
                    {props?.data?.tags?.map(tag => <li key={tag.slug}>
                      <Link href={`/blogs/tag/${tag.slug}`} ><a>{tag.tag}</a></Link>
                    </li>)}
                  </ul>
                </div>}
                <div className={styles.share}>
                    <h3>Share</h3>
                    <Share />
                </div>
              </div>
              <div className={styles.sideBar}>
                <div className={styles.subscribe}>
                  <h4>Subscribe to Email Updates</h4>
                  <div className={styles.qForm}>
                    <SubscriptionForm styles={styles} />
                  </div>
                </div>
                <div className={styles.inner}>
                  <h4>FOLLOW US ON</h4>
                  <p><b>LinkedIn </b><span><a href="https://www.linkedin.com/company/hindujatech" target="_blank">@Hinduja Tech Limited</a></span></p>
                  {linkedinList?.length > 0 && <div className={styles.scrollWrap}>
                    <div className={styles.scrollCnt}>
                      <div className={styles.linkedinList}>
                        {linkedinList?.map((list) => (
                          <iframe key={list?.id} src={list?.feed} height="300" width="240" frameBorder="0" title="Embedded post"></iframe>
                        ))}
                      </div>
                    </div>
                  </div>}
                  <p>{/*<b>Tweets by </b><span><a href="https://twitter.com/hindujatech?ref_src=twsrc%5Etfw" target="_blank">@Hinduja Tech Limited</a></span>*/}</p>
                  <div className={styles.scrollWrap}>
                    <div className={styles.scrollCnt}>
                      <div>
                        <a className="twitter-timeline" href="https://twitter.com/hindujatech?ref_src=twsrc%5Etfw"></a> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                      </div>
                    </div>
                  </div>
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
  const paths = await getPathData('/news')

  return {
    paths,
    fallback: 'blocking' // See the "fallback" section below
  };
}

export async function getStaticProps({params}) {
  const slug = params.slug.pop() || process.env.homeUrl;
  try {
    let props = await getCommonPageData(`/news/find/${slug}`);
    console.log(`Building slug: /news/find/${slug}`)
    const { data: linkedinList } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/linkedin-feeds`
    );
    //@ts-ignore
    props = { ...props, linkedinList };
    return { props, revalidate: process.env.reValidation }
  } catch (error) {
    console.error(error);
    return { props: { data: null }, revalidate: process.env.reValidation };
  }
}

export default News;
