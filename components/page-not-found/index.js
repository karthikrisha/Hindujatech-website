import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';

export default function PageNotFound() {
  return (
    <div className={styles.notFound}>
      <div className={styles.content}>
        <img src="/img/404.svg" />
        <div>
          <h2>404</h2>
          <p>The page you're looking for is not found</p>
          <Link href="/">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
