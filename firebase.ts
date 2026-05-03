
import { initializeApp ,getApps,getApp} from "firebase/app";
import {getFirestore} from "firebase/firestore" ;

const firebaseConfig = {
    apiKey: "AIzaSyCTvZXt60r-QJrYCtWi7qSp_p1uyEZhssc",
    authDomain: "notion-clone-449bc.firebaseapp.com",
    projectId: "notion-clone-449bc",
    storageBucket: "notion-clone-449bc.firebasestorage.app",
    messagingSenderId: "34988695440",
    appId: "1:34988695440:web:113938afd88f908b2c9d15"
  };

  const app = getApps.length === 0 ? initializeApp(firebaseConfig) : getApp();
  const db = getFirestore(app);