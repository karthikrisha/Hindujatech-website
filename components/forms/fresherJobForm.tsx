import React, { useRef, useState, useEffect } from "react";
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm, Controller } from 'react-hook-form';
import { forEachObjIndexed } from 'ramda';
import axios from 'axios';
import Link from "next/link";
import Layout from "@components/layout";
import { toastService } from '@lib/toast.service';

export default function FresherJobForm({ data, styles }) {
  const recaptchaRef = useRef(null);
  const [formSuccess, setFormSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
    reset: reset2,
    control: control2
  } = useForm({
    defaultValues: {
      subject: 'CAREER RELATED QUERIES',
      firstname: null,
      lastname: null,
      email: null,
      mobile: null,
      city: null,
      education: null,
      linkedin: null,
      hear: null,
      agree: false
    }
  });

  const triggerSubmit2 = async (data) => {
    let error = '';
    if (file) {
      const fileExt = file.name.split('.').pop(),
        fileSize = (file.size / 1048576).toFixed(1),
        allowedFormats = ['.doc', '.docx', '.pdf', '.ppt', '.pptx', '.xls', '.xlsx'];

      if (!allowedFormats.includes('.' + fileExt)) {
        error = `Invalid File Format! only allowed ${allowedFormats.join(',')}`;
      } else if (parseFloat(fileSize) > 5) {
        error = `File size exceeded. maximum file size is 5 mb`;
      }
    }

    if (error) {
      toastService.error(error);
      return;
    }

    setFormSuccess(null);
    const token = await recaptchaRef.current.executeAsync();
    if (token) {
      setLoading(true);
      let formValues = {
        ...data,
        'g-recaptcha-response': token,
        url: window.location.href
      };

      const formData = new FormData();
      formData.append('resume', file);

      forEachObjIndexed((field, key) => {
        if (key !== 'resume') {
          formData.append(key, String(field));
        }

        if (key === 'resume') {
          formData.append('resume', field[0]);
        }
      }, formValues)

      _sendMail(formData)
    } else {
      setLoading(false);
      setFormSuccess(false);
    }
  };

  const _sendMail = async (formValues) => {
    try {
      const response = await axios.post("/api/contactus", formValues, { headers: { "Content-type": "multipart/form-data" } });

      if (response.status === 201) {
        setFormSuccess(true);
        setLoading(false);
        reset2();
        setFile(null);
        //@ts-ignore
        document.getElementById('resumeUplaodContact').value = '';
        toastService.success('Thanks for submitting the form');
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
    <form key="cus2" onSubmit={handleSubmit2(triggerSubmit2)} className={styles.style1}>
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
            placeholder="Enter without country code"
            disabled={loading}
            maxLength={10}
            {...register2("mobile", {
              required: 'This field is required',
              pattern: {
                value: /^[+-]?\d*(?:[.,]\d*)?$/,
                message: 'Only numbers are allowed'
              }
            })}
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
          <select {...register2('education')} disabled={loading}>
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
            {file && <div onClick={() => {
              setFile(null);
              //@ts-ignore
              document.getElementById('resumeUplaodContact').value = '';
            }}>{file?.name} <em>Remove</em></div>}
          </div>
          <input type="file" tabIndex={0} disabled={loading} name="resume" id="resumeUplaodContact" onChange={(e) => setFile(e.target.files[0])} />
        </div>
      </div>
      <p>How did you hear about Hinduja Tech?</p>
      <div className={styles.checkList}>
        <label className="checkbox" tabIndex={0}><input tabIndex={0} disabled={loading} type="checkbox" value="Linkedin" {...register2("hear", {})} /><i className="icon-polygon"></i> LinkedIn</label>
        <label className="checkbox" tabIndex={0}><input tabIndex={0} disabled={loading} type="checkbox" value="Facebook" {...register2("hear", {})} /><i className="icon-polygon"></i> Facebook</label>
        <label className="checkbox" tabIndex={0}><input tabIndex={0} disabled={loading} type="checkbox" value="Twitter" {...register2("hear", {})} /><i className="icon-polygon"></i> Twitter</label>
        <label className="checkbox" tabIndex={0}><input tabIndex={0} disabled={loading} type="checkbox" value="Naukri" {...register2("hear", {})} /><i className="icon-polygon"></i> Naukri</label>
        <label className="checkbox" tabIndex={0}><input tabIndex={0} disabled={loading} type="checkbox" value="Others" {...register2("hear", {})} /><i className="icon-polygon"></i> Others</label>
      </div>
      <label className="checkbox" tabIndex={0}><input tabIndex={0} disabled={loading} type="radio" {...register2("agree", { required: 'This field is required' })} /><i className="icon-polygon"></i> I agree to share my data, submitted via the form. I understand the data
        will be utilized in accordance to its <Link href="/privacy-statement"><a target="_blank">Privacy Policy</a></Link></label>
      {errors2?.agree && (
        <span className={styles.error}>{errors2.agree?.message}</span>
      )}
      <div className={styles.action}>
        <button className="btn" disabled={loading} >Send</button>
        {loading && <div className="loading"></div>}
      </div>
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_TOKEN}
      />
    </form>
  );
}
