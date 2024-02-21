function updateText() {
  var inputText = document.getElementById('textInput').value;
  var displayContainer = document.getElementById('displayContainer');
  var newBox = document.createElement('div');
  newBox.className = 'box';
  newBox.textContent = inputText;
  displayContainer.appendChild(newBox);
  document.getElementById('textInput').value = ''; // Clear input field after adding text
}

// Update text every 5 seconds (5000 milliseconds)
setInterval(updateText, 5000);
