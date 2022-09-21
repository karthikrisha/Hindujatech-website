
import Router, { useRouter } from 'next/router';
import axios from 'axios';
import Layout from "@components/layout";
import DataRenderer from '@components/data-renderer';
import Nopage from '@components/page-not-found';
import { getCommonPageData } from '@lib/helpers';

function Home(props) {
  return props.data ? <Layout {...props}><DataRenderer data={props.data} country={props?.headerData?.country}/></Layout> :  <Nopage />;
}

export async function getStaticProps(appContext) {
  try {    
    console.log('from pages main slugggggggggg', process.env.homeUrl)
    const props = await getCommonPageData(`/pages/find${process.env.homeUrl}`);
    return { props, revalidate: process.env.reValidation };
  } catch (error) {
    console.error(error);
    return { props: { data: null } };
  }
}

export default Home;