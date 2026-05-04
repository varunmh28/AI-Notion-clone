'use server';

import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";



   
export async function createNewDocument(){
   await auth.protect();   // clerk - it helps to auth if session logged out while creating document

    const {sessionClaims} = await auth();

    const docCollectionRef = adminDb.collection("documents"); // will create document folder in firestore DB
    const docRef = await docCollectionRef.add({
        title: "New Doc",
    });

    await adminDb
    .collection('users')
    .doc(sessionClaims?.email!).collection('rooms')
    .doc(docRef.id)
    .set({
        userId: sessionClaims?.email! ,
        role: "owner",
        createdAt: new Date(),
        roomId: docRef.id

    });

    return {docId: docRef.id};
} 