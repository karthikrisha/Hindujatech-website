import React, { useRef, useState, useEffect } from "react";
import { isEmpty } from 'ramda';
import Link from 'next/link';
import Image from 'next/image';
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";

export default function ResourceList({ list, sectionLink }) {
  const allListArr = [...list];
  const [allList, setAllList] = useState(allListArr);
  const [filter, setFilter] = useState(null);
  const [filterKeyword, setFilterKeyword] = useState('');

  useEffect(() => {
    const lowercasedFilter = filterKeyword?.toLowerCase();

    if(!isEmpty(lowercasedFilter) && filter !== null) {
      const filteredData = allListArr.filter(item => {
        return item.title?.toLowerCase().includes(lowercasedFilter) && item.category?.id === filter
      });
      setAllList(filteredData)
    } else if(!isEmpty(lowercasedFilter)) {
      const filteredData = allListArr.filter(item => {
        return item.title?.toLowerCase().includes(lowercasedFilter)
      });
      setAllList(filteredData)
    } else if(filter !== null) {
      const filteredData = allListArr.filter(item => {
        return item.category?.id === filter
      });
      setAllList(filteredData)
    } else {
      setAllList(allListArr)
    }
  }, [filter, filterKeyword])

  return (
    <>
      <div className={styles.tabContents}>
        <div className={styles.filter}>
          <div className={styles.filtercheck}>
            <label className="checkbox"><input name="brochures" type="radio" onChange={() => setFilter(null)} checked={filter === null}/><i className="icon-polygon"></i> All Brochures</label>
            <label className="checkbox"><input name="brochures" type="radio" onChange={() => setFilter(2)} checked={filter === 2}/><i className="icon-polygon"></i> Product Engineering Services</label>
            <label className="checkbox"><input name="brochures" type="radio" onChange={() => setFilter(3)} checked={filter === 3}/><i className="icon-polygon"></i> Digital Technology & Solutions</label>
          </div>
          <div className={styles.filterSearch}>
            <input type="text" placeholder="Search" value={filterKeyword} onChange={e => setFilterKeyword(e.target.value)}/>
            <button className="icon-search"></button>
          </div>
        </div>
          <div className={styles.content}>
            {<div className={styles.listGrid}>
              {allList?.map((list) => (
                <div className={styles.grid} key={list?.title}>
                  <i></i>
                  <div>
                    <figure>
                      <Imagecomponent image={list?.image} layout="fill"/>
                      {/* <Image src={list?.url} alt={list?.title} layout="fill"/> */}
                    </figure><em></em>
                    <div className={styles.cnt}>
                      <h3>{list?.title}</h3>
                      <Link href={`${sectionLink}/${list?.slug}`} key={list?.title}>
                        <a className="btn white">Know more</a>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              {allList.length === 0 && <div className="title">No results found</div>}
            </div>}
          </div>
      </div>
    </>
  )
}