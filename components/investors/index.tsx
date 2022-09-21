import React, { useRef, useState, useEffect } from "react";
import { clone, trim } from 'ramda';
import Header from "components/header";
import Footer from "components/footer";
import Link from "next/link";
import styles from "./style.module.scss";
import Blog from "components/blog";
import { Imagecomponent } from "@components/common/image";

const menuData = [
  {
    title: "All",
    value:''
  },
  {
    title: "Letter of Appointment",
    value:'letterofappointment'
  },
  {
    title: "Notice to the Shareholders",
    value:'noticetotheshareholders'
  },
  {
    title: "Others",
    value:'others'
  },
  {
    title: "Policies",
    value:'policies'
  }
]

export default function Investors({data, componentId}) {
  const [activeTab, setActiveTab] = useState('');
  const [search, setSearch] = useState('');
  const [investorsList, setInvestorsList] = useState([]);

  useEffect(() => {
    let list = clone(data?.list);
    if(activeTab) {
      list = list.filter(l => l.type === activeTab)
    }
    
    if(trim(search).toLowerCase().length > 0) {
      list = list.filter(l => {
        console.log(search, l.title, l.title?.toLowerCase()?.indexOf(search))
        return l.title?.toLowerCase()?.indexOf(search) !== -1
      
      })
    }
    setInvestorsList(list);
  }, [search, activeTab]);
  
  return (
    <>
      <section className={styles.brochures} id={componentId}>
        <figure className={styles.bg}>
            {/* <Imagecomponent image={props?.background_image} /> */}
          <img src="/static/bg-005.jpg" alt="" />
        </figure>
        <div className="container">
          <div className={styles.brochuresWrap}>
            <h1 className="title">{data?.title || 'Investors'}</h1>
            <div className={styles.contactTab}>
              <div className={styles.tabs}>
                {menuData.map(({ title, value }) => (
                  <span className={`${styles.tab} ${activeTab === value ? styles.active : ''}`} onClick={(e) => {
                    setActiveTab(value);
                  }} key={value}>{title}</span>
                ))}
              </div>
              <div className={styles.tabContents}>
                <div className={styles.filter}>
                  <div className={styles.filterSearch}>
                    <input type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
                    <button className="icon-search"></button>
                  </div>
                </div>
                {investorsList?.length > 0 && (
                  <div className={styles.content}>
                    {<div className={`${styles.listGrid}`}>
                      {investorsList.map((inv) => (
                        <div className={styles.grid} key={inv.id}>
                          <div className={styles.cnt}>
                            <h3>{inv?.title}</h3>
                            <i>
                              <svg xmlns="http://www.w3.org/2000/svg" width="54.032" height="57.557" viewBox="0 0 54.032 57.557">
                                <g data-name="Group 23" transform="translate(0)" opacity="0.89">
                                  <path d="M117.087,491.307a3.757,3.757,0,0,1-2.744-2.7,3.591,3.591,0,0,1-.1-.944c0-4.566.005-9.133-.01-13.7,0-.5.138-.684.663-.677q2.975.04,5.951,0c.509-.006.677.147.674.666-.02,3.144,0,6.288-.021,9.432,0,.525.125.707.682.707q19.061-.022,38.122,0c.56,0,.684-.186.68-.709-.021-3.125,0-6.251-.023-9.376,0-.576.174-.732.734-.723q2.947.046,5.895,0c.527-.007.663.178.661.679-.015,4.4-.059,8.8.013,13.193a3.888,3.888,0,0,1-2.869,4.151Z" transform="translate(-114.23 -433.75)" />
                                  <path d="M212.659,205.506q0-5.53,0-11.06c0-1.466.665-2.137,2.116-2.138q3.369,0,6.737,0a1.813,1.813,0,0,1,2.007,2.021q0,11.173,0,22.345c0,.795,0,.8.8.8,2.04,0,4.08.011,6.12,0a1.879,1.879,0,0,1,1.494,3.227q-4.415,5.05-8.836,10.095-1.72,1.964-3.442,3.925a1.887,1.887,0,0,1-3.123,0q-6.124-6.986-12.243-13.976a1.923,1.923,0,0,1-.456-2.17,1.857,1.857,0,0,1,1.908-1.1c2.077.015,4.155-.012,6.232.016.535.007.7-.143.7-.69C212.649,213.029,212.659,209.267,212.659,205.506Z" transform="translate(-191.082 -192.305)" />
                                </g>
                              </svg>
                            </i>
                          </div>
                          <a className={styles.link} href={inv?.file?.url} target="_blank"></a>
                        </div>
                      ))}
                    </div>}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
