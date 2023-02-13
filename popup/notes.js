
// create necessary variables through query 
userSubmit = document.getElementById("userSubmit")
userClear = document.getElementById("userClear")
displayer = document.getElementById("display")
userInput =  document.getElementById("userInput")
blckq = document.querySelector("blockquote");
h1s = document.querySelectorAll("h1");

// show user's note from localStorage
if (localStorage["inputData"] != null){
    displayer.innerText = localStorage["inputData"]
}

// add click listener to submit button
userSubmit.addEventListener("click", (e) => {
    // prevent default to prevent colors from being reset
    e.preventDefault();
    displayer.innerHTML = userInput.value;
    if(userInput.value != ""){
        localStorage["inputData"] = userInput.value; }
    }
)

// add click listener to delete selection button
userClear.addEventListener("click", (e) => {    
    e.preventDefault();
    displayer.innerText = null;
    }
)

// listening for clicks within document
function listenForClicks() {
    document.addEventListener("click", (e) => {
        function changeColor() {
            let choice = e.target.textContent;
            // logic depeding on which button is clicked
            switch (choice) {
                // first 4 choices: change background color only
                case "Dark":
                    document.body.style.backgroundColor = "#242424";

                    break;
                case "Pastel Green":
                    document.body.style.backgroundColor = "#A2AC91";

                    break;
                case "Soft Brown":
                    document.body.style.backgroundColor = "#D4B59D";
                    break;
                case "Neutral White":
                    document.body.style.backgroundColor = "#EDEADE";
                    break;

                case "Yellow Text":
                    document.body.style.color = "#F0E68C";
                    blckq.style.color = "#F0E68C";
                    h1s.forEach(h1 => {
                        h1.style.color = "#F0E68C";
                    })
                    break;
                
                // next 4 choices: change text color and block color
                case "Dark Green Text":
                    document.body.style.color = "#006400";
                    blckq.style.color = "#006400";
                    h1s.forEach(h1 => {
                        h1.style.color = "#006400";
                    })
                    break;

                case "White Text":
                    document.body.style.color = "white";
                    blckq.style.color = "white";
                    h1s.forEach(h1 => {
                        h1.style.color = "white";
                    })
                    break;
                case "Dark Text":
                    document.body.style.color = "black";
                    blckq.style.color = "black";
                    h1s.forEach(h1 => {
                        h1.style.color = "black";
                    })
                    break;
            }
        }
        // call the changeColor function after determining button logic
        browser.tabs
            .query({ active: true, currentWindow: true })
            .then(changeColor)
            .catch(() => { console.log("Failed") });
    })
}

// error console handling
function reportExecuteScriptError(error) {
    console.error(`Failed to execute beastify content script: ${error.message}`);
}

// make active tab listen for clicks
browser.tabs
    .executeScript({ file: "/content_scripts/contentScript.js" })
    .then(listenForClicks)
    .catch(reportExecuteScriptError);
