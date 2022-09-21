import React, { useEffect, useState, useRef, RefObject  } from 'react';
import axios from 'axios';
import Script from 'next/script';
import CookieConsent from "react-cookie-consent";
import Link from 'next/link';
import styles from "./style.module.scss";
import Ecoengine from "@components/ecoengine";
import { isMobile } from "react-device-detect";

export const useScript = (
    url: string,
    ref: RefObject<HTMLDivElement>
  ) => {
    useEffect(() => {
      const script = document.createElement("script");
  
      script.src = url;
      script.async = true;
  
      if (ref?.current) {
        ref?.current?.appendChild(script);
      }
  
      return () => {
        ref?.current?.removeChild(script);
      };
    }, [url, ref]);
  };

export default function Footer(props) {
    const [acceptCookie, setAcceptCookie] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    
    useScript("https://platform.linkedin.com/in.js", ref);

    const googleTranslateElementInit = () => {
        if (!window['google']) {
            var addScript = document.createElement('script');
            addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
            document.body.appendChild(addScript);
        }
        const countryLocale = localStorage.getItem('country');
        if (localStorage && (countryLocale === null || countryLocale !== props?.country)) {
            localStorage.setItem('country', process.env.debug ? (countryLocale === null ? props?.country : countryLocale) : props?.country)
            //Once localstorage is set at first time no need to call this
            setTimeout(() => {
                const countries_list = { 'fr': 'fr', 'de': 'de', 'jp': 'ja', 'es': 'es', 'sv': 'sv', 'se': 'sv' };
                const country_code = countries_list[process.env.debug ? countryLocale : props?.country];
                console.log(props?.country, countryLocale, country_code)
                if (document.getElementsByClassName('flag_link') && country_code) {
                    console.log(country_code, document.querySelector(`.flag_link[data-lang="${country_code}"]`), document.querySelector("select.goog-te-combo"))
                    if (country_code && document.querySelector(`.flag_link[data-lang="${country_code}"]`) && document.querySelector("select.goog-te-combo")) {
                        //@ts-ignore
                        document.querySelector(`.flag_link[data-lang="${country_code}"]`).click();
                    }
                }
            }, 2000)
        }
    }

    useEffect(() => {
        googleTranslateElementInit();
    }, [props?.country])
    console.log(isMobile)

    return (
        <>
            {!isMobile && <Ecoengine />}
            <div className={styles.linkedinWid}>
                <i className='icon-linkedin'></i>
                <div className={styles.widgetIn} ref={ref}>
                    {/* <script src="https://platform.linkedin.com/in.js" type="text/javascript" defer> lang: en_US</script> */}
                    <script type="IN/FollowCompany" data-id="507280" data-counter="bottom"></script>
                </div>

            </div>
            <section className={styles.footer}>
                <div className={styles.row1}>
                    <div className="container">
                        <div className={styles.col1}>
                            <Link href="/" >
                                <a className={styles.logo}>
                                    <img src={props.logo?.url} alt="footer_logo" />
                                </a>
                            </Link>

                            {props.socialmedia && <div className={styles.share}>
                                <h3>{props.followustxt || 'Follow Us'}</h3>
                                <div>
                                    {props.socialmedia?.map(icon => (<a href={icon.link} key={`footersi${icon.id}`} target="_blank" className={`icon-${icon.icon}`}></a>))}
                                </div>
                            </div>}
                            <div className="googleTranslate hide">
                                <div id="google_translate_element"></div>
                                {/* <div className="flag">
                                <a href="#" className="flag_link eng" data-lang="en">Eng</a>
                                <a href="#" className="flag_link taj" data-lang="fr">FR</a>
                                <a href="#" className="flag_link rus" data-lang="de">DE</a>
                                <a href="#" className="flag_link rus" data-lang="ja">JA</a>
                                <a href="#" className="flag_link rus" data-lang="es">ES</a>
                            </div> */}
                            </div>
                        </div>

                        {props.fsection && <>
                            {props.fsection?.map((sect, indx) => <div key={`footerSect${indx}`} className={(indx !== 0 || indx === (props.fsection?.length - 1)) ? '' : styles.links}>
                                {sect?.section?.map(se => <React.Fragment key={`sectMainMenu${se.id}`}>
                                    <h3 className={styles.ftitle}>
                                        {se?.topmenu?.link ? <Link href={se?.topmenu?.link} >
                                            <a>{/*<i className="icon-polygon"></i>*/}{se?.topmenu?.cta}</a>
                                        </Link> : <>{se?.topmenu?.cta}</>}
                                    </h3>
                                    {se?.submenu?.pages && <React.Fragment key={`sectSubMenu${se.id}`}>
                                        <ul className={styles.link}>
                                            {se?.submenu?.pages?.map(s => <li key={`ssmenuIn${s.id}`}>
                                                <Link href={'/' + s.slug} >
                                                    <a>{s.title}</a>
                                                </Link>
                                            </li>)}
                                        </ul>
                                    </React.Fragment>}
                                </React.Fragment>)}
                            </div>)}
                        </>}
                    </div>
                </div>
                {props.bottomSection && <div className={styles.row2}>
                    <div className="container">
                        <div className={styles.link}>
                            {props.bottomSection?.links?.map((link, index) => <React.Fragment key={`botSectLink${link.id}`}>
                                <Link href={link.link}>
                                    <a>{link.cta}</a>
                                </Link>{(props.bottomSection?.links?.length - 1) !== index && <>&nbsp;|&nbsp;</>}
                            </React.Fragment>)}
                        </div>
                        <p>{props.bottomSection?.copyrightTitle || 'Copyright 2021 HindujaTech | All Rights Reserved'}</p>
                        <a href="https://www.hindujagroup.com" target="_blank" className={styles.hgp}><img src={props.bottomSection?.logo[0]?.url} alt="Hinduja_Group_Logo" />{props.bottomSection?.companyTitle || 'A Hinduja Group Company'}</a>
                    </div>
                </div>}

                <CookieConsent
                    location="bottom"
                    buttonText="ACCEPT"
                    debug={false}
                    cookieName="hindujatechCookieAccept"
                    hideOnAccept={true}
                    disableButtonStyles={true}
                    expires={365}
                    buttonClasses='btn blue'
                    onAccept={() => setAcceptCookie(true)}
                >
                    {!acceptCookie && <div className="row">
                        <h3>Cookie Policy</h3>
                        <div className="col-md-9">
                            <p>
                                Hinduja Tech’s website uses cookies to enable basic functionality, analyse visitor traffic, provide social media features and deliver a better user experience. Also, we may use cookies to deliver
                                targeted content and assess the performance of that content and associated campaigns. For more information, please review our
                                <a href="/privacy-statement" target="_blank">Web Privacy Policy</a> and
                                <a href="/cookie-policy" target="_blank">Cookie Policy</a>.
                            </p>
                        </div>
                    </div>}
                </CookieConsent>

                {/* {!isMobile && <Script src="/js/Trigger.js" />}
                {!isMobile && <Script src="/js/msghandle.js" />}
                {!isMobile && <Script src="/js/context.js" />} */}
                <Script src="/js/gt.js" />
                {!isMobile && <Script src="/js/chat.js" />}

                {!isMobile && <Script type="text/javascript" id="zsiqchat"></Script>}
            </section>
        </>
    );
}
