import { windowAPI } from "../../APIThroughWindow.js";
import { getFilePath } from "../../utils.js";
export class SelectJSONView {
    constructor() {
        //let file;
        let path;
        let jsonLocationParagraph = document.createElement('p');
        jsonLocationParagraph.id="jsonLocationParagraph";
        jsonLocationParagraph.innerHTML="JSON to edit (leave blank to create a new JSON file): ";
        let jsonLocationInput=document.createElement('input');
        jsonLocationInput.name="gameJSON";
        jsonLocationInput.type="file";
        jsonLocationInput.accept=".json";
        jsonLocationInput.id="addgameJSONInput";
        jsonLocationInput.addEventListener('change', function(event) {
            let file=event.target.files[0];
            if (file!=undefined) {
                //get the file down to just the contents
                path=getFilePath(file);
                let idx=path.lastIndexOf("\\resources\\")+11;
                if (idx!=-1) {
                    path=path.substring(idx);
                    if (windowAPI.viewConsoleLogs) {
                        console.log(path);
                    }
                }
            }
        });
        jsonLocationParagraph.appendChild(jsonLocationInput);
        jsonLocationParagraph.classList.add("formElement");
        document.getElementById("content").appendChild(jsonLocationParagraph);

        let radioParagraph = document.createElement('p');
        radioParagraph.id="JSONTypeParagraph";
        radioParagraph.innerHTML="Select which JSON file to edit";

        let gamesJSONParagraph=document.createElement('p');
        gamesJSONParagraph.innerHTML="games.json";
        let gamesJSONButton = document.createElement('input');
        gamesJSONButton.type="radio";
        gamesJSONButton.name="JSONType";
        gamesJSONButton.value="GamesJSON";
        gamesJSONButton.checked="checked";
        gamesJSONParagraph.appendChild(gamesJSONButton);
        radioParagraph.appendChild(gamesJSONParagraph);
        
        let gameJSONParagraph=document.createElement('p');
        gameJSONParagraph.innerHTML="individual game JSON files";
        let gameJSONButton = document.createElement('input');
        gameJSONButton.type="radio";
        gameJSONButton.name="JSONType";
        gameJSONButton.value="gameJSON";
        gameJSONParagraph.appendChild(gameJSONButton);
        radioParagraph.appendChild(gameJSONParagraph);

        let saveJSONParagraph=document.createElement('p');
        saveJSONParagraph.innerHTML="saved achievement JSON files";
        let saveJSONButton = document.createElement('input');
        saveJSONButton.type="radio";
        saveJSONButton.name="JSONType";
        saveJSONButton.value="saveJSON";
        saveJSONParagraph.appendChild(saveJSONButton);
        radioParagraph.appendChild(saveJSONParagraph);

        document.getElementById("content").appendChild(radioParagraph);
        
        let saveButton = document.createElement('button');
        saveButton.id="addGameSaveButton";
        saveButton.innerHTML="DONE";
        //add the event listener to the button
        saveButton.addEventListener("click",()=> {
            
            let radioVal=document.querySelector('input[name="JSONType"]:checked').value;
            //set view to the proper version of edit JSON view, passing in the JSON value
            if (windowAPI.viewConsoleLogs) {
                console.log("checked ",radioVal);
                console.log("JSON location=",path);
            }
            windowAPI.viewManager.JSONSelectionPath = path;
            switch(radioVal) {
                case "GamesJSON":
                    windowAPI.viewManager.setView(windowAPI.viewManager.views.editGamesJSONView);
                    break;
                case "gameJSON":
                    windowAPI.viewManager.setView(windowAPI.viewManager.views.editGameJSONView);
                    break;
                case "saveJSON":
                    windowAPI.viewManager.setView(windowAPI.viewManager.views.editSaveJSONView);
                    break;
            }
        });
        document.getElementById("content").appendChild(saveButton);
    }
}