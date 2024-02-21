function addPrompt() {
    var promptText = document.getElementById('promptInput').value;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/add_prompt', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            // Prompt added successfully
            getPrompts();
        }
    };
    xhr.send('prompt=' + encodeURIComponent(promptText));
}

function getPrompts() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/get_prompts', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            var prompts = JSON.parse(xhr.responseText);
            displayPrompts(prompts);
        }
    };
    xhr.send();
}

function displayPrompts(prompts) {
    var promptContainer = document.getElementById('promptContainer');
    promptContainer.innerHTML = ''; // Clear previous prompts
    prompts.forEach(function(prompt) {
        var promptBox = document.createElement('div');
        promptBox.className = 'prompt-box';
        promptBox.textContent = prompt.text;
        promptContainer.appendChild(promptBox);
    });
}

// Fetch prompts initially and set up interval for continuous updates
getPrompts();
setInterval(getPrompts, 2000); // Update every 2 seconds
