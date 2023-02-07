const gray = "body { background-color: gray; }";
const pastelGreen = "body { background-color: #A2AC91; }";
const softBrown = "body {background-color: #D4B59D;}";

function listenForClicks() {
    document.addEventListener("click", (e) => {
        let choice = e.target.textContent;
        let colorChoice;
        switch (choice){
            case "Dark":
                colorChoice = gray;
                break;
            case "Pastel Green":
                colorChoice = pastelGreen;
                break;
            case "Soft Brown":
                colorChoice = softBrown;
                break;
        }

        function changeColor(tabs) {
            let insertingCSS = browser.tabs.insertCSS({ code: colorChoice});
            insertingCSS.then(null, reportError);
        }
        function reportError(error) {
            console.error(`Could not change color: ${error}`);
        }
        browser.tabs
            .query({ active: true, currentWindow: true })
            .then(changeColor)
            .catch(reportError);
    })
}

browser.tabs
    .executeScript({ file: "/content_scripts/contentScript.js" })
    .then(listenForClicks)
    .catch(reportExecuteScriptError);
