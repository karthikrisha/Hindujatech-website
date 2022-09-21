import React, { useRef, useState, useEffect } from "react";
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { isEmpty } from 'ramda';
import Link from 'next/link';
import { tabData } from '@lib/constants';
import { useForm, Controller } from 'react-hook-form';
import { toastService } from '@lib/toast.service';
import styles from "./style.module.scss";
import { downloadFile } from "@lib/helpers";

export default function Resource({ data, countries, back }) {
  const recaptchaRef = useRef(null);
  const [formSuccess, setFormSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const pageInfo = tabData.filter(tab => tab.link === back)

  const { register, handleSubmit, formState: { errors }, reset, control } = useForm({
    defaultValues: {
      subject: `DOWNLOAD - ${pageInfo[0].title}`,
      firstname: null,
      lastname: null,
      email: null,
      company: null,
      country: null
    }
  });

  const triggerSubmit = async (fdata) => {
    setFormSuccess(null);
    const token = await recaptchaRef.current.executeAsync();
    if (token) {
      let formValues = {
        ...fdata,
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
      await axios.post("/api/resource", formValues)
        .then(response => {
          setFormSuccess(true);
          reset();
          toastService.success('Thanks for submitting the form');
          if (data?.download) {
            downloadFile(data?.download?.url, data?.download?.name);
          }
        })
        .catch(error => {
          setFormSuccess(false);
          toastService.error(error.message || 'Something went wrong');
        })
        .finally(() => {
          setLoading(false);
        })

    } catch (error) {
      setLoading(false);
      setFormSuccess(false);
      toastService.error(error.message || 'Something went wrong');
    }
    recaptchaRef.current.reset();
  }

  return (
    <section className={styles.brochuresForm}>
      <div className="container">
        <div className={styles.brochuresformWrap}>
          <div className={styles.center}>
            <h1 className="title">{data?.title} </h1>
            {!isEmpty(data?.shortdescription) && <p>{data?.shortdescription} </p>}
          </div>
          <div className={styles.lr}>
            <div className={styles.left}>
              <div dangerouslySetInnerHTML={{ __html: data?.description }} />
              {/* <h3>Business Challenges</h3>
                <p>Design of vehicle subsystem for lightweight and for safety seems to lead the designer towards unforeseen challenges. This case study analysis some possible alternative solutions for the particular case of the front bumper.</p>
                <p>The bumper is the main structural component which is expected to be sturdy enough to absorb the impact energy, in order to reduce risks caused on road. At the same time, it must possess sufficient strength and stiffness to protect the other vehicle components too. </p> */}
              <div className={styles.action}><Link href={pageInfo[0].link}><a className="btn">Back to {pageInfo[0].title}</a></Link></div>
            </div>
            <div className={styles.right}>
              <h3>Download {pageInfo[0].title}</h3>
              {/* <p className={styles.error}>Please fill the mandatory fields *</p> */}
              <form onSubmit={handleSubmit(triggerSubmit)}>
                <div className={styles.inputField}>
                  <input
                    type="text"
                    name="firstname"
                    disabled={loading}
                    placeholder="First Name*"
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
                  <label></label>
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
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
                  <input
                    type="email"
                    name="email"
                    placeholder="Business Email*"
                    disabled={loading}
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
                  <input
                    type="text"
                    name="company"
                    placeholder="Company*"
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
                  <select name="country" {...register("country", {
                    required: 'This field is required'
                  })} disabled={loading}>
                    <option value="">Country</option>
                    {countries?.map(c => <option key={'cl' + c.id} value={c.country_name}>{c.country_name}</option>)}
                  </select>
                  {errors.country && (
                    <span className={styles.error}>{errors.country.message}</span>
                  )}
                </div>
                <div className={styles.pp}>By clicking Download Now, you agree to the <Link href="/privacy-statement"><a target="_blank">Privacy Policy</a></Link></div>
                <div className={styles.action}>
                  <button className="btn" disabled={loading}>Download Now</button>
                  {loading && <div className="loading"></div>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_TOKEN}
      />
    </section>
  )
}
