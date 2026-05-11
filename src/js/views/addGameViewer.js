import { windowAPI } from "../APIThroughWindow.js";
import { getFilePath, editJson, getJson } from "../utils.js";
import { settings } from '.././settingsManager.js';
import { singlePlatformSelectionBox } from "../PlaformSelectionBoxes/singlePlatformSelectionBox.js";
export class AddGameViewer {
    constructor() {
        let file;
        
        let jsonLocationParagraph = document.createElement('p');
        jsonLocationParagraph.id="jsonLocationParagraph";
        jsonLocationParagraph.innerHTML="JSON location: ";
        let jsonLocationInput=document.createElement('input');
        jsonLocationInput.name="gameJSON";
        jsonLocationInput.type="file";
        jsonLocationInput.accept=".json";
        jsonLocationInput.id="addgameJSONInput";
        jsonLocationInput.addEventListener('change', function(event) {
            file=event.target.files[0];
        });
        jsonLocationParagraph.appendChild(jsonLocationInput);
        jsonLocationParagraph.classList.add("formElement");
        document.getElementById("content").appendChild(jsonLocationParagraph);

        let platformParagraph=document.createElement('p');
        platformParagraph.id="platformParagraph";
        platformParagraph.innerHTML="Platform: ";

        let platformSelect = new singlePlatformSelectionBox();
        platformParagraph.appendChild(platformSelect.display);
        platformParagraph.classList.add("formElement");
        document.getElementById("content").appendChild(platformParagraph);

        let saveButton = document.createElement('button');
        saveButton.id="addGameSaveButton";
        saveButton.innerHTML="DONE";
        //add the event listener to the button
        saveButton.addEventListener("click",()=> {
            if (file!=undefined) {
                if (settings.printConsoleLogs) {
                    console.log("JSON location=",getFilePath(file));
                    console.log("Selected platform=",platformSelect.getValue());
                }
                //get the file down to just the contents
                let path=getFilePath(file);
                let idx=path.lastIndexOf("\\resources\\")+11;
                if (idx!=-1) {
                    path=path.substring(idx);
                    if (settings.printConsoleLogs) {
                        console.log(path);
                        console.log("addGameTextInput value: ", platformSelect.platformTextInput.value);
                    }
                    let platform=platformSelect.getValue();
                    //validate the JSON file
                    getJson(path).then((value)=> {
                        let json=JSON.parse(value);
                        let gameIdx=windowAPI.initJSON.initGame(json,platform,path);
                        if (gameIdx!=-1) {
                            windowAPI.myGames[gameIdx].saveJSONLocation=("",settings.defaultStorageLocation+"\\"+windowAPI.myGames[gameIdx].name+platform+"AchievementsData.json").replaceAll(/[/?%*:|"<>]/g,'');
                            if (settings.printConsoleLogs) {
                                console.log(windowAPI.createGamesJSON());
                            }
                            editJson(settings.gamesJSONFile,windowAPI.createGamesJSON());
                            windowAPI.viewManager.setView(windowAPI.viewManager.views.gamesView, 0);
                        }
                    }).catch((err) => {
                        console.error("CANNOT READ JSON FILE!",err);
                    });
                } else {
                    console.error("Invalid JSON file selection!");
                }
            }
        });
        document.getElementById("content").appendChild(saveButton);
    }
}