import {
    initializeApp, getApps,
    App,
    getApp, 
    cert,
    } from "firebase-admin/app";

    import { getFirestore } from "firebase-admin/firestore";
    import fs from "fs";
    import path from "path";

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
      const jsonPath = path.join(process.cwd(), "service_key.json");
    const fileContents = fs.readFileSync(jsonPath, "utf8");
    serviceKey = JSON.parse(fileContents);
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