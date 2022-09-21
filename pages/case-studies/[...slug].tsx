import axios from 'axios'; 
import Layout from '@components/layout';
import Resource from '@components/resources-form';
import { getPathData, getCommonPageData } from '@lib/helpers';

function CaseStudies(props) {
    return (
      <Layout {...props}>
        <Resource countries={props?.countries} data={props.data} back='/case-studies' />
      </Layout>
    )
}

export async function getStaticPaths() {
  const paths = await getPathData('/casestudies')

  return {
    paths,
    fallback: true // See the "fallback" section below
  };
}

export async function getStaticProps({params}) {
  const slug = params.slug.pop() || process.env.homeUrl;
  try {
    const props = await getCommonPageData(`/casestudies/find/${slug}`);
    console.log(`Building slug: /casestudies/find/${slug}`)
    return { props, revalidate: process.env.reValidation }
  } catch (error) {
    console.error(error);
    return { props: { data: null } };
  }
}

export default CaseStudies;
