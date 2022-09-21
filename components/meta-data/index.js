import PropTypes from 'prop-types';
import Head from 'next/head';

export default function MetaData(props) {
  const {
    pageTitle,
    metaDescription,
    metaKeywords,
    ogTitle,
    ogDescription,
    ogImage
  } = props;
  return (
    <Head>
      {pageTitle && <title>{pageTitle}</title>}
      {metaDescription && <meta name="description" content={metaDescription} />}
      {metaKeywords && <meta name="keywords" content={metaKeywords} />}
      {ogTitle && <meta property="og:title" content={ogTitle} />}
      {ogDescription && (
        <meta property="og:description" content={ogDescription} />
      )}
      {ogImage?.url && <meta property="og:image" content={ogImage.url} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@hindujatech" />
      {ogTitle && <meta name="twitter:title" content={ogTitle} />}
      {ogDescription && (
        <meta name="twitter:description" content={ogDescription} />
      )}
      {ogImage?.url && <meta name="twitter:image" content={ogImage.url} />}
    </Head>
  );
}

MetaData.propTypes = {
  pageTitle: PropTypes.string,
  metaDescription: PropTypes.string,
  metaKeywords: PropTypes.string,
  ogUrl: PropTypes.string,
  /** max 70 chars */
  ogTitle: PropTypes.string,
  /** max 200 chars */
  ogDescription: PropTypes.string,
  ogImage: PropTypes.shape({
    url: PropTypes.string
  })
};
