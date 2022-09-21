import React, { useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./style.module.scss";

export default function Contactaddress(props) {
  const [activeTab, setActiveTab] = useState(1);

  return (
      <section className={styles.addressList}>
        <div className="container">
          <div className={styles.col}>
            {props?.data?.contact_office?.map( (co, index) => <React.Fragment key={'cadrs'+index}>
              <h3>{co?.office_title}</h3>
              {/* <ReactMarkdown skipHtml={false}>{co?.office_address}</ReactMarkdown> */}
              <span dangerouslySetInnerHTML={{ __html: co?.office_address }} />
              {co?.map_link && <a href={co?.map_link} target="_blank" className="btn">View on Map</a>}
              {index === 0 && <><br/><br/><br/></>}
            </React.Fragment>)}
            {/* <h3>Corporate Office</h3>
            <p>
              <strong>Hinduja Tech Limited</strong><br/>
              Gateway Office Parks,<br/>
              A6 Tower – 8th floor<br/>
              No. 16, Grand Southern Trunk Road,<br/>
              Chennai-600063
            </p>
            <br/>
            <p>CIN: U72400TN2009PLC072067</p>
            <p>email: info@hindujatech.com</p>
            <p>Phone: +91 44-6669 1000</p>
            <p>Fax: +91 44 6669 1143</p>
            <a href="#" className="btn">View on Map</a>
            <br/>
            <br/>
            <br/>
            <h3>Registered Office</h3>
            <p><strong>Hinduja Tech Limited</strong><br/>
              1, Sardar Patel Rd<br/>
              Guindy, Chennai<br/>
              Tamil Nadu – 600032</p>
              <a href="#" className="btn">View on Map</a> */}
          </div>
          <div className={styles.col}>
            <h3>{props?.data?.office_locations_title}</h3>
            {props?.data?.contact_office_countries?.map((country) => (
              <div className={styles.location} key={country.id}>
                <h5>{country?.country}</h5>
                {country?.contact_office_cities?.map((addr) => (
                  <div key={addr.id}>
                    <div className={`${styles.place} ${activeTab === addr.id ? styles.active : ''}`}
                    onClick={(e) => {
                      setActiveTab(addr.id);
                    }}
                    ><span>{addr.city}</span></div>
                    <div className={styles.address}>
                      <div>
                          <p dangerouslySetInnerHTML={{ __html: addr.address }} />
                          {addr.map_link && <a href={addr.map_link} target="_blank" className="btn">View on Map</a>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}            
          </div>
        </div>
      </section>
  );
}
