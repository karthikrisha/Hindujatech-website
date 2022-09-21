import Link from 'next/link'
import useInView from 'react-cool-inview';
import styles from "./style.module.scss";

export default function Homecontact(props) {
  const { observe, inView } = useInView({
    threshold: 0.4, // Default is 0
    onChange: ({ observe, unobserve }) => {
      // Triggered whenever the target meets a threshold, e.g. [0.25, 0.5, ...]
      unobserve(); // To stop observing the current target element
      observe(); // To re-start observing the current target element
    },
    onEnter: ({ observe }) => {
      observe();
    },
    onLeave: ({ unobserve }) => {
      // Triggered when the target leaves the viewport
      unobserve();
    },
  });
  return (
    <section ref={observe} className={styles.homeContact}>
      <div className="container">
        <h3 className="title">{props?.data?.title || 'Contact us today'}</h3>
        <p dangerouslySetInnerHTML={{ __html: props?.data?.subtitle }} />
        <Link href={props?.data?.link}>
          <a className="btn greendark fill">{props?.data?.cta || 'Contact Us'}</a>
        </Link>
      </div>
    </section>
  );
}
