import axios from 'axios';
import dateFormat from 'dateformat';

export const getThumb = (image, size = '') => {
    let url = image?.url || '';
    if(size && image?.formats && image[size]) {
        url = image[size].url
    }

    return url;
}

export const getPageData = (data, slug) => {
    const pageData = data.filter(page => page.slug === slug)
    return pageData[0] || [];
}

export const getCommonPageData = async (apiUrl) => {
    console.log('getCommonPageData', apiUrl)
    const { data: menuItems } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/pages`
    );

    let data;
    
    if(apiUrl) {        
        await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}${apiUrl}`
        ).then(res => {data = res?.data ? res?.data : null});
    }

    const { data: hamburgermenu } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/menu`
    );

    const { data: searchKeywords } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/search-keywords`
    );
    
    const { data: footerData } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/footer`
    );
    
    const { data: country } = await axios.get(
        `https://api.geoapify.com/v1/ipinfo?apiKey=${process.env.GEOAPIFY_COUNTRY_TOKEN}`
    );
    
    const activeLink = apiUrl?.replace(/^\//, '').split('/').pop();
    
    //if(activeLink === 'contact-us') {
    const { data: countries } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/countries?_limit=-1`
    );
    //data.countries = countries;
    //}

    return {
        menuItems,
        data: data ? data : null,
        countries,
        headerData: {
            menuItems,
            hamburgermenu,
            searchKeywords,
            activeLink,
            country: country?.country?.iso_code ? country?.country?.iso_code.toLowerCase() : 'en'
        },
        footerData
    }
}

export const getPathData = async (apiUrl, excludePaths = []) => {
    const { data: menuItems } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${apiUrl}`
    );

    const removeExcludePaths = menuItems?.filter(mi => !excludePaths.includes(mi.slug))

    const paths = await removeExcludePaths.map(menu => {
        return {
            params: {slug: [menu.slug]}
        }
    });

    return paths
}

export default function formatDate(dateString, format = 'mmm dS, yyyy') {
    return dateFormat(dateString, format); //July 11, 2021
}

export const hasVideo = (obj) => {
    return obj?.mime ? obj?.mime?.indexOf('video/') !== -1 : false;
}

export const textAbstract = (text, length = 100) => {
    if (text == null) {
        return "";
    }
    if (text.length <= length) {
        return text;
    }
    let ftext = text.substring(0, length);
    let last = ftext.lastIndexOf(" ");
    let finaltext = ftext.substring(0, last);
    return finaltext + "...";
}

export const downloadFile = (downloadUrl, fileName) => {
    // if(!downloadUrl || !fileName) return;
    // var anchor = document.createElement('a');
    // anchor.href = downloadUrl;
    // anchor.target = '_blank';
    // anchor.download = fileName;
    // anchor.click();

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.target = '_blank';
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
}
