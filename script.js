// Initialize Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
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
