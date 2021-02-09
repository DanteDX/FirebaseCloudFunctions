var firebaseConfig = {
    apiKey: "AIzaSyBmKFiPZ1DCKAyskKIbhm0PC0P-y8L1i7I",
    authDomain: "clouddemo-8fc67.firebaseapp.com",
    projectId: "clouddemo-8fc67",
    storageBucket: "clouddemo-8fc67.appspot.com",
    messagingSenderId: "645411949023",
    appId: "1:645411949023:web:feaf148af30253c4d11c6a",
    measurementId: "G-E9XP1XJJDC",
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const functions = firebase.functions();
  const storage = firebase.storage();