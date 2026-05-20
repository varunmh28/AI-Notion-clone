'use client'

import React from 'react'
import {LiveblocksProvider} from "@liveblocks/react/suspense";
import { useUser } from '@clerk/nextjs';

function LiveBlocksProvider({children}: {
    children: React.ReactNode
}) {

  // const { isLoaded, isSignedIn } = useUser();

  // if (!isLoaded || !isSignedIn) {
  //   return null;
  // }

    if(!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY){
        throw new Error("NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY is not set");
    }



  return (
    <LiveblocksProvider 
    throttle ={16}
    authEndpoint = {'/auth-endpoint'}>
    
    {children}</LiveblocksProvider>
  )
}

export default LiveBlocksProvider