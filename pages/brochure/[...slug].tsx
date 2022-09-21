import axios from 'axios';
import { isEmpty } from 'ramda';
import DataRenderer from '@components/data-renderer';
import Layout from '@components/layout';
import Image from "next/image";
import { getThumb, getPathData, getCommonPageData } from '@lib/helpers';
import styles from "./style.module.scss";
import Link from 'next/link';
import Resource from '@components/resources-form';

function Brochure(props) {
    return (
        <Layout {...props}>
          <Resource countries={props?.countries} data={props.data} back='/brochures'/>
        </Layout>
    )
}

export async function getStaticPaths() {
  const paths = await getPathData('/brochures')

  return {
    paths,
    fallback: true // See the "fallback" section below
  };
}

export async function getStaticProps({params}) {
  const slug = params.slug.pop() || process.env.homeUrl;
  try {
    const props = await getCommonPageData(`/brochures/find/${slug}`);
    console.log(`Building slug: /brochures/find/${slug}`)
    return { props, revalidate: process.env.reValidation }
  } catch (error) {
    console.error(error);
    return { props: { data: null } };
  }
}

export default Brochure;
