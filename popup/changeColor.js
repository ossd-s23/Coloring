// background color options
const softGray = "body { background-color: gray; }";
const pastelGreen = "body { background-color: #A2AC91; }";
const softBrown = "body {background-color: #D4B59D;}";
const neutralWhite = "body {background-color: #EDEADE}";

// font options
const makeBold = "body {font-weight: bold}";
const makeLight = "body {font-weight: lighter}";
const greenFont = "body {color: green}";
// array that stores all options
allOptions = [softGray, pastelGreen, softBrown, neutralWhite, makeBold, makeLight];

let cssChoice = "body { background-color: white; }";

// function for user clicks on popup
function listenForClicks() {
    document.addEventListener("click", (e) => {

        // different choices depending on which button is clicked
        let choice = e.target.textContent;
        switch (choice){
            case "Dark":
                cssChoice = softGray;
                break;
            case "Pastel Green":
                cssChoice = pastelGreen;
                break;
            case "Soft Brown":
                cssChoice = softBrown;
                break;
            case "Neutral White":
                cssChoice = neutralWhite;
                break;
            case "Text: Bolder":
                cssChoice = makeBold;
                break;
            case "Text: Lighter":
                cssChoice = makeLight;
                break;
        }
        
        // function to change background color of active tab
        // needs to be async to await for browser to first remove CSS to make buttons reclickable
        async function changeColor(tabs) {
            await browser.tabs
              .query({ active: true, currentWindow: true })
              .then(reset)
              .catch(()=> {console.log("Failed")});
            let insertingCSS = browser.tabs.insertCSS({code: cssChoice, cssOrigin: "user"});
            insertingCSS.then(reportSuccess(cssChoice), reportError);
        }

        // function to reset all CSS changes
        function reset(tabs) {
            for (const cssChange of allOptions){
                let removingCSS = browser.tabs.removeCSS({code: cssChange});
                removingCSS.then(()=>{(null, reportError)});
            }
          }
        
        // error handling in console
        function reportError(error) {
            console.error(`Could not change color ${error}`);
        }

        // report success in console
        function reportSuccess(value) {
            console.log(`Changed color to ${value}`);
        } 

        // logic depeding on which button is clicked
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

// error handling in console
function reportExecuteScriptError(error) {
    console.error(`Failed to execute beastify content script: ${error.message}`);
  }

// make active tab listen for clicks
browser.tabs
    .executeScript({ file: "/content_scripts/contentScript.js" })
    .then(listenForClicks)
    .catch(reportExecuteScriptError);
