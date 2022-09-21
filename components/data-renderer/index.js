import dynamic from 'next/dynamic';
import HomeBanner from "@components/banner";
import BannerCenter from "@components/pagebannercenter";
import Journey from '@components/journey';
import Solutions from '@components/solutions';
import Testimonials from '@components/testimonials';
import Blog from '@components/blog';
import News from '@components/news';
import Homecareers from '@components/homecareers';
import Homecontact from '@components/homecontact';
import Contactform from '@components/contactform';
import Contactaddress from '@components/contactaddress';
import Pagebanner from "@components/pagebanner";
import Simpletext from "@components/simpletext";
import Virtualsoftware from "@components/virtual-software";
import Virtualsft from "@components/virtual-sft";
import Queriesform from "@components/queriesform";
import Customerssay from "@components/customerssay";
import Twocolumntab from "@components/twocolumntab";
import MultiColumnTab from "@components/multicolumntab";
import Casestudies from "@components/casestudies";
import Whyus from "@components/whyus";
import Ourofferings from "@components/ourofferings";
import Leaders from "@components/leaders";
import CompanyInfo from "@components/companyInfo";
import Simpletabcontent from "@components/simpletabcontent";
import Partnershipecosystem from "@components/partnershipecosystem";
import Contentimagerow from "@components/content-image-type-row";
import Imagetype from "@components/image-type";
import Boxlist from "@components/boxlist";
import MunroAssociatesBanner from "@components/munro/munrobanner";
import MunroOfferings from "@components/munro/munrosop";
import MunroShowcase from "@components/munro/munrosop/showcase";
import ThinkTankContent from "@components/munro/thinktankContent"
import ThinkTankJointOffer from "@components/munro/thinktankJointOffer"
import ThinkTankBottom from "@components/munro/thinktankbottom";
import Flowcontent from "@components/flowcontent";
import Contentwithimage from "@components/contentwithimage";
import Readcontent from "@components/readcontent";
import Investors from "@components/investors";
import Boxlistmini from "@components/boxlist-mini";
import Boxthreelist from "@components/grid-three-col";
import Threecoltabwithimage from "@components/threecol-tab-with-image";
import Texttablegridonlythree from "@components/text-table-grid-only-three";
import Textonly from "@components/textonly";
import Texttablegridonly from "@components/text-table-grid-only";
import Texttablegridonlytwo from "@components/text-table-grid-only-two";
import Simpletextgrid from "@components/simpletextgrid";
import Simpletextgridtwo from "@components/simpletextgridtwo";
import Imgcontentmini from "@components/imgcontentmini";
import Imgminilist from "@components/imgminilist";
import Simplefivegrid from "@components/simplefivegrid";
import Commontabcontent from "@components/commontabcontent";
import Practiceheadprofile from '@components/practiceheadprofile';
import Contactpracticeheadprofile from '@components/contactprofile';
import Csrbanner from '@components/csrbanner';
import Csrtext from '@components/csrtext';
import Csrroadmap from '@components/csrroadmap';
import Csrtitleimage from '@components/csrtitleimage';
import Csrinitiative from '@components/csrinitiative';
import Eduforall from '@components/eduforall';
import Sitemap from '@components/sitemap';
import Videobanner from '@components/video-banner';
import WorkwithusFeedback from "@components/arrow-text";
import WorkwithusSurvey from "@components/arrow-text-bg";
import Ourvalue from "@components/our-value";
import Employeetestinomials from "@components/employee-testinomials";
import Team from "@components/team";

export default function DataRenderer({ data, country, countries = {} }) {
    const { content } = data;
    return content.map((item, idx) => {
    const componentName = item.__component.split('.').pop();
    //const key = item.title + item.id + idx || idx;
    const key = `${componentName}_${item.id}`;
    switch (componentName) {
        case 'banner-media': {
            return (
                <HomeBanner key={'hbs'+key} componentId={key} data={item} country={country}/>
            );
        }
        case 'ourjourney': {
            return (
                <Journey key={key} componentId={key} data={item}/>
            );
        }
        case 'our-solutions': {
            return (
                <Solutions key={key} componentId={key} data={item}/>
            );
        }
        case 'testimonials': {
            return (
                <Testimonials key={key} componentId={key} data={item}/>
            );
        }
        case 'home-articles': {
            return (
                <Blog key={key} componentId={key} data={item}/>
            );
        }
        case 'home-news': {
            return (
                <News key={key} componentId={key} data={item}/>
            );
        }
        case 'home-careers': {
            return (
                <Homecareers key={key} componentId={key} data={item}/>
            );
        }
        case 'homecontact': {
            return (
                <Homecontact key={key} componentId={key} data={item}/>
            );
        }
        case 'contactform': {
            return (
                <Contactform key={key} componentId={key} data={item} pageData={data} countries={countries}/>
            );
        }
        case 'contactaddress': {
            return (
                <Contactaddress key={key} componentId={key} data={item}/>
            );
        }
        case 'banner': {
            return (<>
                <Pagebanner key={key} componentId={key} data={item}/>
            </>
            );
        }        
        case 'banner-center': {
            return (<>
                <BannerCenter key={key} componentId={key} data={item}/>
            </>
            );
        }
        case 'pes-simpletext': {
            return (
                <Simpletext key={key} componentId={key} data={item}/>
            );
        }        
        case 'pes-simpletextcs': {
            return (
                <Simpletextgrid key={key} componentId={key} data={item}/>
            );
        }
        case 'pes-offerings': {
            return (
                <Ourofferings key={key} componentId={key} data={item}/>
            );
        }
        case 'pes-two-tab': {
            return (
                <Twocolumntab key={key} componentId={key} data={item}/>
            );
        }        
        case 'pes-multi-tab': {
            return (
                <MultiColumnTab key={key} componentId={key} data={item}/>
            );
        }
        case 'virtual-software': {
            return (
                <Virtualsoftware key={key} componentId={key} data={item}/>
            );
        }
        case 'virtual-sft': {
            return (
                <Virtualsft key={key} componentId={key} data={item}/>
            );
        }
        case 'pes-casestudies': {
            return (
                <Casestudies key={key} componentId={key} data={item}/>
            );
        }
        case 'pes-why-us': {
            return (
                <Whyus key={key} componentId={key} data={item}/>
            );
        }
        case 'pes-customer-says': {
            return (
                <Customerssay key={key} componentId={key} data={item}/>
            );
        }
        case 'pes-form': {
            return (
                <Queriesform key={key} componentId={key} data={item} countries={countries}/>
            );
        }
        case 'ourleaders': {
            return (
                <Leaders key={key} componentId={key} data={item}/>
            );
        }        
        case 'company-info': {
            return (
                <CompanyInfo key={key} componentId={key} data={item}/>
            );
        }
        case 'companytabcontent': {
            return (
                <Simpletabcontent key={key} componentId={key} data={item}/>
            );
        }
        case 'tabs': {
            return (
                <Commontabcontent key={key} componentId={key} data={item}/>
            );
        }
        case 'partnership': {
            return (
                <Partnershipecosystem key={key} componentId={key} data={item}/>
            );
        }        
        case 'imagedescription': {
            return (
                <Contentimagerow key={key} componentId={key} data={item}/>
            );
        }            
        case 'imagesection': {
            return (
                <Imagetype key={key} componentId={key} data={item}/>
            );
        }
        case 'pes-submodules': {
            return (
                <Boxlist key={key} componentId={key} data={item}/>
            );
        }
        case 'proddvpt-modules': {
            return (
                <Boxlistmini key={key} componentId={key} data={item}/>
            );
        }
        case 'munrobanner': {
            return (
                <MunroAssociatesBanner key={key} componentId={key} data={item}/>
            );
        }           
        case 'munroofferings': {
            return (
                <MunroOfferings key={key} componentId={key} data={item}/>
            );
        }           
        case 'munroshowcase': {
            return (
                <MunroShowcase key={key} componentId={key} data={item}/>
            );
        }                   
        case 'ht-partners': {
            return (
                <ThinkTankContent key={key} componentId={key} data={item}/>
            );
        }                   
        case 'smsthinktank': {
            return (
                <ThinkTankJointOffer key={key} componentId={key} data={item}/>
            );
        }                 
        case 'smsthinktankbottom': {
            return (
                <ThinkTankBottom key={key} componentId={key} data={item}/>
            );
        }
        case 'social': {
            return (
                <Flowcontent key={key} componentId={key} data={item}/>
            );
        }
        case 'imagewithcontent': {
            return (
                <Contentwithimage key={key} componentId={key} data={item}/>
            );
        }
        case 'csr-bottom': {
            return (
                <Readcontent key={key} componentId={key} data={item}/>
            );
        }
        case 'investors': {
            return (
                <Investors key={key} componentId={key} data={item}/>
            );
        }
        case 'segments': {
            return (
                <Boxthreelist key={key} componentId={key} data={item}/>
            );
        }
        case 'powertrain-services': {
            return (
                <Threecoltabwithimage key={key} componentId={key} data={item}/>
            );
        }
        case 'conceptbenchmarking': {
            return (
                <Texttablegridonlythree key={key} componentId={key} data={item}/>
            );
        }
        case 'textonly': {
            return (<>
                <Textonly key={key} componentId={key} data={item}/>
            </>
            );
        }
        case 'powertrainvv': {
            return (<>
                <Texttablegridonly key={key} componentId={key} data={item}/>
            </>
            );
        }
        case 'pvv': {
            return (<>
                <Texttablegridonlytwo key={key} componentId={key} data={item}/>
            </>
            );
        }
        case 'cossrc-tab-content': {
            return (<>
                <Simpletextgridtwo key={key} componentId={key} data={item}/>
            </>
            );
        }
        case 'sap-award': {
            return (<>
                <Imgcontentmini key={key} componentId={key} data={item}/>
            </>
            );
        }
        case 'sap-image': {
            return (<>
                <Imgminilist key={key} componentId={key} data={item}/>
            </>
            );
        }
        case 'simplefivegrid': {
            return (<>
                <Simplefivegrid key={key} componentId={key} data={item}/>
            </>
            );
        }
        case 'practicehead': {
            return (<>
                <Practiceheadprofile key={key} componentId={key} data={item}/>
            </>
            );
        }
        case 'contactpracticehead': {
            return (<>
                <Contactpracticeheadprofile key={key} componentId={key} data={item}/>
            </>
            );
        }
        case 'csr-new-banner': {
            return (<>
                <Csrbanner key={key} componentId={key} data={item}/>
            </>
            );
        }
        case 'cr-new-text': {
            return (<>
                <Csrtext key={key} componentId={key} data={item}/>
            </>
            );
        }
        case 'csr-roadmaps': {
            return (<>
                <Csrroadmap key={key} componentId={key} data={item}/>
            </>
            );
        }
        case 'csr-new-behind': {
            return (<>
                <Csrtitleimage key={key} componentId={key} data={item}/>
            </>
            );
        }
        case 'csr-new-initiative': {
            return (<>
                <Csrinitiative key={key} componentId={key} data={item}/>
            </>
            );
        }
        case 'csr-new-education': {
            return (<>
                <Eduforall key={key} componentId={key} data={item}/>
            </>
            );
        }
        case 'sitemap': {
            return (<>
                <Sitemap key={key} componentId={key} data={item}/>
            </>
            );
        }
        case 'video': {
            return (<>
                <Videobanner key={key} componentId={key} data={item}/>
            </>
            );
        }
        case 'feedback': {
            return (<>
                <WorkwithusFeedback key={key} componentId={key} data={item}/>
            </>
            );
        }
        case 'surveycontent': {
            return (<>
                <WorkwithusSurvey key={key} componentId={key} data={item}/>
            </>
            );
        }
        case 'ourvalue': {
            return (<>
                <Ourvalue key={key} componentId={key} data={item}/>
            </>
            );
        }
        case 'team': {
            return (<>
                <Team key={key} componentId={key} data={item}/>
            </>
            );
        }
        case 'employeetestimonials': {
            return (<>
                <Employeetestinomials key={key} componentId={key} data={item}/>
            </>
            );
        }
        default:
            return <div key={key} componentId={key}>{data.title}</div>
        }
    });
}
