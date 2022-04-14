/* eslint-disable */
import { initializeApp } from "firebase/app";
import {
    getDatabase,
    ref,
    set,
    push,
    onValue,
    remove,
} from "firebase/database";
import {
    getStorage,
    ref as refstorage,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCQV8CSwFe5yR9FUvIv9JXDiwCbTBe7Yak",
    authDomain: "chat-realtime-ptitworks.firebaseapp.com",
    databaseURL: "https://chat-realtime-ptitworks-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chat-realtime-ptitworks",
    storageBucket: "chat-realtime-ptitworks.appspot.com",
    messagingSenderId: "397556956305",
    appId: "1:397556956305:web:4c5145e7c887488444d330",
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const dbchat = getDatabase(app);
const dbstorage = getStorage(app);

export {
    ref,
    onValue,
    set,
    push,
    remove,
    dbchat,
    refstorage,
    uploadBytes,
    getDownloadURL,
    dbstorage,
};