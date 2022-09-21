import React, { useRef, useState, useEffect } from "react";
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm, Controller } from 'react-hook-form';
import { forEachObjIndexed } from 'ramda';
import axios from 'axios';
import Link from "next/link";
import styles from "./style.module.scss";
import Layout from "@components/layout";
import { toastService } from '@lib/toast.service';
import FresherJobForm from "@components/forms/fresherJobForm";
import { useRouter } from 'next/router'

export default function Contactform({ data, pageData, countries, ...props }) {
  const recaptchaRef = useRef(null);
  const [formSuccess, setFormSuccess] = useState(null);
  const [formTab1, setFormtab1] = useState(true);
  const [formTab2, setFormtab2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const router = useRouter()

  const { register, handleSubmit, setValue, formState: { errors }, reset, control } = useForm({
    defaultValues: {
      subject: 'REQUEST FOR SOLUTIONS',
      firstname: null,
      lastname: null,
      email: null,
      company: null,
      comment: null,
      country: null,
      relationship: null,
      alerts: false
    }
  });  
  
  useEffect(() => {      
    const getCountryValue = () => {
      const country = localStorage.getItem('country');
      let value = null;
      if(country && countries?.length > 0) {
        let current_country = countries?.filter(c => c?.country_code?.toLowerCase() === country?.toLowerCase());
        if(current_country) {
          value = current_country[0]?.country_name;
        }
      }
      return value;    
    }
    setValue("country", getCountryValue());
  }, [countries]);

  const triggerSubmit = async (data) => {
    setFormSuccess(null);
    const token = await recaptchaRef.current.executeAsync();
    if (token) {
      setLoading(true);
      let formValues = {
        ...data,
        'g-recaptcha-response': token,
        url: window.location.href
      };

      _sendMail(formValues)
    } else {
      setLoading(false);
      setFormSuccess(false);
    }
  };

  const _sendMail = async (formValues) => {
    try {
      const response = await axios.post("/api/contactus", formValues);

      if (response.status === 201) {
        setFormSuccess(true);
        setLoading(false);
        reset();
        setFile(null);
        // toastService.success('Thanks for submitting the form');
        router.push("/thank-you-contact-us")
      } else {
        setLoading(false);
        setFormSuccess(false);
      }
    } catch (error) {
      setLoading(false);
      setFormSuccess(false);
      toastService.error(error.message || 'Something went wrong');
    }
    recaptchaRef.current.reset();
  }

  useEffect(() => {
  }, []);

  return (
    <>
      <section className={styles.contact}>
        <div className="container">
          <div className={styles.formWrap}>
            <h1 className="title">{pageData?.title || 'Contact us'} </h1>
            <p>{pageData?.excerpt || 'We’re ready to lead you into the future of mobility industry'}</p>
            <div className={styles.contactTab}>
              <div className={`${styles.tabs} ${formTab2 == true ? styles.pos2 : ''}`}>
                <span onClick={() => { setFormtab1(true), setFormtab2(false) }} className={formTab1 == true ? styles.active : ''}>Request For Solutions</span>
                <span onClick={() => { setFormtab1(false), setFormtab2(true) }} className={formTab2 == true ? styles.active : ''}>Career Related Queries</span>
              </div>
              <div className={styles.tabContents}>
                {formTab1 && <div className={`${styles.content}`}>
                  <form key="cus1" onSubmit={handleSubmit(triggerSubmit)}>
                    <div className={styles.formFlex}>
                      <div className={styles.inputField}>
                        <label>First name*</label>
                        <input
                          type="text"
                          name="firstname"
                          disabled={loading}
                          maxLength={50}
                          {...register("firstname", {
                            required: 'This field is required', maxLength: 50,
                            pattern: {
                              value: /^[a-zA-Z ]+$/,
                              message: 'Only alphabets are allowed'
                            }
                          })}
                        />
                        {errors?.firstname && (
                          <span className={styles.error}>{errors.firstname?.message}</span>
                        )}
                      </div>
                      <div className={styles.inputField}>
                        <label>Last Name</label>
                        <input
                          type="text"
                          name="lastname"
                          disabled={loading}
                          maxLength={50}
                          {...register("lastname", {
                            pattern: {
                              value: /^[a-zA-Z ]+$/,
                              message: 'Only alphabets are allowed'
                            }
                          })}
                        />
                        {errors?.lastname && (
                          <span className={styles.error}>{errors.lastname.message}</span>
                        )}
                      </div>
                      <div className={styles.inputField}>
                        <label>Email Address*</label>
                        <input
                          type="email"
                          name="email"
                          disabled={loading}
                          placeholder="Email *"
                          {...register('email', {
                            required: 'This field is required',
                            pattern: {
                              value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: 'This field is invalid'
                            }
                          })}
                        />
                        {errors.email && (
                          <span className={styles.error}>{errors.email.message}</span>
                        )}
                      </div>
                      <div className={styles.inputField}>
                        <label>Company*</label>
                        <input
                          type="text"
                          name="company"
                          disabled={loading}
                          maxLength={50}
                          {...register("company", {
                            required: 'This field is required', maxLength: 50
                          })}
                        />
                        {errors.company && (
                          <span className={styles.error}>{errors.company?.message}</span>
                        )}
                      </div>
                      <div className={`${styles.inputField} ${styles.selectField}`}>
                        <label>Country*</label>
                        <select name="country" {...register("country", {
                          required: 'This field is required'
                        })} disabled={loading}>
                          <option value=""></option>
                          {countries?.map(c => <option key={'cl' + c.id} value={c.country_name}>{c.country_name}</option>)}
                        </select>
                        {errors?.country && (
                          <span className={styles.error}>{errors?.country?.message}</span>
                        )}
                      </div>
                      <div className={`${styles.inputField} ${styles.selectField}`}>
                        <label>Relationship with Hinduja Tech*</label>
                        <select {...register("relationship", {
                          required: 'This field is required'
                        })} disabled={loading}>
                          <option value=""></option>
                          <option value="Potential Customer">Potential Customer</option>
                          <option value="Customer">Customer</option>
                          <option value="Partner">Partner</option>
                          <option value="Media Related">Media Related</option>
                          <option value="Job Seeker">Job Seeker</option>
                          <option value="Others">Others</option>
                          {/* <option value="General Enquiry">General Enquiry</option>
                            <option value="Full Product Development">Full Product Development</option>
                            <option value="Embedded Systems">Embedded Systems</option>
                            <option value="Body in White &amp; Closure">Body in White &amp; Closure</option>
                            <option value="Interior Exterior Trims">Interior Exterior Trims</option>
                            <option value="Virtual Validation">Virtual Validation</option>
                            <option value="HVAC / Cooling System">HVAC / Cooling System</option>
                            <option value="Costing &amp; Sourcing">Costing &amp; Sourcing</option>
                            <option value="SAP S4 HANA Implementation">SAP S4 HANA Implementation</option>
                            <option value="SAP Managed &amp; Support Services">SAP Managed &amp; Support Services</option>
                            <option value="SAP Business Intelligence and Analytics">SAP Business Intelligence and Analytics</option>
                            <option value="SAP Custom Development">SAP Custom Development</option>
                            <option value="Connected Fleet">Connected Fleet</option>
                            <option value="Applications Maintenance &amp; Support">Applications Maintenance &amp; Support</option>
                            <option value="Testing and Automation Services">Testing and Automation Services</option>
                            <option value="RelAI Warranty Solution">RelAI Warranty Solution</option>
                            <option value="RelAI Fleet Solution">RelAI Fleet Solution</option>
                            <option value="VA/VE Idea Management Solution">VA/VE Idea Management Solution</option> */}
                        </select>
                        {errors?.relationship && (
                          <span className={styles.error}>{errors.relationship?.message}</span>
                        )}
                      </div>
                    </div>
                    <div className={styles.inputField}>
                      <label>Enquiry/Comments</label>
                      <textarea {...register('comment')}></textarea>
                    </div>
                    <label className="checkbox" tabIndex={0}><input type="checkbox" {...register('alerts')} tabIndex={0} /><i className="icon-polygon"></i> I would like to receive alerts and updates from Hinduja Tech</label>
                    <div className={styles.action}>
                      <button className="btn" disabled={loading}>Submit</button>
                      {loading && <div className="loading"></div>}
                    </div>
                  </form>
                </div>
                }
                {formTab2 && <div className={`${styles.content}`}>
                  <FresherJobForm data={data} styles={styles} />
                  {/* <form key="cus2" onSubmit={handleSubmit2(triggerSubmit2)}>
                    <div className={styles.formFlex}>
                      <div className={styles.inputField}>
                          <label>First name*</label>
                          <input
                            type="text"
                            name="firstname"
                            disabled={loading}
                            maxLength={50}
                            {...register2("firstname", {
                              required: 'This field is required', maxLength: 50,
                              pattern: {
                                value: /^[a-zA-Z ]+$/,
                                message: 'Only alphabets are allowed'
                              }
                            })}
                          />
                          {errors2?.firstname && (
                            <span className={styles.error}>{errors2.firstname?.message}</span>
                          )}
                      </div>
                      <div className={styles.inputField}>
                          <label>Last Name</label>
                          <input
                            type="text"
                            name="lastname"
                            disabled={loading}
                            maxLength={50}                            
                            {...register2("lastname", {
                              pattern: {
                                value: /^[a-zA-Z ]+$/,
                                message: 'Only alphabets are allowed'
                              }
                            })}
                          />                          
                          {errors2?.lastname && (
                            <span className={styles.error}>{errors2.lastname?.message}</span>
                          )}
                      </div>
                      <div className={styles.inputField}>
                          <label>Mobile*</label>
                          <input
                            type="text"
                            name="mobile"
                            disabled={loading}
                            maxLength={50}                            
                            {...register2("mobile", { required: 'This field is required'})}
                          />                          
                          {errors2?.mobile && (
                            <span className={styles.error}>{errors2.mobile?.message}</span>
                          )}
                      </div>
                      <div className={styles.inputField}>
                          <label>Email Address*</label>
                          <input
                            type="email"
                            name="email"
                            disabled={loading}
                            //placeholder="Email *"
                            {...register2('email', {
                              required: 'This field is required',
                              pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'This field is invalid'
                              }
                            })}
                          />
                          {errors2.email && (
                            <span className={styles.error}>{errors2.email?.message}</span>
                          )}
                      </div> 
                      <div className={`${styles.inputField}`}>
                          <label>City</label>
                          <input
                            type="city"
                            name="city"
                            disabled={loading}
                            //placeholder="City"
                            {...register2('city')}
                          />
                      </div>
                      <div className={`${styles.inputField} ${styles.selectField}`}>
                          <label>Education</label>
                          <select {...register2('education')}>
                            <option value=""></option>
                            <option value="Degree">Degree</option>
                            <option value="B.Tech">B.Tech</option>
                            <option value="M.Tech">M.Tech</option>
                            <option value="MCA">MCA</option>
                            <option value="MBA">MBA</option>
                          </select>
                      </div>
                      <div className={styles.inputField}>
                          <label>LinkedIn Profile*</label>
                          <input
                            type="linkedin"
                            name="linkedin"
                            disabled={loading}
                            placeholder="https:// *"
                            {...register2('linkedin', {
                              required: 'This field is required',
                              pattern: {
                                value: /^http(s)?:\/\/([\w]+\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?/,
                                message: 'This field is invalid'
                              }
                            })}
                          />                        
                          {errors2?.linkedin && (
                            <span className={styles.error}>{errors2.linkedin?.message}</span>
                          )}
                      </div>
                      <div className={styles.inputFile}>
                          <div className={styles.fileSize}>
                              <div>Upload Resume <span>Upto 5MB</span></div>
                              <div>filename.pdf <em>Remove</em></div>
                          </div>
                          <input type="file" name="resume" onChange={(e) => setFile(e.target.files[0])} />
                      </div>
                    </div>
                    <p>How did you hear about Hinduja Tech?</p>
                    <div className={styles.checkList}>
                    <label className="checkbox"><input type="checkbox" value="Linkedin" {...register2("hear", {})}/><i className="icon-polygon"></i> LinkedIn</label>
                    <label className="checkbox"><input type="checkbox" value="Facebook" {...register2("hear", {})}/><i className="icon-polygon"></i> Facebook</label>
                    <label className="checkbox"><input type="checkbox" value="Twitter" {...register2("hear", {})}/><i className="icon-polygon"></i> Twitter</label>
                    <label className="checkbox"><input type="checkbox" value="Naukri" {...register2("hear", {})}/><i className="icon-polygon"></i> Naukri</label>
                    <label className="checkbox"><input type="checkbox" value="Others" {...register2("hear", {})}/><i className="icon-polygon"></i> Others</label>
                    </div>
                    <label className="checkbox"><input type="radio" {...register2("agree", { required: 'This field is required'})}/><i className="icon-polygon"></i> I agree to share my data, submitted via the form. I understand the data
will be utilized in accordance to its Privacy Policy</label>                       
                    {errors2?.agree && (
                      <span className={styles.error}>{errors2.agree?.message}</span>
                    )}
                    <div className={styles.action}>
                      <button className="btn">Send</button>
                    </div>
                  </form> */}
                </div>
                }
              </div>

            </div>
          </div>
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_TOKEN}
          />
        </div>
      </section>
    </>
  );
}
