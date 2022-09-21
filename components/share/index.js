import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

export default function Share({url=''}) {
  const [shareUrl, setShareUrl] = useState(null);
  
  const [copied, setCopied] = useState(false);
  const copy = (e) => {
    e.preventDefault();
    const temporaryInput = document.createElement('textarea');
    temporaryInput.value = shareUrl;
    document.body.appendChild(temporaryInput);
    temporaryInput.select();
    document.execCommand('copy');
    document.body.removeChild(temporaryInput);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  useEffect(() => {
    url ? setShareUrl(url) : setShareUrl(window.location.href);
  }, []);

  return (
    <div>
      <a className="icon-linkedin" target="_blank" href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`}></a>
      <a className="icon-twitter" target="_blank" href={`https://twitter.com/intent/tweet?text=${shareUrl}`}></a>
      <a className="icon-facebook" target="_blank" href={`https://www.facebook.com/dialog/share?app_id=184484190795&display=popup&href=${shareUrl}`}></a>
      {/* <a className="icon-instagram"></a>
      <a className="icon-youtube"></a> */}
      <a className="icon-link" onClick={copy} href="#"></a>

      {/* {label && <span>{label}</span>}
      <a
        target="_blank"
        href={`https://www.facebook.com/dialog/share?app_id=184484190795&display=popup&href=${shareUrl}`}>
        <Icon type="facebook" />
      </a>
      <a
        target="_blank"
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`}>
        <Icon type="linkedin" />
      </a>
      <a
        target="_blank"
        href={`https://twitter.com/intent/tweet?text=${shareUrl}`}>
        <Icon type="twitter" />
      </a>
      <a
        onClick={copy}
        href="#"
        className={`${styles.iconLink} ${copied ? styles.copied : ''}`}>
        <Icon type="link" />
      </a> */}
    </div>
  );
}