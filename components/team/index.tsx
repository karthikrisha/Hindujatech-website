import React from "react";
import styles from "./style.module.scss";
import { useRouter } from 'next/router'
import { Imagecomponent } from "@components/common/image";


export default function Team({data, componentId}) {
  const router = useRouter();
  const contentClickHandler = (e) => {
    const targetLink = e.target.closest('a');
    if(!targetLink) return;
    e.preventDefault();
    
    router.push(targetLink.href)
  };

  return (
    <section className={styles.team} id={componentId}>
      <figure>
        <picture>
          {data?.banner?.url && <source media="(max-width: 769px)" srcSet={data?.mobile_banner?.url} />}
          {data?.banner?.url && <Imagecomponent image={data?.banner}/>}
        </picture>
      </figure>
      {data?.content && <div className="container">
        <div className={styles.content}>
          <h3 dangerouslySetInnerHTML={{ __html: data?.content }} onClick={contentClickHandler}/>
          {/* <h3>We are always on a look-out for great talent.
            <a href="">Join us</a> to build something awesome together! </h3> */}
        </div>
      </div>}
    </section>
  );
}
