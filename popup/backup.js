// const softGray = "body { background-color: gray; }";
const softGray = "body { color: gray; }";

const pastelGreen = "body { background-color: #A2AC91; }";
const softBrown = "body {background-color: #D4B59D;}";
const temp = "body {border: 5px solid green;";

const neutral = "body {background-color: #EDEADE}";

let colorChoice = "body { background-color: white; }";
function listenForClicks() {
    document.addEventListener("click", (e) => {
        let choice = e.target.textContent;
        switch (choice){
            case "Dark":
                prev = colorChoice;
                colorChoice = softGray;
                break;
            case "Pastel Green":
                prev = colorChoice;
                colorChoice = temp;
                break;
            case "Soft Brown":
                prev = colorChoice;
                colorChoice = softBrown;
                break;
        }
        
        async function changeColor(tabs) {
            // let reloading = await browser.tabs.reload({bypassCache: true}).then(reportSuccess(colorChoice), reportError)
            let insertingCSS = browser.tabs.insertCSS({code: colorChoice});

            insertingCSS.then(reportSuccess(colorChoice), reportError);
        }
        function reset(tabs) {
            // let reloading = await browser.tabs.reload({bypassCache: true}).then(reportSuccess(colorChoice), reportError)

            let removingCSS = browser.tabs.removeCSS({code: colorChoice});
            browser.tabs.sendMessage(tabs[0].id, {
                command: "report",
              });
            removingCSS.then(()=>{console.log("removing: ", colorChoice)}, reportError);
          }
        function reportError(error) {
            console.error(`Could not change color`);
        }
        function reportSuccess(value) {
            console.log(`Changed color to ${value}`);
        } 
        if (e.target.type === "reset") {
            browser.tabs
              .query({ active: true, currentWindow: true })
              .then(reset)
              .catch(reportError);
          } else {
            browser.tabs
              .query({ active: true, currentWindow: true })
              .then(changeColor)
              .catch(()=> {console.log("Failed")});
          }
    })
}
function reportExecuteScriptError(error) {

    console.error(`Failed to execute beastify content script: ${error.message}`);
  }

browser.tabs
    .executeScript({ file: "/content_scripts/contentScript.js" })
    .then(listenForClicks)
    .catch(reportExecuteScriptError);
