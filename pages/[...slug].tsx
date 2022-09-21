import axios from 'axios'; 
import DataRenderer from '@components/data-renderer';
import Layout from '@components/layout';
import { getCommonPageData, getPathData } from '@lib/helpers';
import PageNotFound from '@components/page-not-found';
import Pagebanner from "@components/pagebanner";
import { excludePaths } from '@lib/constants';

function Page(props) {
  const testData = {
    subtitle: props.data?.title,
    banner_image: {url: 'https://storage.googleapis.com/htech/Virtual_Validation_banner_b4e2ea3828/Virtual_Validation_banner_b4e2ea3828.jpg?9088009.5'}
  }
  return (
    <Layout {...props}>
      {props.data?.content?.length > 0
        ? <DataRenderer data={props.data} country={props?.headerData?.country} countries={props?.countries}/>
        : <PageNotFound/>}
    </Layout>
  )
}

// export async function getStaticPaths() {
//   const paths = await getPathData('/pages', excludePaths);

//   return {
//     paths,
//     fallback: 'blocking' // See the "fallback" section below
//   };
// }

// export async function getServerSideProps({params}) {
//   const slug = params.slug.pop() || process.env.homeUrl;
//   try {
//     const props = await getCommonPageData(`/pages/find/${slug}`);
//     return { props }
//   } catch (error) {
//     const props = await getCommonPageData('');
//     return { props };
//   }
// }

//export default Page;

export async function getStaticPaths() {
  const paths = await getPathData('/pages', excludePaths);

  return {
    paths,
    fallback: 'blocking' // See the "fallback" section below
  };
}

export async function getStaticProps({params}) {
  console.log('from pages slugggggggggg before', JSON.stringify(params))
  const slug = params.slug.pop() || process.env.homeUrl;
  console.log('from pages slugggggggggg after', slug, JSON.stringify(params))
  try {
    const props = await getCommonPageData(`/pages/find/${slug}`);
    console.log(`Building slug: ${slug}`)
    return { props, revalidate: process.env.reValidation }
  } catch (error) {
    console.error(error);
    const props = await getCommonPageData('');
    return { props };
  }
}

export default Page;