import React, { useRef, useState, useEffect } from "react";
import { slice } from 'ramda';
import ReactMarkdown from "react-markdown";
import { Swiper, SwiperSlide } from "swiper/react";
import { isMobile } from "react-device-detect";
import SwiperCore, { Navigation, Pagination } from "swiper";
import styles from "./style.module.scss";

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

const dataSvg = [
  {
    polygon: "M217.9,143.5l69.3,127l-69.3,127H79.4l-69.3-127l69.3-127H217.9z",
    active1: "M294.8,265.1c-0.9,0-1.7-0.5-2.2-1.3l-67.3-122.1c-0.7-1.2-0.2-2.7,1-3.4c1.2-0.7,2.7-0.2,3.4,1L297,261.4c0.7,1.2,0.2,2.7-1,3.4C295.7,265,295.3,265.1,294.8,265.1z",
    active2: "M69.8,401.1c-0.9,0-1.7-0.5-2.2-1.3L0.3,277.8c-0.7-1.2-0.2-2.7,1-3.4c1.2-0.7,2.7-0.2,3.4,1L72,397.4c0.7,1.2,0.2,2.7-1,3.4C70.7,401,70.3,401.1,69.8,401.1z"
  },
  {
    polygon: "M447.3,4.5l69.3,127l-69.3,127H308.8l-69.3-127l69.3-127H447.3z",
    active1: "M523.2,127.1c-0.9,0-1.7-0.5-2.2-1.3L453.6,3.7c-0.7-1.2-0.2-2.7,1-3.4c1.2-0.7,2.7-0.2,3.4,1l67.3,122.1c0.7,1.2,0.2,2.7-1,3.4C524,127,523.6,127.1,523.2,127.1z",
    active2: "M298.2,263.1c-0.9,0-1.7-0.5-2.2-1.3l-67.3-122.1c-0.7-1.2-0.2-2.7,1-3.4c1.2-0.7,2.7-0.2,3.4,1l67.3,122.1c0.7,1.2,0.2,2.7-1,3.4C299,263,298.6,263.1,298.2,263.1z"
  },
  {
    polygon: "M675.9,140.5l69.3,127l-69.3,127H537.4l-69.3-127l69.3-127H675.9z",
    active1: "M753.7,263.1c-0.9,0-1.7-0.5-2.2-1.3l-67.3-122.1c-0.7-1.2-0.2-2.7,1-3.4c1.2-0.7,2.7-0.2,3.4,1l67.3,122.1c0.7,1.2,0.2,2.7-1,3.4C754.5,263,754.1,263.1,753.7,263.1z",
    active2: "M528.7,399.1c-0.9,0-1.7-0.5-2.2-1.3l-67.3-122.1c-0.7-1.2-0.2-2.7,1-3.4c1.2-0.7,2.7-0.2,3.4,1l67.3,122.1c0.7,1.2,0.2,2.7-1,3.4C529.5,399,529.1,399.1,528.7,399.1z"
  },
  {
    polygon: "M221.3,420.5l69.3,127l-69.3,127H82.8l-69.3-127l69.3-127H221.3z",
    active1: "M298.2,541.1c-0.9,0-1.7-0.5-2.2-1.3l-67.3-122.1c-0.7-1.2-0.2-2.7,1-3.4c1.2-0.7,2.7-0.2,3.4,1l67.3,122.1c0.7,1.2,0.2,2.7-1,3.4C299,541,298.6,541.1,298.2,541.1z",
    active2: "M73.2,677.1c-0.9,0-1.7-0.5-2.2-1.3L3.6,553.7c-0.7-1.2-0.2-2.7,1-3.4c1.2-0.7,2.7-0.2,3.4,1l67.3,122.1c0.7,1.2,0.2,2.7-1,3.4C74,677,73.6,677.1,73.2,677.1z"
  },
  {
    polygon: "M447.3,279.5l69.3,127l-69.3,127H308.8l-69.3-127l69.3-127H447.3z",
    active1: "M524.2,402.1c-0.9,0-1.7-0.5-2.2-1.3l-67.3-122.1c-0.7-1.2-0.2-2.7,1-3.4c1.2-0.7,2.7-0.2,3.4,1l67.3,122.1c0.7,1.2,0.2,2.7-1,3.4C525,402,524.6,402.1,524.2,402.1z",
    active2: "M299.2,538.1c-0.9,0-1.7-0.5-2.2-1.3l-67.3-122.1c-0.7-1.2-0.2-2.7,1-3.4c1.2-0.7,2.7-0.2,3.4,1l67.3,122.1c0.7,1.2,0.2,2.7-1,3.4C300,538,299.6,538.1,299.2,538.1z"
  },
  {
    polygon: "M676.3,418.5l69.3,127l-69.3,127H537.8l-69.3-127l69.3-127H676.3z",
    active1: "M753.7,541.1c-0.9,0-1.7-0.5-2.2-1.3l-67.3-122.1c-0.7-1.2-0.2-2.7,1-3.4c1.2-0.7,2.7-0.2,3.4,1l67.3,122.1c0.7,1.2,0.2,2.7-1,3.4C754.5,541,754.1,541.1,753.7,541.1z",
    active2: "M528.7,677.1c-0.9,0-1.7-0.5-2.2-1.3l-67.3-122.1c-0.7-1.2-0.2-2.7,1-3.4c1.2-0.7,2.7-0.2,3.4,1l67.3,122.1c0.7,1.2,0.2,2.7-1,3.4C529.5,677,529.1,677.1,528.7,677.1z"
  },
  {
    polygon: "M221.3,696.5l69.3,127l-69.3,127H82.8l-69.3-127l69.3-127H221.3z",
    active1: "M298.2,819.1c-0.9,0-1.7-0.5-2.2-1.3l-67.3-122.1c-0.7-1.2-0.2-2.7,1-3.4c1.2-0.7,2.7-0.2,3.4,1l67.3,122.1c0.7,1.2,0.2,2.7-1,3.4C299,819,298.6,819.1,298.2,819.1z",
    active2: "M73.2,955.1c-0.9,0-1.7-0.5-2.2-1.3L3.6,831.7c-0.7-1.2-0.2-2.7,1-3.4c1.2-0.7,2.7-0.2,3.4,1l67.3,122.1c0.7,1.2,0.2,2.7-1,3.4C74,955,73.6,955.1,73.2,955.1z"
  },
  {
    polygon: "M447.3,560.5l69.3,127l-69.3,127H308.8l-69.3-127l69.3-127H447.3z",
    active1: "M524.2,683.1c-0.9,0-1.7-0.5-2.2-1.3l-67.3-122.1c-0.7-1.2-0.2-2.7,1-3.4c1.2-0.7,2.7-0.2,3.4,1l67.3,122.1c0.7,1.2,0.2,2.7-1,3.4C525,683,524.6,683.1,524.2,683.1z",
    active2: "M299.2,819.1c-0.9,0-1.7-0.5-2.2-1.3l-67.3-122.1c-0.7-1.2-0.2-2.7,1-3.4c1.2-0.7,2.7-0.2,3.4,1l67.3,122.1c0.7,1.2,0.2,2.7-1,3.4C300,819,299.6,819.1,299.2,819.1z"
  },
  {
    polygon: "M676.8,696.5l69.3,127l-69.3,127H538.3l-69.3-127l69.3-127H676.8z",
    active1: "M753.7,819.1c-0.9,0-1.7-0.5-2.2-1.3l-67.3-122.1c-0.7-1.2-0.2-2.7,1-3.4c1.2-0.7,2.7-0.2,3.4,1l67.3,122.1c0.7,1.2,0.2,2.7-1,3.4C754.5,819,754.1,819.1,753.7,819.1z",
    active2: "M528.7,955.1c-0.9,0-1.7-0.5-2.2-1.3l-67.3-122.1c-0.7-1.2-0.2-2.7,1-3.4c1.2-0.7,2.7-0.2,3.4,1l67.3,122.1c0.7,1.2,0.2,2.7-1,3.4C529.5,955,529.1,955.1,528.7,955.1z"
  },
  {
    polygon: "M219.2,977l69.3,127l-69.3,127H80.7l-69.3-127l69.3-127H219.2z",
    active1: "M71.1,1233.6c-0.9,0-1.7-0.5-2.2-1.3L1.5,1110.2c-0.7-1.2-0.2-2.7,1-3.4c1.2-0.7,2.7-0.2,3.4,1l67.3,122.1c0.7,1.2,0.2,2.7-1,3.4C71.9,1233.5,71.5,1233.6,71.1,1233.6z",
    active2: "M296.1,1097.6c-0.9,0-1.7-0.5-2.2-1.3l-67.3-122.1c-0.7-1.2-0.2-2.7,1-3.4s2.7-0.2,3.4,1l67.3,122.1c0.7,1.2,0.2,2.7-1,3.4C296.9,1097.5,296.5,1097.6,296.1,1097.6z"
  },
  {
    polygon: "M445.2,836l69.3,127l-69.3,127H306.7l-69.3-127l69.3-127H445.2z",
    active1: "M297.1,1094.6c-0.9,0-1.7-0.5-2.2-1.3l-67.3-122.1c-0.7-1.2-0.2-2.7,1-3.4s2.7-0.2,3.4,1l67.3,122.1c0.7,1.2,0.2,2.7-1,3.4C297.9,1094.5,297.5,1094.6,297.1,1094.6z",
    active2: "M522.1,958.6c-0.9,0-1.7-0.5-2.2-1.3l-67.3-122.1c-0.7-1.2-0.2-2.7,1-3.4c1.2-0.7,2.7-0.2,3.4,1l67.3,122.1c0.7,1.2,0.2,2.7-1,3.4C522.9,958.5,522.5,958.6,522.1,958.6z"
  },
  {
    polygon: "M674.2,975l69.3,127l-69.3,127H535.7l-69.3-127l69.3-127H674.2z",
    active1: "M526.6,1233.6c-0.9,0-1.7-0.5-2.2-1.3l-67.3-122.1c-0.7-1.2-0.2-2.7,1-3.4c1.2-0.7,2.7-0.2,3.4,1l67.3,122.1c0.7,1.2,0.2,2.7-1,3.4C527.4,1233.5,527,1233.6,526.6,1233.6z",
    active2: "M751.6,1097.6c-0.9,0-1.7-0.5-2.2-1.3l-67.3-122.1c-0.7-1.2-0.2-2.7,1-3.4s2.7-0.2,3.4,1l67.3,122.1c0.7,1.2,0.2,2.7-1,3.4C752.4,1097.5,752,1097.6,751.6,1097.6z"
  },
  {
    polygon: "M219.2,1253l69.3,127l-69.3,127H80.7l-69.3-127l69.3-127H219.2z",
    active1: "M71.1,1511.6c-0.9,0-1.7-0.5-2.2-1.3L1.5,1388.2c-0.7-1.2-0.2-2.7,1-3.4c1.2-0.7,2.7-0.2,3.4,1l67.3,122.1c0.7,1.2,0.2,2.7-1,3.4C71.9,1511.5,71.5,1511.6,71.1,1511.6z",
    active2: "M296.1,1375.6c-0.9,0-1.7-0.5-2.2-1.3l-67.3-122.1c-0.7-1.2-0.2-2.7,1-3.4c1.2-0.7,2.7-0.2,3.4,1l67.3,122.1c0.7,1.2,0.2,2.7-1,3.4C296.9,1375.5,296.5,1375.6,296.1,1375.6z"
  },
  {
    polygon: "M445.2,1117l69.3,127l-69.3,127H306.7l-69.3-127l69.3-127H445.2z",
    active1: "M297.1,1375.6c-0.9,0-1.7-0.5-2.2-1.3l-67.3-122.1c-0.7-1.2-0.2-2.7,1-3.4c1.2-0.7,2.7-0.2,3.4,1l67.3,122.1c0.7,1.2,0.2,2.7-1,3.4C297.9,1375.5,297.5,1375.6,297.1,1375.6z",
    active2: "M522.1,1239.6c-0.9,0-1.7-0.5-2.2-1.3l-67.3-122.1c-0.7-1.2-0.2-2.7,1-3.4c1.2-0.7,2.7-0.2,3.4,1l67.3,122.1c0.7,1.2,0.2,2.7-1,3.4C522.9,1239.5,522.5,1239.6,522.1,1239.6z"
  },
  {
    polygon: "M674.7,1253l69.3,127l-69.3,127H536.2l-69.3-127l69.3-127H674.7z",
    active1: "M526.6,1511.6c-0.9,0-1.7-0.5-2.2-1.3l-67.3-122.1c-0.7-1.2-0.2-2.7,1-3.4c1.2-0.7,2.7-0.2,3.4,1l67.3,122.1c0.7,1.2,0.2,2.7-1,3.4C527.4,1511.5,527,1511.6,526.6,1511.6z",
    active2: "M751.6,1375.6c-0.9,0-1.7-0.5-2.2-1.3l-67.3-122.1c-0.7-1.2-0.2-2.7,1-3.4c1.2-0.7,2.7-0.2,3.4,1l67.3,122.1c0.7,1.2,0.2,2.7-1,3.4C752.4,1375.5,752,1375.6,751.6,1375.6z"
  }
]


export default function ourofferings({ data, componentId }) {
  const [activeTab, setActiveTab] = useState(null);
  const dataSvgOffer = slice(0, data?.offerings.length, dataSvg);
  const hsize = data?.offerings.length;
  const [view, setView] = useState(false);
  const [imageurl, setImageurl] = useState('');


  useEffect(() => {
    setActiveTab(0);
  }, []);

  const scrollEle = (element) => {
    if(isMobile) {
      //@ts-ignore
      var scrollDiv = document.getElementById('offering_desc_'+element).offsetParent.offsetTop;
      window.scrollTo({ top: scrollDiv - 50, behavior: 'smooth' });
    }
  }

  return (
    <section className={styles.ourofferings} id={componentId} >
      <div className="container">
        <h3 className="title">{data.title}</h3>
        {/* <h4 className="title">Respond, Recover and Reimagine your Intelligent Businesses with Hinduja Tech’s modern SAP Services</h4> */}
        <div className={styles.wrap}>
          <div className={`${styles.left} ${hsize > 9 ? styles.extra : ''}`}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox={hsize > 9 ? "0 0 756.2 1511.6" : "0 0 756.2 955.1"}>
              {dataSvgOffer.map(({ polygon, active1, active2 }, index) => (
                <g key={'svg' + index}>
                  {/* add class to g tag for hide hexagon className={styles.empty}  */}
                  <path className={`${styles.polygon} ${data.offerings[index]?.title ? '' : styles.empty} ${activeTab === index ? styles.active : ''}`} onClick={(e) => {
                    setActiveTab(index);
                    scrollEle(index);
                  }} key={index} d={polygon} />
                  <path className={styles.line} d={active1} />
                  <path className={styles.line} d={active2} />
                </g>
              ))}
            </svg>
            <div className={styles.titles}>
              {data.offerings?.map(({ title }) => (
                <div key={'titlt' + title} ><span dangerouslySetInnerHTML={{ __html: title }} /></div>
              ))}
            </div>
          </div>
          <div className={styles.right}>
            {data.offerings?.map(({ title, subsection_description1, subsection_description2, subsection_images }, index) => (
              <div key={'eo' + title} id={'offering_desc_'+index} className={styles.content}>
                {activeTab === index && <div className={styles.scroll}>
                  <div>
                    <h4><span dangerouslySetInnerHTML={{ __html: title }} /></h4>
                    {/* <p dangerouslySetInnerHTML={{ __html: subsection_description1 }} /> */}
                    <ReactMarkdown skipHtml={true}>{subsection_description1}</ReactMarkdown>
                    {/* <ul>
                      <li>Soft Tooling/Rapid Proto  </li>
                      <li>Vehicle Build(Batch)</li>
                      <li>Proto Evaluation</li>
                      <li>System Level & Component Level Testing</li>
                      <li>Vehicle Level Testing</li>
                      <li>Capability </li>
                    </ul> */}
                    {subsection_images?.length > 0 && <Swiper
                      navigation
                      spaceBetween={10}
                      slidesPerView={'auto'}
                    >
                      {subsection_images?.map((image, index) => (
                        <SwiperSlide key={'ssi' + index}>
                          <figure>
                            <img
                              src={image?.url}
                              onClick={() => { setImageurl(image?.url); setView(true) }}
                              alt={image?.name?.split('.')[0]}
                            />
                          </figure>
                          {/* <ul>
                            <li>Soft Tooling </li>
                            <li>Vehicle Build(Batch)</li>
                            <li>Proto Evaluation</li>
                            <li>System Level </li>
                          </ul> */}
                        </SwiperSlide>
                      ))}
                    </Swiper>}
                    <ReactMarkdown skipHtml={true}>{subsection_description2}</ReactMarkdown>
                  </div>
                </div>}
              </div>
            ))}
          </div>
        </div>

      </div>
      {view && (
        <div className={styles.lightVideo}>
          <span className="icon-close-1" onClick={() => setView(false)}></span>
          <img src={imageurl} />
        </div>
      )}
    </section>
  );
}
