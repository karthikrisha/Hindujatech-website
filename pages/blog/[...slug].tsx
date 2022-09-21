import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
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

function Blog(props) {
  // const [linkedinList, setLinkedinList] = useState([]);
  // useEffect(()=> {
  //   axios.get('http://localhost:1337/linkedin-feeds')
  //     .then(res => {
  //       setLinkedinList(res.data)
  //     })
  // }, [])
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const { linkedinList } = props;
  const currentCategory = props?.data?.categories?.length && pluck('id', props?.data?.categories);
  return (
    <Layout {...props}>
      <section className={styles.blogView}>
        <div className="container">
          <div className={styles.wrap}>
            <h1 className={styles.title}>{props.data?.title || ''}</h1>
            <p className={styles.date}>by {props.data?.author?.name || 'Admin'}. | {formatDate(props.data?.created_at)}</p>
            <div className={styles.blogRow}>
              <div className={styles.content}>
                <div className={styles.disc}>
                  <Imagecomponent image={props.data?.image} layout="fill" />
                  <ReactMarkdown skipHtml={false}>{props.data?.description}</ReactMarkdown>
                </div>
                {props?.data?.tags?.length > 0 && <div className={styles.tags}>
                  <h3>Tags</h3>
                  <ul>
                    {props?.data?.tags?.map((tag, key) => <li key={tag.slug}>
                      <a onClick={(e) => {e.preventDefault();router.push(`/blogs/tag/${tag.slug}`)}} key={key}>
                        {tag.tag}
                      </a>
                    </li>)}
                  </ul>
                </div>}
                <div className={styles.share}>
                  <h3>Share</h3>
                  <Share />
                </div>
                <div className={styles.aboutAuthor}>
                  <h3>About Author</h3>
                  <div className={styles.author}>
                    <div>
                      <figure>
                        {props.data?.author
                          ? <Imagecomponent image={props.data?.author?.image} />
                          : <img src="/static/default-author-thumbnail.jpg" alt="" />}
                      </figure>
                      <div className={styles.cnt}>
                        <h4>{props.data?.author?.name || 'Admin'}</h4>
                        <p></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.sideBar}>
                <div className={styles.subscribe}>
                  <h4>Subscribe to Email Updates</h4>
                  <div className={styles.qForm}>
                    <SubscriptionForm styles={styles} />
                  </div>
                </div>
                <div className={styles.FollowCompany}>
                  <script src="https://platform.linkedin.com/in.js" type="text/javascript" defer> lang: en_US</script>
                  <script type="IN/FollowCompany" data-id="507280" data-counter="bottom"></script>
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
                  {props?.categories?.length > 0 && <>
                    <h4>Categories</h4>
                    <ul className={styles.cate}>
                      {props?.categories?.map(category => <li key={category.slug}>
                        <a onClick={(e) => {e.preventDefault();router.push(`/blogs/category/${category.slug}`)}} className={currentCategory?.length && currentCategory?.includes(category.id) ? styles.active : ''}>{category.name} ({category.blogs?.length || 0})</a>
                        {/* <Link href={`/blogs/category/${category.slug}`} ><a className={currentCategory?.length && currentCategory?.includes(category.id) ? styles.active : ''}>{category.name} ({category.blogs?.length || 0})</a></Link> */}
                      </li>)}
                    </ul>
                  </>}
                </div>
              </div>
            </div>
          </div>
          {/* <div className={styles.leaveComment}>
            <h3 className="title-2">Leave a comment</h3>
            <div className={styles.qForm}>
              <form>
                <div className={styles.formFlex}>
                  <div className={styles.inputField}>
                    <label>First Name*</label>
                    <input type="text" />
                  </div>
                  <div className={styles.inputField}>
                    <label>Last Name</label>
                    <input type="text" />
                  </div>
                  <div className={styles.inputField}>
                    <label>Business Email*</label>
                    <input type="text" />
                  </div>
                  <div className={styles.inputField}>
                    <label>Company*</label>
                    <input type="text" />
                  </div>
                  <div className={`${styles.inputField} ${styles.selectField}`}>
                    <label>Country*</label>
                    <select>
                      <option>India</option>
                      <option>Option 1</option>
                      <option>Option 2</option>
                      <option>Option 3</option>
                    </select>
                  </div>
                </div>
                <div className={styles.inputField}>
                  <label>Comments*</label>
                  <textarea></textarea>
                </div>
                <div className={styles.action}>
                  <button className="btn">Submit Comment</button>
                </div>
              </form>
            </div>
          </div> */}
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = await getPathData('/blogs')

  return {
    paths,
    fallback: 'blocking' // See the "fallback" section below
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug.pop() || process.env.homeUrl;
  try {
    let props = await getCommonPageData(`/blogs/find/${slug}`);
    console.log(`Building slug: /blogs/find/${slug}`)
    const { data: categories } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`
    );
    const { data: linkedinList } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/linkedin-feeds`
    );
    //@ts-ignore
    props = { ...props, categories, linkedinList };

    return { props, revalidate: process.env.reValidation }
  } catch (error) {
    console.error('error =====> ', `/blogs/find/${slug}` );
    return { props: { data: null }, revalidate: process.env.reValidation };
  }
}

export default Blog;
