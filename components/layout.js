import { useEffect } from 'react';
import App from 'next/app';
import{ useRouter } from 'next/router';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import Header from '@components/header';
import Footer from '@components/footer';
import MetaData from '@components/meta-data';

function Layout({ children, ...props }) {
    const router = useRouter();
    
    useEffect(() => {      
      props.redirectUrl && router.replace(props.redirectUrl);
    }, []);
    
    return (
      <>      
				<ToastContainer className="toast-block" />
        <Header pageData={props.data} {...props.headerData}/>
        <MetaData {...props.data?.metadata} />
        {children}
        <Footer country={props?.headerData?.country} {...props.footerData}/>
      </>
    );
}

export default Layout;