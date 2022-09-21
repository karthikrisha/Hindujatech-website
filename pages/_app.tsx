import 'regenerator-runtime/runtime';
import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';
import ReactMarkdown from 'react-markdown';
import { hotjar } from 'react-hotjar';
import 'nprogress/nprogress.css';
import "../styles/globals.scss";

// ReactMarkdown.defaultProps = {
//   allowDangerousHtml: true
// };

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', (e) => {
  NProgress.done();
});
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  //const router = useRouter()

  // if (router.isFallback) {
  //   console.log('fallback+++++++')
  //   return <div>Loading...</div>
  // }
  
  useEffect(() => {
    // const handleRouteChangeError = (err, url) => {
    //   console.log(err)
    //   if (err.cancelled) {
    //     console.log(`Route to ${url} was cancelled!`)
    //   }
    // }

    // router.events.on('routeChangeError', handleRouteChangeError)

    hotjar.initialize(2764727, 6);


    // return () => {
    //   router.events.off('routeChangeError', handleRouteChangeError)
    // }
  }, [])

  return <Component {...pageProps} />;
}

export default MyApp;
