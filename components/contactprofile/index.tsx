import { Imagecomponent } from "@components/common/image";
import React, { useRef, useState, useEffect } from "react";
import styles from "./style.module.scss";

export default function Contactpracticeheadprofile({ data, componentId }) {
  return (
    <section className={styles.contactProfile} id={componentId}>
      <div className="container">
        <div className={styles.profileList}>

          {data?.cph?.map(profile => (
            <div className={styles.single}>
              <div className={styles.sw}>
                <div className={styles.profile}>
                  <figure>
                    <Imagecomponent image={profile?.image} alt={profile?.name} />
                  </figure>
                </div>
                <div className={styles.cnt}>
                  <div className={styles.cntWrap}>
                    <h2>{profile?.name}</h2>
                    <h3>{profile?.designation}</h3>
                  </div>
                  <p dangerouslySetInnerHTML={{ __html: profile?.about }} />
                </div>
              </div>
              <div className={styles.contact}>
                {profile?.phone && <a className={styles.tell} href={`tel:${profile?.phone}`}>{profile?.phone}</a>}
                <em></em>
                {profile?.linkedin && <a className={styles.media} href={profile?.linkedin} target="_blank"><i className="icon-linkedin"></i></a>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
