import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyCxXDMk1uZeEZ_pm1EWuVrOX1kNAT_k54E",
  authDomain: "slido-but-better-8a97f.firebaseapp.com",
  projectId: "slido-but-better-8a97f",
  storageBucket: "slido-but-better-8a97f.appspot.com",
  messagingSenderId: "848688924092",
  appId: "1:848688924092:web:045ac9d52745d412d757b9",
  measurementId: "G-Q88405WGR9"
};

firebase.initializeApp(firebaseConfig);

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
