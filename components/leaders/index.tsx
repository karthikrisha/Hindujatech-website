import React, { useRef, useState, useEffect } from "react";
import Header from "components/header";
import Footer from "components/footer";
import Link from "next/link";
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";
 
const data = [
  {
    name: 'KUMAR PRABHAS',
    position: 'Chief Executive Officer',
    content: '<p>Kumar Prabhas is the Chief Executive Officer of Hinduja Tech Limited. An alumnus of IIT Kanpur, Prabhas has over 25 years of experience in the technology industry. Prior to joining Hinduja Tech, Prabhas has worked with L&T Technology Services, Unisys, Sasken, Wipro and Multitech Software.</p><p>Immediately preceding Hinduja Tech, Prabhas was the Chief Operating Officer (COO) and Whole-Time Director on the Board of L&T Technology Services.</p><p>At Unisys, Prabhas managed dual responsibilities as the Managing Director of Unisys (India) as well as that of Global Head of End-User Services.</p><p></p><p>Prior to Unisys, Prabhas served as the Chief Operating Officer of Sasken Communication, where he led the company through significant growth of Sasken’s services business. He played a key role in preparing the company for its successful IPO.</p><p>At Wipro Technologies, Prabhas was the worldwide sales leader for the Telecom business. Prior to Wipro, Prabhas has worked at Multitech Software where he, along with four others, started Multitech Software India operations.</p>',
    photo: 'KUMAR-PRABHAS.jpg',
    linkedin: '#'
  },
  {
    name: 'FAIZ AHMAD',
    position: 'Head – Product Engineering',
    content: '<p>Kumar Prabhas is the Chief Executive Officer of Hinduja Tech Limited. An alumnus of IIT Kanpur, Prabhas has over 25 years of experience in the technology industry. Prior to joining Hinduja Tech, Prabhas has worked with L&T Technology Services, Unisys, Sasken, Wipro and Multitech Software.</p><p>Immediately preceding Hinduja Tech, Prabhas was the Chief Operating Officer (COO) and Whole-Time Director on the Board of L&T Technology Services.</p><p>At Unisys, Prabhas managed dual responsibilities as the Managing Director of Unisys (India) as well as that of Global Head of End-User Services.</p><p></p><p>Prior to Unisys, Prabhas served as the Chief Operating Officer of Sasken Communication, where he led the company through significant growth of Sasken’s services business. He played a key role in preparing the company for its successful IPO.</p><p>At Wipro Technologies, Prabhas was the worldwide sales leader for the Telecom business. Prior to Wipro, Prabhas has worked at Multitech Software where he, along with four others, started Multitech Software India operations.</p>',
    photo: 'FAIZ-AHMAD.jpg',
    linkedin: '#'
  },
  {
    name: 'PRASHANT NIRMALE',
    position: 'Head- Digital Technology <br/>Solutions (DTS)',
    content: '<p>Kumar Prabhas is the Chief Executive Officer of Hinduja Tech Limited. An alumnus of IIT Kanpur, Prabhas has over 25 years of experience in the technology industry. Prior to joining Hinduja Tech, Prabhas has worked with L&T Technology Services, Unisys, Sasken, Wipro and Multitech Software.</p><p>Immediately preceding Hinduja Tech, Prabhas was the Chief Operating Officer (COO) and Whole-Time Director on the Board of L&T Technology Services.</p><p>At Unisys, Prabhas managed dual responsibilities as the Managing Director of Unisys (India) as well as that of Global Head of End-User Services.</p><p></p><p>Prior to Unisys, Prabhas served as the Chief Operating Officer of Sasken Communication, where he led the company through significant growth of Sasken’s services business. He played a key role in preparing the company for its successful IPO.</p><p>At Wipro Technologies, Prabhas was the worldwide sales leader for the Telecom business. Prior to Wipro, Prabhas has worked at Multitech Software where he, along with four others, started Multitech Software India operations.</p>',
    photo: 'PRASHANT-NIRMALE.jpg',
    linkedin: '#'
  },
  {
    name: 'VIJAY MALIK',
    position: 'President - Americas <br/>EMEA & Marketing Head',
    content: '<p>Kumar Prabhas is the Chief Executive Officer of Hinduja Tech Limited. An alumnus of IIT Kanpur, Prabhas has over 25 years of experience in the technology industry. Prior to joining Hinduja Tech, Prabhas has worked with L&T Technology Services, Unisys, Sasken, Wipro and Multitech Software.</p><p>Immediately preceding Hinduja Tech, Prabhas was the Chief Operating Officer (COO) and Whole-Time Director on the Board of L&T Technology Services.</p><p>At Unisys, Prabhas managed dual responsibilities as the Managing Director of Unisys (India) as well as that of Global Head of End-User Services.</p><p></p><p>Prior to Unisys, Prabhas served as the Chief Operating Officer of Sasken Communication, where he led the company through significant growth of Sasken’s services business. He played a key role in preparing the company for its successful IPO.</p><p>At Wipro Technologies, Prabhas was the worldwide sales leader for the Telecom business. Prior to Wipro, Prabhas has worked at Multitech Software where he, along with four others, started Multitech Software India operations.</p>',
    photo: 'VIJAY-MALIK.jpg',
    linkedin: '#'
  },
  {
    name: 'SANJAY PATIL',
    position: 'Senior Vice President – Sales (India)',
    content: '<p>Kumar Prabhas is the Chief Executive Officer of Hinduja Tech Limited. An alumnus of IIT Kanpur, Prabhas has over 25 years of experience in the technology industry. Prior to joining Hinduja Tech, Prabhas has worked with L&T Technology Services, Unisys, Sasken, Wipro and Multitech Software.</p><p>Immediately preceding Hinduja Tech, Prabhas was the Chief Operating Officer (COO) and Whole-Time Director on the Board of L&T Technology Services.</p><p>At Unisys, Prabhas managed dual responsibilities as the Managing Director of Unisys (India) as well as that of Global Head of End-User Services.</p><p></p><p>Prior to Unisys, Prabhas served as the Chief Operating Officer of Sasken Communication, where he led the company through significant growth of Sasken’s services business. He played a key role in preparing the company for its successful IPO.</p><p>At Wipro Technologies, Prabhas was the worldwide sales leader for the Telecom business. Prior to Wipro, Prabhas has worked at Multitech Software where he, along with four others, started Multitech Software India operations.</p>',
    photo: 'SANJAY-PATIL.jpg',
    linkedin: '#'
  },
  {
    name: 'GANAPATHYRAMAN S',
    position: 'Chief Financial Officer',
    content: '<p>Kumar Prabhas is the Chief Executive Officer of Hinduja Tech Limited. An alumnus of IIT Kanpur, Prabhas has over 25 years of experience in the technology industry. Prior to joining Hinduja Tech, Prabhas has worked with L&T Technology Services, Unisys, Sasken, Wipro and Multitech Software.</p><p>Immediately preceding Hinduja Tech, Prabhas was the Chief Operating Officer (COO) and Whole-Time Director on the Board of L&T Technology Services.</p><p>At Unisys, Prabhas managed dual responsibilities as the Managing Director of Unisys (India) as well as that of Global Head of End-User Services.</p><p></p><p>Prior to Unisys, Prabhas served as the Chief Operating Officer of Sasken Communication, where he led the company through significant growth of Sasken’s services business. He played a key role in preparing the company for its successful IPO.</p><p>At Wipro Technologies, Prabhas was the worldwide sales leader for the Telecom business. Prior to Wipro, Prabhas has worked at Multitech Software where he, along with four others, started Multitech Software India operations.</p>',
    photo: 'GANAPATHYRAMAN-S.jpg',
    linkedin: '#'
  }
]

export default function Leaders(props) {
  const [activeTab, setActiveTab] = useState(null);
  return (
    <section className={styles.ourLeaders} key={props?.componentId}>
      {/* <section className={`${styles.banner} ${styles.inner}`} >
        <div className={styles.childInPos}>
            <div className={styles.image}>
              <img
                src="/static/gold-pawn-chess.jpg"
                alt="event"
              />
            </div>
            <div className={styles.content}>
              <div className="container">
                <h1>Meet Our Leaders</h1>
              </div>
            </div>
          </div>
      </section> */}
      <section className={styles.ourLeadersList}>
        <div className="container">
          <div className={styles.boxs}>
            {props.data?.leaders?.map(({ name, position, description, image, linkedin, id }) => (
              <div key={`leader${id}`} className={styles.box}>
                <div className={styles.box}>
                  <div className={styles.title}>
                    <div className={styles.titleWrap}>
                      <figure>
                        <span><Imagecomponent image={image} /></span>
                      </figure>
                      <div className={styles.flexWrap}>
                        <div className={styles.left}>
                          <h3>{name}</h3>
                          <p dangerouslySetInnerHTML={{ __html: position }} />
                        </div>
                        <div className={styles.right}>
                          <span className={styles.btn} onClick={(e) => {setActiveTab(id)}}><em></em><i className="icon-right-arrow-2"></i><span>Know More</span></span>
                          {linkedin && <a className={styles.link} href={linkedin} target="_blank"><i className="icon-linkedin"></i></a>}
                        </div>
                      </div>
                    </div>
                  </div>
                  { activeTab === id && <div className={styles.content}><i className={styles.left}></i><i className={styles.right}></i><div dangerouslySetInnerHTML={{ __html: description }} /></div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
