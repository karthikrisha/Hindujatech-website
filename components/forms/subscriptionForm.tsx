import React, { useRef, useState, useEffect } from "react";
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm, Controller } from 'react-hook-form';
import { forEachObjIndexed } from 'ramda';
import axios from 'axios';
import Link from "next/link";
import Layout from "@components/layout";
import { toastService } from '@lib/toast.service';

export default function SubscriptionForm({ styles }) {
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
      subject: 'SUBSCRIPTION',
      email: null
    }
  });

  const triggerSubmit2 = async (data) => {
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

      forEachObjIndexed((field, key) => {
        formData.append(key, String(field));
      }, formValues)

      _sendMail(formValues)
    } else {
      setLoading(false);
      setFormSuccess(false);
    }
  };

  const _sendMail = async (formValues) => {
    try {
      const response = await axios.post("/api/subscription", formValues);

      if (response.status === 201) {
        setFormSuccess(true);
        setLoading(false);
        reset2();
        setFile(null);
        toastService.success('You have been successfully subscribed');
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
    <form key="sub1" onSubmit={handleSubmit2(triggerSubmit2)}>
      <div className={styles.inputField}>
        <label>Business Email*</label>
        <input
          type="email"
          name="email"
          disabled={loading}
          {...register2('email', {
            required: 'This field is required',
            pattern: {
              value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'This field is invalid'
            }
          })}
        />
        {errors2.email && (
          <span className={styles.error}>{errors2.email.message}</span>
        )}
      </div>
      <div className={styles.action}>
        <button className="btn" disabled={loading}>Subscribe</button>
      </div>
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_TOKEN}
      />
    </form>
  );
}
