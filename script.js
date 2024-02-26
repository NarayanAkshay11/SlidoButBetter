// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxXDMk1uZeEZ_pm1EWuVrOX1kNAT_k54E",
  authDomain: "slido-but-better-8a97f.firebaseapp.com",
  projectId: "slido-but-better-8a97f",
  storageBucket: "slido-but-better-8a97f.appspot.com",
  messagingSenderId: "848688924092",
  appId: "1:848688924092:web:fb501866bd3d7586d757b9",
  measurementId: "G-CQ0LBHPGY8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get a reference to the database service
const database = firebase.database();

function updateText() {
  const textInput = document.getElementById('textInput');
  const newText = textInput.value.trim();
  
  if (newText !== '') {
    // Push text to Firebase database
    database.ref('dynamicText').set(newText);
  } else {
    alert('Please enter some text.');
  }
}

// Listen for changes in the Firebase database and update the display accordingly
database.ref('dynamicText').on('value', function(snapshot) {
  const displayContainer = document.getElementById('displayContainer');
  const newText = snapshot.val();
  if (newText) {
    displayContainer.textContent = newText;
  } else {
    displayContainer.textContent = 'No text entered';
  }
});
