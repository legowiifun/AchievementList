import { windowAPI } from "../APIThroughWindow.js";
import { getFilePath, editJson, getJson } from "../utils.js";
export class AddGameViewer {
    constructor() {
        let file;
        
        let jsonLocationParagraph = document.createElement('p');
        jsonLocationParagraph.id="jsonLocationParagraph";
        jsonLocationParagraph.innerHTML="JSON location: ";
        jsonLocationParagraph.classList.add()
        let jsonLocationInput=document.createElement('input');
        jsonLocationInput.name="gameJSON";
        jsonLocationInput.type="file";
        jsonLocationInput.accept=".json";
        jsonLocationInput.id="addgameJSONInput";
        jsonLocationInput.addEventListener('change', function(event) {
            file=event.target.files[0];
        });
        jsonLocationParagraph.appendChild(jsonLocationInput);
        document.getElementById("content").appendChild(jsonLocationParagraph);

        let platformParagraph=document.createElement('p');
        platformParagraph.id="platformParagraph";
        platformParagraph.innerHTML="Platform: ";
        let platformSelect = document.createElement('select');
        platformSelect.id="addGameSelectViewer";
        let options = ["PlayStation 3", "PlayStation 4", "PlayStation Vita", "PlayStation 5", "XBox", "XBox 360", "XBox One", "XBox Series X", "Steam", "GOG", "Other"];
        for (let i=0;i<options.length;i++) {
            let optionSelect = document.createElement('option');
            optionSelect.value=options[i];
            optionSelect.innerHTML=options[i];
            platformSelect.appendChild(optionSelect);
        }
        let platformTextInput=document.createElement('input');
        platformTextInput.type="text";
        platformTextInput.id="addGameTextInput";
        platformTextInput.hidden=true;
        platformSelect.addEventListener('change', function(event) {
            if (platformSelect.value=="Other") {
                platformTextInput.hidden=false;
            } else {
                platformTextInput.hidden=true;
            }
        });
        platformParagraph.appendChild(platformSelect);
        platformParagraph.appendChild(platformTextInput);
        document.getElementById("content").appendChild(platformParagraph);

        let saveButton = document.createElement('button');
        saveButton.id="addGameSaveButton";
        saveButton.innerHTML="DONE";
        //add the event listener to the button
        saveButton.addEventListener("click",()=> {
            if (file!=undefined) {
                console.log("JSON location=",getFilePath(file));
                console.log("Selected platform=",platformSelect.value);
                //get the file down to just the contents
                let path=getFilePath(file);
                let idx=path.indexOf("\\resources\\")+11;
                if (idx!=-1) {
                    path=path.substring(idx);
                    console.log(path);
                    console.log("addGameTextInput value: ", platformTextInput.value);
                    let platform=platformSelect.value;
                    if (platform=="Other") {
                        platform=platformTextInput.value;
                    }
                    //validate the JSON file
                    getJson(path).then((value)=> {
                        let json=JSON.parse(value);
                        let gameIdx=windowAPI.initJSON.initGame(json,platform,path);
                        if (gameIdx!=-1) {
                            windowAPI.myGames[gameIdx].saveJSONLocation=("saves\\"+windowAPI.myGames[gameIdx].name+platform+"AchievementsData.json");
                            console.log(windowAPI.createGamesJSON());
                            editJson("games.json",windowAPI.createGamesJSON());
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