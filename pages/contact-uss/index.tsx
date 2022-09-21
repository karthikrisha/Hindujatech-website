import React, { useRef, useState, useEffect } from "react";
import axios from 'axios'; 
import Link from "next/link";
import styles from "./style.module.scss";
import Layout from "@components/layout";
import { getCommonPageData } from "@lib/helpers";
 

const datas = [    
  {
      city: 'India',
      state: [
        {
          name: 'Bangalore',
          address: '<strong>Hinduja Tech Limited</strong>91 Springboard Business Hub<br/>Private Limited<br/>5th Floor, Trifecta Adatto. 21,<br/>ITPL, Main Road, Garudachar Palya<br/>Mahadevapura, Bengaluru,<br/>Karnataka – 560048'
        },
        {
          name: 'Chennai',
          address: '<strong>Hinduja Tech Limited</strong>91 Springboard Business Hub<br/>Private Limited<br/>5th Floor, Trifecta Adatto. 21,<br/>ITPL, Main Road, Garudachar Palya<br/>Mahadevapura, TamilNadu,<br/>Chennai – 6000001'
        }
      ]
  },
  {
      city: 'North America',
      state: [
        {
          name: 'Canada',
          address: '<strong>Hinduja Tech Limited</strong>91 Springboard Business Hub<br/>Private Limited<br/>5th Floor, Trifecta Adatto. 21,<br/>ITPL, Main Road, Garudachar Palya<br/>Mahadevapura, Mexico,<br/>Mexico – 560048'
        },
        {
          name: 'Mexico',
          address: '<strong>Hinduja Tech Limited</strong>91 Springboard Business Hub<br/>Private Limited<br/>5th Floor, Trifecta Adatto. 21,<br/>ITPL, Main Road, Garudachar Palya<br/>Mahadevapura, Mexico,<br/>Mexico – 6000001'
        }
      ]
  },
  {
      city: 'Europe',
      state: [
        {
          name: 'France',
          address: '<strong>Hinduja Tech Limited</strong>91 Springboard Business Hub<br/>Private Limited<br/>5th Floor, Trifecta Adatto. 21,<br/>ITPL, Main Road, Garudachar Palya<br/>Mahadevapura, Mexico,<br/>Mexico – 560048'
        },
        {
          name: 'Germany',
          address: '<strong>Hinduja Tech Limited</strong>91 Springboard Business Hub<br/>Private Limited<br/>5th Floor, Trifecta Adatto. 21,<br/>ITPL, Main Road, Garudachar Palya<br/>Mahadevapura, Mexico,<br/>Mexico – 6000001'
        },
        {
          name: 'Romania',
          address: '<strong>Hinduja Tech Limited</strong>91 Springboard Business Hub<br/>Private Limited<br/>5th Floor, Trifecta Adatto. 21,<br/>ITPL, Main Road, Garudachar Palya<br/>Mahadevapura, Mexico,<br/>Mexico – 6000001'
        }
      ]
  },
  {
      city: 'Asia',
      state: [
        {
          name: 'China',
          address: '<strong>Hinduja Tech Limited</strong>91 Springboard Business Hub<br/>Private Limited<br/>5th Floor, Trifecta Adatto. 21,<br/>ITPL, Main Road, Garudachar Palya<br/>Mahadevapura, Mexico,<br/>Mexico – 560048'
        },
        {
          name: 'Japan',
          address: '<strong>Hinduja Tech Limited</strong>91 Springboard Business Hub<br/>Private Limited<br/>5th Floor, Trifecta Adatto. 21,<br/>ITPL, Main Road, Garudachar Palya<br/>Mahadevapura, Mexico,<br/>Mexico – 6000001'
        }
      ]
  },
]

function Contact(props) {
  const { data } = props;
  const [activeTab, setActiveTab] = useState(null);
  const [formTab1, setFormtab1] = useState(true);
  const [formTab2, setFormtab2] = useState(false);

  useEffect(() => {
    setActiveTab(datas[0].state[0].name);
  }, []);
  return (
    <>
    <Layout {...props}>
    <section className={styles.contact}>
      <div className="container">
        <div className={styles.formWrap}>
          <h1 className="title">Contact us </h1>
          <p>We’re ready to lead you into the future of mobility industry</p>
          <div className={styles.contactTab}>
            <div className={`${styles.tabs} ${formTab2 == true ? styles.pos2 : ''}`}>
                <span onClick={() => {setFormtab1(true), setFormtab2(false)}} className={formTab1 == true ? styles.active : ''}>Request For Solutions</span>
                <span onClick={() => {setFormtab1(false), setFormtab2(true)}} className={formTab2 == true ? styles.active : ''}>Career Related Queries</span>
            </div>
            <div className={styles.tabContents}>
                {formTab1 && <div className={`${styles.content}`}>
                  <form>
                    <div className={styles.formFlex}>
                      <div className={styles.inputField}>
                          <label>Name</label>
                          <input type="text" />
                      </div>
                      <div className={styles.inputField}>
                          <label>Last Name</label>
                          <input type="text" />
                      </div>
                      <div className={styles.inputField}>
                          <label>Email Address*</label>
                          <input type="text" />
                      </div>
                      <div className={styles.inputField}>
                          <label>Company*</label>
                          <input type="text" />
                      </div>
                      <div className={`${styles.inputField} ${styles.selectField}`}>
                          <label>Country*</label>
                          <select>
                            <option>India</option>
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                          </select>
                      </div>
                      <div className={`${styles.inputField} ${styles.selectField}`}>
                          <label>Relationship with Hinduja Tech*</label>
                          <select>
                            <option>Relationship</option>
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                          </select>
                      </div>
                    </div>
                    <div className={styles.inputField}>
                        <label>Enquiry/Comments</label>
                        <textarea></textarea>
                    </div>
                    <label className="checkbox"><input type="checkbox" /><i className="icon-polygon"></i> I would like to receive alerts and updates from Hinduja Tech</label>
                    <div className={styles.action}>
                      <button className="btn">Submit</button>
                    </div>
                  </form>
                </div>
                }
                {formTab2 && <div className={`${styles.content}`}>
                <form>
                    <div className={styles.formFlex}>
                      <div className={styles.inputField}>
                          <label>Name</label>
                          <input type="text" />
                      </div>
                      <div className={styles.inputField}>
                          <label>Last Name</label>
                          <input type="text" />
                      </div>
                      <div className={styles.inputField}>
                          <label>Mobile*</label>
                          <input type="text" />
                      </div>
                      <div className={styles.inputField}>
                          <label>Email Address*</label>
                          <input type="text" />
                      </div>
                      <div className={`${styles.inputField} ${styles.selectField}`}>
                          <label>City*</label>
                          <select>
                            <option>City</option>
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                          </select>
                      </div>
                      <div className={`${styles.inputField} ${styles.selectField}`}>
                          <label>Education*</label>
                          <select>
                            <option>Education</option>
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                          </select>
                      </div>
                      <div className={styles.inputField}>
                          <label>LinkedIn Profile*</label>
                          <input type="text" placeholder="https://" />
                      </div>
                      <div className={styles.inputFile}>
                          <div className={styles.fileSize}>
                              <div>Upload Resume <span>Upto 5MB</span></div>
                              {/* <div>filename.pdf <em>Remove</em></div> */}
                          </div>
                          <input type="file" />
                      </div>
                    </div>
                    <p>How did you hear about Hinduja Tech?</p>
                    <div className={styles.checkList}>
                    <label className="checkbox"><input type="checkbox" /><i className="icon-polygon"></i> LinkedIn</label>
                    <label className="checkbox"><input type="checkbox" /><i className="icon-polygon"></i> Facebook</label>
                    <label className="checkbox"><input type="checkbox" /><i className="icon-polygon"></i> Twitter</label>
                    <label className="checkbox"><input type="checkbox" /><i className="icon-polygon"></i> Naukri</label>
                    <label className="checkbox"><input type="checkbox" /><i className="icon-polygon"></i> Others</label>
                    </div>
                    <label className="checkbox"><input type="checkbox" /><i className="icon-polygon"></i> I agree to share my data, submitted via the form. I understand the data
will be utilized by KPIT in accordance to its Privacy Policy</label>
                    <div className={styles.action}>
                      <button className="btn">Send</button>
                    </div>
                  </form>
                </div>
                }
            </div>

          </div>
        </div>

      </div>

      <div className={styles.addressList}>
        <div className="container">
          <div className={styles.col}>
            <h3>Corporate Office</h3>
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
              <a href="#" className="btn">View on Map</a>
          </div>
          <div className={styles.col}>
            <h3>Office Locations</h3>
            {datas.map(({ city, state }) => (
              <div className={styles.location} key={city}>
                <h5>{city}</h5>
                {state.map(({ name, address }) => (
                  <div key={name}>
                    <div className={`${styles.place} ${activeTab === name ? styles.active : ''}`}
                    onClick={(e) => {
                      setActiveTab(name);
                    }}
                    ><span>{name}</span></div>
                    <div className={styles.address}>
                      <div>
                          <p dangerouslySetInnerHTML={{ __html: address }} />
          <a href="#" className="btn">View on Map</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            
          </div>
        </div>
      </div>
    </section>
    </Layout>
    </>
  );
}

export async function getStaticProps(appContext) {
  try {    
    console.error('contact us slufggggg' );
    const props = await getCommonPageData(`/pages/find/contact-us`);
    return { props, revalidate: process.env.reValidation }
  } catch (error) {
    console.error(error);
    return { props: { data: null } };
  }
}

export default Contact;
