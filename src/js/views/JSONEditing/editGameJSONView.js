import {gameJSON, achievementObject, achievementSetObject} from '../../JSONObjects/gameJSON.js';
import { getJson, getFilePath, editJson, fileSelection, getPathFromResources, validateGameJSON, validateSaveJSON } from '../../utils.js';
import { windowAPI } from '../../APIThroughWindow.js';
export class editGameJSONView {
    /**
     * @type {gameJSON}
     */
    json = new gameJSON();
    /**
     * @type {HTMLUListElement}
     */
    list;
    /**
     * @param {string} path 
     */
    constructor(path) {
        let self=this;
        this.list = document.createElement('ul');
        //parse the JSON - if it exists
        if (path!=undefined) {
            getJson(path).then((jsonStr)=> {
                this.json = JSON.parse(jsonStr);
                for (let i=0;i<this.json.achievements.length;i++) {
                    this.list.appendChild(this.createAchievementSetView(this.json.achievements[i],i));
                }
            });
        }
        
        //set the name
        let nameParagraph = document.createElement('p');
        nameParagraph.id="nameParagraph";
        nameParagraph.innerText="Game name";
        let nameInput=document.createElement('input');
        nameInput.name="gameName";
        nameInput.id="nameInput";
        nameInput.addEventListener('change', function(event) {
            self.json.name=nameInput.value;
        });
        nameParagraph.appendChild(nameInput);
        nameParagraph.classList.add("formElement");
        windowAPI.mainContent.appendChild(nameParagraph);

        let imgPath = this.json.img;
        //set the img
        let imgParagraph = document.createElement('p');
        imgParagraph.id="imgParagraph";
        imgParagraph.innerText="Game Image";
        let imgInput=document.createElement('input');
        imgInput.name="imgInput";
        imgInput.type="file";
        imgInput.accept=".png, .jpeg, .jpg, .gif, .webp, .avif, .svg, .bmp, .ico";
        imgInput.id="imgInput";
        imgInput.addEventListener('change', function(event) {
            let file=event.target.files[0];
            if (file!=undefined) {
                imgPath=getPathFromResources(getFilePath(file));
            } else {
                imgPath=undefined;
            }
            if (windowAPI.viewConsoleLogs) {
                console.log("JSON file",self.json.file, index);
            }
            self.json.img=imgPath;
        });
        imgParagraph.appendChild(imgInput);
        imgParagraph.classList.add("formElement");
        windowAPI.mainContent.appendChild(imgParagraph);

        let platImgPath = this.json.img;
        //set the plat img
        let platImgParagraph = document.createElement('p');
        platImgParagraph.id="platImgParagraph";
        platImgParagraph.innerText="Game Platinum Image";
        let platImgInput=document.createElement('input');
        platImgInput.name="platImgInput";
        platImgInput.type="file";
        platImgInput.accept=".png, .jpeg, .jpg, .gif, .webp, .avif, .svg, .bmp, .ico";
        platImgInput.id="imgInput";
        platImgInput.addEventListener('change', function(event) {
            let file=event.target.files[0];
            if (file!=undefined) {
                platImgPath=getPathFromResources(getFilePath(file));
            } else {
                platImgPath=undefined;
            }
            if (windowAPI.viewConsoleLogs) {
                console.log("JSON file",self.json.file, index);
            }
            self.json.platImg=platImgPath;
        });
        platImgParagraph.appendChild(platImgInput);
        platImgParagraph.classList.add("formElement");
        windowAPI.mainContent.appendChild(platImgParagraph);

        //add the list to the main content
        windowAPI.mainContent.appendChild(this.list);

        //button to add an achievement set
        let addBtn = document.createElement('button');
        addBtn.id="addGameToGamesJSONBtn";
        addBtn.innerText="Add an Achievement Set";
        addBtn.addEventListener("click",()=>{
            this.list.appendChild(this.createAchievementSetView(undefined,this.list.childElementCount));
            this.json.file.push(new gamesJSONObj());
        });
        windowAPI.mainContent.appendChild(addBtn);

        //button to save the content
        let saveButton = document.createElement('button');
        saveButton.id="editGamesSaveButton";
        saveButton.innerHTML="DONE";
        //add the event listener to the button
        saveButton.addEventListener("click",()=> {
            //get gameJSON
            /*for (let i=0;i<this.json.file.length;i++) {
                getJson(this.json.file[i].jsonName).then((val)=> {
                    if (!validateGameJSON(val)) {
                        windowAPI.viewManager.setView(windowAPI.viewManager.views.gamesView);
                    }
                    getJson(this.json.file[i].save).then((val2)=> {
                        if (!validateSaveJSON(val2)) {
                            windowAPI.viewManager.setView(windowAPI.viewManager.views.gamesView);
                        }
                        //get the path
                        let JSONPath=path;
                        if (JSONPath==undefined) {
                            fileSelection().then((val)=> {
                                console.log(val);
                                JSONPath=getPathFromResources(val.filePath);
                            }).then(()=> {
                                editJson(JSONPath,JSON.stringify(this.json.file,null,4));
                                windowAPI.viewManager.setView(windowAPI.viewManager.views.gamesView);
                            });
                        } else {
                            editJson(JSONPath,JSON.stringify(this.json.file,null,4));
                            windowAPI.viewManager.setView(windowAPI.viewManager.views.gamesView);
                        }
                    }).catch(()=>{
                        windowAPI.viewManager.setView(windowAPI.viewManager.views.gamesView);
                    });
                }).catch(()=> {
                    windowAPI.viewManager.setView(windowAPI.viewManager.views.gamesView);
                });
            }*/

        });
        windowAPI.mainContent.appendChild(saveButton);
    }
    /**
     * @param {achievementSetObject} obj
     * @param {Number} index 
     */
    createAchievementSetView(obj, index) {
        let self = this;
        let listItem = document.createElement('li');

        //file selection box for JSONs
        let gamePath;
        if (obj!=undefined) {
            gamePath=obj.jsonName;
        }
        let gameJsonLocationParagraph = document.createElement('p');
        gameJsonLocationParagraph.id="jsonLocationParagraph";
        gameJsonLocationParagraph.innerHTML="Game JSON file";
        let gameJsonLocationInput=document.createElement('input');
        gameJsonLocationInput.name="gameJSON";
        gameJsonLocationInput.type="file";
        gameJsonLocationInput.accept=".json";
        gameJsonLocationInput.id="gamesJSONGameInput";
        gameJsonLocationInput.addEventListener('change', function(event) {
            let file=event.target.files[0];
            if (file!=undefined) {
                gamePath=getPathFromResources(getFilePath(file));
            } else {
                gamePath=undefined;
            }
            if (windowAPI.viewConsoleLogs) {
                console.log("JSON file",self.json.file, index);
            }
            self.json.file[index].jsonName=gamePath;
        });
        gameJsonLocationParagraph.appendChild(gameJsonLocationInput);
        gameJsonLocationParagraph.classList.add("formElement");
        listItem.appendChild(gameJsonLocationParagraph);

        let savePath;
        if (obj!=undefined) {
            savePath=obj.save;
        }
        let saveJsonLocationParagraph = document.createElement('p');
        saveJsonLocationParagraph.id="jsonLocationParagraph";
        saveJsonLocationParagraph.innerHTML="Game Save JSON File";
        let saveJsonLocationInput=document.createElement('input');
        saveJsonLocationInput.name="gameJSON";
        saveJsonLocationInput.type="file";
        saveJsonLocationInput.accept=".json";
        saveJsonLocationInput.id="gamesJSONSaveInput";
        saveJsonLocationInput.addEventListener('change', function(event) {
            let file=event.target.files[0];
            if (file!=undefined) {
                //get the file down to just the contents
                savePath=getPathFromResources(getFilePath(file));
            } else {
                savePath=undefined;
            }
            self.json.file[index].save=savePath;
        });
        saveJsonLocationParagraph.appendChild(saveJsonLocationInput);
        saveJsonLocationParagraph.classList.add("formElement");
        listItem.appendChild(saveJsonLocationParagraph);

        //console.log(obj);
        //input box, with other select for platform
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
                self.json.file[index].platform=platformSelect.value;
            }
        });
        platformTextInput.addEventListener('change', function() {
            self.json.file[index].platform=platformTextInput.value;
        });
        if (obj!=undefined) {
            if (options.find((value)=>{
                return value==obj.platform;
            })) {
                platformSelect.value=obj.platform;
            } else {
                platformSelect.value="Other";
                platformTextInput.value=obj.platform;
            }
        }
        platformParagraph.appendChild(platformSelect);
        platformParagraph.appendChild(platformTextInput);
        platformParagraph.classList.add("formElement");
        listItem.appendChild(platformParagraph);

        //delete the game
        let deleteGameBtn = document.createElement('button');
        deleteGameBtn.id="removeGameFromJsonBtn";
        deleteGameBtn.innerText="Remove this game";
        deleteGameBtn.addEventListener("click",()=>{
            this.json.file.splice(index,1);
            listItem.remove();
        });
        listItem.appendChild(deleteGameBtn);
        
        return listItem;
    }
}