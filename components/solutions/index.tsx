import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import Link from "next/link";
// import Particles from "react-particles-js";
import useInView from "react-cool-inview";
import styles from "./style.module.scss";
import { Imagecomponent } from "@components/common/image";

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

// const setting: any = {
//   particles: {
//     color: "#074DD9",
//     number: {
//       value: 120,
//     },
//     shape: {
//       polygon: {
//         nb_sides: "10",
//       },
//     },
//     move: {
//       speed: 1.5,
//     },
//     size: {
//       value: 7,
//       random: true,
//     },
//     opacity: {
//       value: 1,
//     },
//     line_linked: {
//       color: "#074DD9",
//       opacity: 1,
//     },
//   },
// };
// const setting2: any = {
//   particles: {
//     color: "#074DD9",
//     number: {
//       value: 30,
//     },
//     shape: {
//       polygon: {
//         nb_sides: "10",
//       },
//     },
//     move: {
//       speed: 1.5,
//     },
//     size: {
//       value: 7,
//       random: true,
//     },
//     opacity: {
//       value: 1,
//     },
//     line_linked: {
//       color: "#074DD9",
//       opacity: 1,
//     },
//   },
// };
export default function Solutions(props) {
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
    <section ref={observe} className={styles.solutions}>
      <div className={styles.bg}>
        {inView && (
          // <Particles
          //   params={window.innerWidth > 1200 ? { ...setting } : { ...setting2 }}
          // />
          <video
            src="/video/videoplayback-2.mp4"
            muted
            autoPlay
            loop
          />
        )}
        <em></em>
      </div>
      <div className="container">
        <Swiper
          navigation
        // onSlideChange={(e) => console.log(e)}
        // onSwiper={(swiper) => console.log(swiper)}
        >
          {props.data?.solutions?.map(solution => <SwiperSlide key={solution.id}>
            <div className={styles.box}>
              <div className={styles.content}>
                <h3 className="title">{props.data?.title || 'Our Solutions'}</h3>
                <p>{solution?.description}</p>
                <div className={styles.action}>
                  <Link href={solution?.link}><a className="btn blue">Read more</a></Link>
                  {/* <a className="btn">View all</a> */}
                </div>
              </div>
              <div className={styles.image}>
                <figure>
                  <Imagecomponent image={solution?.image} />
                </figure>
                <h4>
                  <span>{solution?.imageTitle}</span>
                </h4>
              </div>
            </div>
          </SwiperSlide>)}
        </Swiper>
      </div>
    </section>
  );
}
