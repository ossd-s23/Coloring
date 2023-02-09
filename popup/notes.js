
userSubmit = document.getElementById("userSubmit")
displayer = document.getElementById("display")
userInput =  document.getElementById("userInput")

if (localStorage["inputData"] != null){
    displayer.innerHTML = localStorage["inputData"]
}

// add click listener to submit button
userSubmit.addEventListener("click", (e) => {
    displayer.innerHTML = userInput.value;
    localStorage["inputData"] = userInput.value; })

// listening for clicks within document
function listenForClicks() {
    document.addEventListener("click", (e) => {

        function changeColor() {
            let choice = e.target.textContent;
            switch (choice) {
                case "Dark":
                    document.body.style.backgroundColor = "gray";
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
                case "Bolder":
                    document.body.style.fontWeight = "bold";
                    break;
                case "Lighter":
                    document.body.style.fontWeight = "lighter";
                    break;
                case "White Text":
                    document.body.style.color = "white";
                    break;
                case "Dark Text":
                    document.body.style.color = "black";
                    break;
            }
        }
        // logic depeding on which button is clicked
        browser.tabs
            .query({ active: true, currentWindow: true })
            .then(changeColor)
            .catch(() => { console.log("Failed") });
    })
}


function reportExecuteScriptError(error) {
    console.error(`Failed to execute beastify content script: ${error.message}`);
}

// make active tab listen for clicks
browser.tabs
    .executeScript({ file: "/content_scripts/contentScript.js" })
    .then(listenForClicks)
    .catch(reportExecuteScriptError);
