import React, { useRef, useState, useEffect } from "react";
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";


export default function flowcontent({data, componentId}) {
  return (
    <section className={`${styles.flowcontent}`} id={componentId} >
      <div className="container">
        <div className={styles.flow1}>
          <h3 dangerouslySetInnerHTML={{ __html: data?.flow_1_title || 'Promoting Academic Excellence through<span>Digital Learning </span>' }}></h3>
          <span dangerouslySetInnerHTML={{ __html: data?.flow_1_description }}></span>
          {/* <p>Corporate Social Responsibility (CSR) at Hinduja Tech supports the company's mission to provide education who are deprived of quality schooling. Not only does the initiative help educate children from low-income families it also takes into account skill development through volunteering programs, and provide necessary learning gadgets that can improve the overall learning experience. </p> */}
        </div>
        <div className={styles.flow2}>
          <em></em>
          <h3 dangerouslySetInnerHTML={{ __html: data?.flow_2_title }}></h3>
          {/* <h3>People behind CSR at Hinduja Tech </h3> */}
          <figure>
            {/* <img src={'/static/CSR-at-Hinduja-Tech.png'} alt="" /> */}
            <Imagecomponent image={data?.flow_2_image} />
          </figure>
          <i className="icon-polygon"></i>
        </div>
        <div className={styles.flow3}>
          <span dangerouslySetInnerHTML={{ __html: data?.flow_3_description }}></span>
          {/* <p><strong>iCare: Volunteer From Home</strong> is a unique initiative launched for all Hinduja Group associates. The initiative provides an opportunity to interact with students of government schools and their families across the country, and engage them in a wide range of activities through technology based online & offline interactive modes. <strong>Learning Links Foundation</strong> is extending its support to the iCare program by implementing all the on-field volunteering activities.</p>
          <p>A lot of children across the country have benefited from this program, especially in these uncertain times, where learning losses have been significant owing to physical closure of schools. In such a scenario, iCare program proved to be a symbol of hope and joy for all the disadvantaged children and their families. The contribution of each volunteer has been immensely acknowledged by the children. The parents have expressed their gratitude for the sheer enthusiasm shown by the iCare and Hinduja Tech team to support their children’s learning.</p> */}
          <i className="icon-polygon"></i>
        </div>
        <div className={styles.flow4}>
          <h3 dangerouslySetInnerHTML={{ __html: data?.flow_4_title }}></h3>
          {/* <h3><span>CSR</span> Initiative </h3> */}
          {/* <p>Giving Back to the Community</p> */}
          <p dangerouslySetInnerHTML={{ __html: data?.flow_4_subtitle }}></p>
          <div className={styles.gridImage}>
            <figure>
              <Imagecomponent image={data?.flow_4_gridimage} />
              {/* <img src={'/static/Hinduja Tech CSR Initiative.jpg'} alt="" /> */}
            </figure>
            <div className={styles.img2}>
              <figure>
                <Imagecomponent image={data?.flow_4_image1} />
                {/* <img src={'/static/Hinduja Tech CSR Initiative 3.jpg'} alt="" /> */}
              </figure>
              <figure>
                <Imagecomponent image={data?.flow_4_image2} />
                {/* <img src={'/static/Hinduja Tech CSR Initiative 2.jpg'} alt="" /> */}
              </figure>
            </div>
          </div>
          <div className={styles.disc} dangerouslySetInnerHTML={{ __html: data?.flow_4_descripotion }}></div>
        </div>
        <div className={styles.flowlink}>
          <span dangerouslySetInnerHTML={{ __html: data?.flow_4_flowlink }}></span>
        </div>
        <div className={styles.flow5}>
          <figure>
            <Imagecomponent image={data?.flow_5_image} />
          </figure>
          <div className={styles.content}>
            <p dangerouslySetInnerHTML={{ __html: data?.flow_5_description }}></p>
            <a href={data?.flow_5_link} target="_blank" className="btn">know more </a>
          </div>
        </div>
      </div>
    </section>
  );
}
