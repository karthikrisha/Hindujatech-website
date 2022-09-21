import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { slice } from 'ramda';
import styles from "./style.module.scss";


export default function contentbanner() {
  return (
    <section className={`${styles.contentBanner}`}>
      <div className={styles.bg}>
        <picture>
          <source media="(max-width: 767px)" srcSet="https://images.unsplash.com/photo-1471174617910-3e9c04f58ff5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
          <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
        </picture>
        <em></em>
      </div>
      <div className={styles.content}>
        <h4 className="title"><a href="#">COMMERCIAL VEHICLES</a></h4>
      </div>
    </section>
  );
}
