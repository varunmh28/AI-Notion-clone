'use client'

import {Fragment} from "react" ;
import { usePathname } from 'next/navigation'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"


function Breadcrumbs() {
    const path = usePathname();
    // http://localhost:3000/doc/AaB2Wnf1pO5xmf6YPxPz

    const segments = path.split("/");

    console.log(segments);
  return (
    <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      
       
    {segments.map((segment, index) => {
    if (!segment) return null;

    const href = `/${segments.slice(0, index + 1).join("/")}}`;
    const isLast = index === segments.length - 1;


    return (
    <Fragment key={segment}>
        <BreadcrumbSeparator />
    <BreadcrumbItem >
        {isLast ? (
            <BreadcrumbPage>{segment}</BreadcrumbPage>
        ) : (
    <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>

    // DO NOT PRESS doc on breadcrumbs ui on PAGE !!!!!!!!!!!!
    )
        }
    </BreadcrumbItem>
    </Fragment>
        );
    })}


      
    </BreadcrumbList>
  </Breadcrumb>
  )
}

export default Breadcrumbs