import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "SEU_API_KEY_AQUI",
  authDomain: "SEU_AUTH_DOMAIN_AQUI",
  projectId: "SEU_PROJECT_ID_AQUI",
  storageBucket: "SEU_STORAGE_BUCKET_AQUI",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID_AQUI",
  appId: "SEU_APP_ID_AQUI",
  measurementId: "SEU_MEASUREMENT_ID_AQUI",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
