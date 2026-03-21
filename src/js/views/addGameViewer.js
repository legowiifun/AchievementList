import { windowAPI } from "../APIThroughWindow.js";
import { getFilePath, editJson, getJson } from "../utils.js";
export class AddGameViewer {
    constructor() {
        let newHTML="<p> JSON location: ";
            newHTML+="<input type=\"file\" name=\"gameJSON\" accept=\".json\" id=\"addGameJSONInput\">";
        newHTML+="</p>";
        newHTML+="<p> Platform: ";
            newHTML+="<select id=\"addGameSelectViewer\">"
                newHTML+="<option value=\"PlayStation 3\">PlayStation 3</option>";
                newHTML+="<option value=\"PlayStation 4\">PlayStation 4</option>";
                newHTML+="<option value=\"PlayStation Vita\">PlayStation Vita</option>";
                newHTML+="<option value=\"PlayStation 5\">PlayStation 5</option>";
                newHTML+="<option value=\"XBox\">XBox</option>";
                newHTML+="<option value=\"XBox 360\">XBox 360</option>";
                newHTML+="<option value=\"XBox 1\">XBox 1</option>";
                newHTML+="<option value=\"XBox Series X\">XBox Series X</option>";
                newHTML+="<option value=\"Steam\">Steam</option>";
                newHTML+="<option value=\"GOG\">GOG</option>";
                newHTML+="<option value=\"Other\">Other</option>";
            newHTML+="</select>";
            newHTML+="<input type=\"text\" id=\"addGameTextInput\" hidden>";
        newHTML+="</p>";
        newHTML=newHTML+"<button id=\"addGameSaveButton\""
            newHTML=newHTML+">DONE</button>";
        document.getElementById("content").innerHTML=newHTML;

        let file;
        document.getElementById("addGameJSONInput").addEventListener('change', function(event) {
            file=event.target.files[0];
        });
        document.getElementById("addGameSelectViewer").addEventListener('change', function(event) {
            if (document.getElementById("addGameSelectViewer").value=="Other") {
                document.getElementById("addGameTextInput").removeAttribute("hidden");
            } else {
                if (!document.getElementById("addGameTextInput").hasAttribute("hidden")) {
                    document.getElementById("addGameTextInput").setAttribute("hidden",true);
                }
            }
        });
        //add the event listener to the button
        document.getElementById("addGameSaveButton").addEventListener("click",()=> {
            if (file!=undefined) {
                console.log("JSON location=",getFilePath(file));
                console.log("Selected platform=",document.getElementById("addGameSelectViewer").value);
                //get the file down to just the contents
                let path=getFilePath(file);
                let idx=path.indexOf("\\resources\\")+11;
                if (idx!=-1) {
                    path=path.substring(idx);
                    console.log(path);
                    console.log("addGameTextInput value: ", document.getElementById("addGameTextInput").value);
                    let platform=document.getElementById("addGameSelectViewer").value;
                    if (platform=="Other") {
                        platform=document.getElementById("addGameTextInput").value;
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
    }
}