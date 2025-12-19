// Firebase configuration (PASTE YOUR REAL KEYS)
const firebaseConfig = {
  apiKey: "AIzaSyC-iDflqyZqhWs4rAqvPL-UzQcQqzBXqj8",
  authDomain: "aiweb-studio.firebaseapp.com",
  projectId: "aiweb-studio",
  storageBucket: "aiweb-studio.firebasestorage.app",
  messagingSenderId: "219630404966",
  appId: "1:219630404966:web:b400dd40d43578da1b74a7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export auth globally
const auth = firebase.auth();
