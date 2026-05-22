import {
    initializeApp, getApps,
    App,
    getApp, 
    cert,
    } from "firebase-admin/app";

    import { getFirestore } from "firebase-admin/firestore";

  //  const serviceKey = require("@/service_key.json");

  let serviceKey;

  // Checks if we are running on Vercel production or local development
  if (process.env.FIREBASE_PRIVATE_KEY) {
      serviceKey = {
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          // The replace handles how Vercel parses newline characters in private keys
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      };
  } else {
      // Falls back to your local, gitignored JSON file during local dev
      const configPath = "@/service_key.json";
        serviceKey = require(`${configPath}`);
  }



    let app : App;

    
if (getApps().length === 0) { 
    app = initializeApp({
        credential: cert(serviceKey),
    });

} else {
    app = getApp();

}

const adminDb = getFirestore(app);

export {app as adminApp , adminDb};