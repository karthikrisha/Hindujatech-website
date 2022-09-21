import { GetServerSideProps } from 'next';;
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import axios from 'axios';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { data: pages } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/pages`
    );

    const fields: ISitemapField[] = pages.map(page => {
        let slug = page?.parent ? `${page?.parent?.slug}/${page.slug}`: page.slug;
        return {
            loc: `https://hindujatech.com/${slug}`,
            lastmod: new Date().toISOString()
        }
    });

    return getServerSideSitemap(ctx, fields)
}

export default function Site() {

}