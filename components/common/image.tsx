import Image from "next/image";
import { isEmpty } from 'ramda';
import { getThumb } from "@lib/helpers";

export const Imagecomponent = ({image, size = '', alt = '', layout = '', element = '', className = '', defaultImg = ''}) => {
    const altTxt = alt ? alt : (image?.alternativeText || image?.name?.split('.')[0]);
    if(image && ! isEmpty(image) ) {
        if(element = 'img') {
            return <img src={getThumb(image, size)} alt={altTxt} className={className} />
        } else {
            return <Image src={getThumb(image, size)} alt={altTxt} layout="fill" className={className}/>
        }
    } else {
        return defaultImg ? <img src={defaultImg} alt={altTxt}/> : <></>;//<img src={'/static/004.jpg'} alt={altTxt}/>
    }
}