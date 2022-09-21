import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { pluck, clone, trim } from 'ramda';
import styles from "./style.module.scss";
import Banner from "@components/pagebanner"
import { getCommonPageData } from "@lib/helpers";
import axios from "axios";
import Layout from "@components/layout";
import FresherJobForm from "@components/forms/fresherJobForm";

const testData = {
  class: 'centermiddle',
  fade: true,
  banner_image: { url: '/static/Careers.jpg' },
  title: 'Current Openings'
}

function CurrentJobOpenings(props) {
  const [formTab1, setFormtab1] = useState(true);
  const [formTab2, setFormtab2] = useState(false);
  const [careersList, setCareersList] = useState([]);
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    let list = clone(props?.data);

    if(category) {
      list = list.filter( l => {
        return l?.job_category?.id == parseInt(category)
      })
    }

    if(location) {
      list = list.filter( l => {
        const locations = pluck('id', l?.job_locations);
        return locations.includes(parseInt(location))
      })
    }

    if(trim(search).toLowerCase().length > 0) {
      list = list.filter(l => {
        return l.title?.toLowerCase()?.indexOf(search) !== -1      
      })
    }

    list = list.map(list => {
      list.category = list?.job_category?.category;
      list.location = pluck('location', list?.job_locations)?.join(', ');
      list.type = pluck('type', list?.job_types)?.join(', ');
      return list;
    })

    setCareersList(list)
  }, [category, location, type, search]);
  
  return (
    <Layout {...props}>
      <Banner data={testData} />
      <section className={styles.currentopenings}>
        <div className="container">
          <div className={styles.formWrap}>
            <div className={styles.contactTab}>
              <div className={`${styles.tabs}`}>
                <span onClick={() => { setFormtab1(true), setFormtab2(false) }} className={formTab1 == true ? styles.active : ''}>Experienced</span>
                <span onClick={() => { setFormtab1(false), setFormtab2(true) }} className={formTab2 == true ? styles.active : ''}>Freshers</span>
              </div>
              <div className={styles.tabContents}>
                {formTab1 && <div className={`${styles.content}`}>

                  <div className={styles.filter}>
                    <form className={styles.inputs}>
                      <div className={`${styles.inputField} ${styles.selectField}`}>
                        <label>Job Function</label>
                        <select defaultValue={category} onChange={e => setCategory(e.target.value)}>
                          <option value=''>Job Function</option>
                          {props?.categories?.map(
                            cat => <option value={cat?.id} key ={cat?.id}>{cat?.category}</option>
                          )}
                        </select>
                      </div>
                      <div className={`${styles.inputField} ${styles.selectField}`}>
                        <label>Job Location</label>
                        <select defaultValue={location} onChange={e => setLocation(e.target.value)}>
                          <option value=''>Job Location</option>
                          {props?.locations?.map(
                            loc => <option value={loc?.id} key ={loc?.id}>{loc?.location}</option>
                          )}
                        </select>
                      </div>
                    </form>
                    <div className={styles.filterSearch}>
                      <input type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)}/>
                      <button className="icon-search"></button>
                    </div>
                  </div>
                  <div className={styles.list}>
                    {careersList?.map((career) => (
                      <div key={career?.id} className={styles.box}>
                        <div>
                          <h5>{career?.title}</h5>
                          <p>
                            {career?.category}<br/>
                            {career?.type}<br/>
                            {career?.location}
                          </p>
                          <Link href={`/jobs/${career?.slug}`}><a className="btn">More Details</a></Link>
                        </div>
                      </div>
                    ))}
                    {careersList?.length === 0 && <div> No Jobs Found</div>}
                  </div>
                  {/* <div className={styles.loadMore}>
                    <a className="btn orange">Load more</a>
                  </div> */}
                </div>
                }
                {formTab2 && <div className={`${styles.content}`}>
                  <h3>Apply Here For Fresher Openings</h3>
                  <FresherJobForm data={props.data} styles={styles}/>
                  {/* <form className={styles.style1}>
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
                          <div>filename.pdf <em>Remove</em></div>
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
                      will be utilized by Hinduja Tech in accordance to its <a>Privacy Policy</a></label>
                    <div className={styles.action}>
                      <button className="btn">Send</button>
                    </div>
                  </form> */}
                </div>
                }
              </div>

            </div>
          </div>

        </div>

      </section>
    </Layout>
  );
}

export async function getStaticProps(appContext) {
  try {
    let props = await getCommonPageData(`/careers?_limit=-1`);
    const {data: categories} = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/job-categories?_limit=-1`
    );    
    const {data: locations} = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/job-locations?_limit=-1`
    );        
    const {data: types} = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/job-types?_limit=-1`
    );
    //@ts-ignore
    props = {...props, categories, locations, types};

    return { props, revalidate: process.env.reValidation }
  } catch (error) {
    console.error(error);
    return { props: { data: null }, revalidate: process.env.reValidation };
  }
}

export default CurrentJobOpenings;
