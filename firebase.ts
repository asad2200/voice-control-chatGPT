import { getApp, getApps, initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDpp-gZk_jExyi7-TB2SogvlbdK-yA0rdk",
    authDomain: "voice-control-chat-gpt.firebaseapp.com",
    projectId: "voice-control-chat-gpt",
    storageBucket: "voice-control-chat-gpt.appspot.com",
    messagingSenderId: "1062929197704",
    appId: "1:1062929197704:web:a244aa44341b99ee794d3d"
}

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }

