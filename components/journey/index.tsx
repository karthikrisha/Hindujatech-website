import React, { useEffect, useState } from 'react';
import useInView from 'react-cool-inview';
import Link from "next/link";
import CountUp from 'react-countup';
import styles from "./style.module.scss";

export default function Journey(props) {
  const [countInit, setCountinit] = useState(false);
  // const [moverInit, setMovertinit] = useState(false);
  const { observe, inView } = useInView({
    threshold: 0.5, // Default is 0
    unobserveOnEnter: true,
    onEnter: () => {
      setTimeout(() => {
        setCountinit(true)
        // setMovertinit(true)
      }, window.innerWidth > 1199 ? 1600 : 0);
    }
  });

  return (
    <section className={`${styles.journey} ${inView ? styles.animate : ''}`} >
      <div className={styles.bg}><i></i><em></em></div>
      <div className="container">
        <h3 className="title">{props.data?.title || 'Our journey'}</h3>
        <p className="title" dangerouslySetInnerHTML={{ __html: props.data?.subtitle }} />
        <div className={`${styles.wrap} ${inView ? styles.animate : ''}`}>
          <div ref={observe} className={styles.list}>
          {props.data?.counterlist?.map((e, index) => ( 
            <div className={styles.box} key={index}>
                <i><b></b></i>
                <div>
                  <h4>
                  <span>{countInit && (
                        <>
                          <CountUp
                            duration={2.5}
                            start={0}
                            end={e?.count_first}
                          />{e?.count_second && (<>-<CountUp
                          duration={2.5}
                          start={0}
                          end={e?.count_second}
                          />
                          </>)}
                        </>
                      )}</span>{e?.symbol && <>{e?.symbol==='plus' ? '+' : '%'}</>} </h4>
                  <p>{e?.description} </p>
                </div>
              </div>    
          ))}
          </div>
        </div>
        <div className={styles.action}>
          <Link href={props?.data?.link}>
            <a className="btn blue">{props?.data?.cta || 'Ask us how'}</a>
          </Link>
        </div>
      </div>
    </section>
  );
}
