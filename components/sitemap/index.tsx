import React from "react";
import Link from "next/link"; 
import styles from "./style.module.scss";

export default function Sitemap({data, componentId}) {
  const getParentLink = (key) => {
    let url = '';
    if(key === 0) {
      url = '/product-engineering-services';
    } else if(key === 1) {
      url = '/digital-technologies';
    } else if(key === 2) {      
      url = '/about-us';
    }
    return url;
  }

  return (
    <section className={styles.siteMap} id={componentId}>
      <div className={styles.banner} style={{ backgroundImage: "url(" + data?.banner_image?.url + ")", backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
        <h1>{data?.title}</h1>
      </div>
      <div className={styles.section}>
        <div className="container">
          <h3><Link href="/">Home</Link></h3>
          <ul className={styles.links}>
            {data?.submenu?.map((menu, key) => {
              return (
                <li key={key}>
                  <h4>{menu?.link ? <Link href={'/'+menu?.link?.slug}>{(menu?.title ? menu?.title : menu?.link?.title)}</Link> : <>{menu?.title}</>}</h4>
                  {menu?.list.length > 0 && <ul>
                    {menu?.list?.map((m1, k1) => {
                      const parentLink = getParentLink(key);
                      return (
                        <li key={k1}>
                          <Link href={parentLink + '/' + m1?.page?.slug}>{(m1?.page?.title)}</Link>
                          {m1?.subpages?.length > 0 &&
                            <ul>
                              {m1?.subpages?.map((m2, k2) => {
                                const subParentLink = parentLink + '/' + m1?.page?.slug;
                                return (
                                  <li key={k2}>
                                    <Link href={subParentLink + '/' + m2?.slug}>{m2?.title}</Link>
                                  </li>
                                )
                              })}
                            </ul>
                          }
                        </li>
                      )
                    })}
                  </ul>}
                </li>
              )
            })}
          </ul>
          {data?.legal?.legal_sub_pages?.length > 0 && <ul className={styles.links2}>
            <li>
              <h4>{data?.legal?.title}</h4>
              <ul>
                {data?.legal?.legal_sub_pages?.map((sp, index) => (
                  <li key={index}>
                    <Link href={'/' + sp?.slug}>{sp?.title}</Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>}
        </div>
      </div>
    </section>
  );
}
