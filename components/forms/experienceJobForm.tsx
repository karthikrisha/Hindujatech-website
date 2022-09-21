import React, { useRef, useState, useEffect } from "react";
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm, Controller } from 'react-hook-form';
import { forEachObjIndexed } from 'ramda';
import axios from 'axios'; 
import Link from "next/link";
import Layout from "@components/layout";
import { toastService } from '@lib/toast.service';

export default function ExperienceJobForm({ data, styles, closePopup }) {
  const recaptchaRef = useRef(null);  
  const [formSuccess, setFormSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset, control } = useForm({
    defaultValues: {
      subject: `JOB APPLICATION : ${data?.title}`,
      firstname: null,
      lastname: null,
      mobile: null,
      email: null,
      current_location: null,
      preferred_location: null,
      education: null,
      experience: null,
      skills: null,
      tools: null,
      notice_period: null,
      linkedin: null,
      hear: null,
      agree: false
    }
  });

  const triggerSubmit = async (data) => {
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
        if(key !== 'resume') {
          formData.append(key, String(field));
        }
        
        if(key === 'resume'){
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
      const response = await axios.post("/api/jobs", formValues, {headers: { "Content-type": "multipart/form-data"}});
  
      if (response.status === 201) {
        setFormSuccess(true);
        setLoading(false);
        reset();
        setFile(null);
        closePopup(false);
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
    <form className={styles.formlitebox} onSubmit={handleSubmit(triggerSubmit)}>
      <h3>Apply now</h3>
      <div className={styles.formFlex}>
        <div className={styles.inputField}>
          <label>Name</label>
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
            <span className={styles.error}>{errors.lastname?.message}</span>
          )}
        </div>
        <div className={styles.inputField}>
          <label>Mobile*</label>
          <input
            type="text"
            name="mobile"
            disabled={loading}
            maxLength={50}                            
            {...register("mobile", { required: 'This field is required'})}
          />                          
          {errors?.mobile && (
            <span className={styles.error}>{errors.mobile?.message}</span>
          )}
        </div>
        <div className={styles.inputField}>
          <label>Email Address*</label>
          <input
            type="email"
            name="email"
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
        <div className={`${styles.inputField} ${styles.selectField}`}>
          <label>Current Location*</label>
          <input
            type="text"
            name="current_location"
            disabled={loading}
            maxLength={50}
            {...register("current_location", { required: 'This field is required'})}
          />                          
          {errors?.current_location && (
            <span className={styles.error}>{errors.current_location?.message}</span>
          )}
        </div>
        <div className={`${styles.inputField} ${styles.selectField}`}>
          <label>Preferred Location*</label>
          <input
            type="text"
            name="preferred_location"
            disabled={loading}
            maxLength={50}                            
            {...register("preferred_location", { required: 'This field is required'})}
          />                          
          {errors?.preferred_location && (
            <span className={styles.error}>{errors.preferred_location?.message}</span>
          )}
        </div>
        <div className={styles.inputField}>
          <label>Education*</label>
          <select {...register('education', { required: 'This field is required'})}>
            <option value=""></option>
            <option value="Degree">Degree</option>
            <option value="B.Tech">B.Tech</option>
            <option value="M.Tech">M.Tech</option>
            <option value="MCA">MCA</option>
            <option value="MBA">MBA</option>
          </select>
          {errors?.education && (
            <span className={styles.error}>{errors.education?.message}</span>
          )}
        </div>
        <div className={styles.inputField}>
          <label>Overall Experience*</label>
          <input
            type="text"
            name="experience"
            disabled={loading}
            maxLength={50}                            
            {...register("experience", { required: 'This field is required'})}
          />
          {errors?.experience && (
            <span className={styles.error}>{errors.experience?.message}</span>
          )}
        </div>
        <div className={styles.inputField}>
          <label>Skill Sets*</label>
          <input
            type="text"
            name="skills"
            disabled={loading}
            maxLength={50}                            
            {...register("skills", { required: 'This field is required'})}
          />
          {errors?.skills && (
            <span className={styles.error}>{errors.skills?.message}</span>
          )}
        </div>
        <div className={styles.inputField}>
          <label>Software/Tools*</label>
          <input
            type="text"
            name="tools"
            disabled={loading}
            maxLength={50}                            
            {...register("tools", { required: 'This field is required'})}
          />
          {errors?.tools && (
            <span className={styles.error}>{errors.tools?.message}</span>
          )}
        </div>
        <div className={styles.inputField}>
          <label>Notice Period*</label>
          <input
            type="text"
            name="notice_period"
            disabled={loading}
            maxLength={50}                            
            {...register("notice_period", { required: 'This field is required'})}
          />
          {errors?.notice_period && (
            <span className={styles.error}>{errors.notice_period?.message}</span>
          )}
        </div>
        <div className={styles.inputField}>
          <label>LinkedIn Profile*</label>
          <input
            type="linkedin"
            name="linkedin"
            disabled={loading}
            placeholder="https:// *"
            {...register('linkedin', {
              required: 'This field is required',
              pattern: {
                value: /^http(s)?:\/\/([\w]+\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?/,
                message: 'This field is invalid'
              }
            })}
          />                        
          {errors?.linkedin && (
            <span className={styles.error}>{errors.linkedin?.message}</span>
          )}
        </div>
        <div className={styles.inputFile}>
          <div className={styles.fileSize}>
            <div>Upload Resume <span>Upto 5MB</span></div>
            {file && <div onClick={() => setFile(null)}>{file?.name} <em>Remove</em></div>}
          </div>
          <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
        </div>
      </div>
      <p>How did you hear about Hinduja Tech?</p>
      <div className={styles.checkList}>
      <label className="checkbox" tabIndex={0}><input tabIndex={0} type="checkbox" value="Linkedin" {...register("hear", {})}/><i className="icon-polygon"></i> LinkedIn</label>
      <label className="checkbox"tabIndex={0}><input tabIndex={0} type="checkbox" value="Facebook" {...register("hear", {})}/><i className="icon-polygon"></i> Facebook</label>
      <label className="checkbox"tabIndex={0}><input tabIndex={0} type="checkbox" value="Twitter" {...register("hear", {})}/><i className="icon-polygon"></i> Twitter</label>
      <label className="checkbox"tabIndex={0}><input tabIndex={0} type="checkbox" value="Naukri" {...register("hear", {})}/><i className="icon-polygon"></i> Naukri</label>
      <label className="checkbox"tabIndex={0}><input tabIndex={0} type="checkbox" value="Others" {...register("hear", {})}/><i className="icon-polygon"></i> Others</label>
      </div>
      <label className="checkbox" tabIndex={0} ><input tabIndex={0} type="radio" {...register("agree", { required: 'This field is required'})}/><i className="icon-polygon"></i> I agree to share my data, submitted via the form. I understand the data
        will be utilized by Hinduja Tech in accordance to its Privacy Policy</label>
        {errors?.agree && (
          <span className={styles.error}>{errors.agree?.message}</span>
        )}
      <div className={styles.action}>
        <button className="btn" disabled={loading}>Send</button>
      </div>
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_TOKEN}
      />
    </form>          
    );
}
