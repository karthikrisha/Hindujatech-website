import React, { useRef, useState, useEffect } from "react";
import ReCAPTCHA from 'react-google-recaptcha';
import Link from 'next/link';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import styles from "./style.module.scss";
import { toastService } from '@lib/toast.service';
import { useRouter } from 'next/router'

export default function queriesform({data, countries, componentId}) {
  const recaptchaRef = useRef(null);
  const router = useRouter()
  const [formSuccess, setFormSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors }, reset, control } = useForm({
    defaultValues: {
      subject: 'QUERIES',
      firstname: null,
      lastname: null,
      email: null,
      company: null,
      country: null,
      comment: null
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
      setLoading(true);
      await axios.post("/api/contactus", formValues)
      .then( response => {
        setFormSuccess(true);
        reset();
        // toastService.success('Thanks for submitting the form');
        router.push("/thankyou")

      })
      .catch(error => {
        setFormSuccess(false);
        toastService.error(error.message || 'Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      })
  
      // if (response.status === 201) {
      //   setFormSuccess(true);
      //   setLoading(false);
      //   reset();
      //   toastService.success('Thanks for submitting the form');
      // } else {
      //   setLoading(false);
      //   setFormSuccess(false);
      // }
    } catch (error) {
      setLoading(false);
      setFormSuccess(false);
      toastService.error(error.message || 'Something went wrong');
    }
    recaptchaRef.current.reset();
  }
  
  return (
    <section className={styles.queriesform} id={componentId} >
      <div className="container">
        <h3 className="title" dangerouslySetInnerHTML={{ __html: data?.title ? `${data?.title}<span>!</span>` : 'Got Queries For Us'}} />
         <div className={styles.qForm}>
          <form onSubmit={handleSubmit(triggerSubmit)}>
            <div className={styles.formFlex}>
                <div className={styles.inputField}>
                    <label>First Name*</label>
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
                    <label>Business Email*</label>
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
                      <span className={styles.error}>{errors.company.message}</span>
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
                    {errors.country && (
                      <span className={styles.error}>{errors.country.message}</span>
                    )}
                </div>
              </div>
              <div className={styles.inputField}>
                  <label>Enquiry/Comments</label>
                  <textarea {...register('comment')} disabled={loading}></textarea>
              </div>
            <div className={styles.cd}>{data?.agree_txt} <Link href={data?.cta_link}><a target="_blank">{data?.cta}</a></Link></div>
            <div className={styles.action}>
              <button className="btn" disabled={loading}>Submit</button>
                {loading && <div className="loading"></div>}
            </div>
          </form>
         </div>
      </div>
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_TOKEN}
      />
    </section>
  );
}
