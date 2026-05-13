'use client'

import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocumentData } from "react-firebase-hooks/firestore";

function SidebarOption({href, id}: {
    href: string;
    id: string;
}) {

  const [data,loading,error] = useDocumentData(doc(db,"documents",id));
  const pathname = usePathname();
  const isActive = href.includes(pathname) && pathname !== "/";



  if(!data) return null;

  return (
    // <Link href={href} className={`border p-2 rounded-md 
    //   ${isActive ? "bg-gray-300 font-bold border-black": "border-gray-400"}`}>

    
    //     <p className="truncate">{data.title}</p>    
    // </Link>

    <Link
  href={href}
  className={`block w-full rounded-md border px-3 py-2 ${
    isActive ? "bg-gray-300 font-bold border-black" : "border-gray-400"
  }`}
>
  <span className="block truncate">{data.title}</span>
</Link>
  )
}

export default SidebarOption