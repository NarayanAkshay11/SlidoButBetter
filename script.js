// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();

// Function to send prompt to Firebase
function sendPrompt() {
  const promptInput = document.getElementById('promptInput');
  const prompt = promptInput.value.trim();

  if (prompt !== '') {
    // Push prompt to Firebase database
    database.ref('prompts').push(prompt);
    promptInput.value = ''; // Clear input after sending prompt
  }
}

// Function to display prompts
function displayPrompts() {
  const promptContainer = document.getElementById('promptContainer');
  
  // Clear previous prompts
  promptContainer.innerHTML = '';

  // Retrieve prompts from Firebase and display them
  database.ref('prompts').once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      const prompt = childSnapshot.val();
      const promptBox = document.createElement('div');
      promptBox.className = 'prompt-box';
      promptBox.textContent = prompt;
      promptContainer.appendChild(promptBox);
    });
  });
}

// Display existing prompts on page load
displayPrompts();

// Listen for new prompts added to Firebase and display them
database.ref('prompts').on('child_added', function(snapshot) {
  displayPrompts();
});
