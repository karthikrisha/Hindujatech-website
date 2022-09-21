import React from "react";
import Link from "next/link";

export default function Nodata({cta = '', ctaLink = ''}) {
    return (
    <div>No Blogs found <Link href={ctaLink || "/blogs"}><a>{cta || 'Back to blogs'}</a></Link></div>);
}