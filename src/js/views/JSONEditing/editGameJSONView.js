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
        nameInput.value=this.json.name;
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
            this.json.achievements.push(new achievementSetObject());
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
        
        //set the name
        let nameParagraph = document.createElement('p');
        nameParagraph.id="nameParagraph";
        nameParagraph.innerText="Game name";
        let nameInput=document.createElement('input');
        nameInput.name="gameName";
        nameInput.id="nameInput";
        if (obj!=undefined) {
            nameInput.value=obj.name;
        }
        nameInput.addEventListener('change', function(event) {
            self.json.achievements[index].name=nameInput.value;
        });
        nameParagraph.appendChild(nameInput);
        nameParagraph.classList.add("formElement");
        listItem.appendChild(nameParagraph);

        let imgPath;
        if (obj!=undefined) {
            imgPath = obj.image;
        }
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
        listItem.appendChild(imgParagraph);

        //required for plat?
        let reqForPlatParagraph = document.createElement('p');
        reqForPlatParagraph.id="reqForPlatParagraph";
        reqForPlatParagraph.innerText="Is this achievement set required for the platinum?";
        let reqForPlatInput=document.createElement('input');
        reqForPlatInput.name="requiredForPlat";
        reqForPlatInput.id="reqForPlatInput";
        reqForPlatInput.type="checkbox";
        if (obj!=undefined) {
            reqForPlatInput.value=obj.name;
        }
        reqForPlatInput.addEventListener('change', function(event) {
            self.json.achievements[index].name=reqForPlatInput.checked;
        });
        reqForPlatParagraph.appendChild(reqForPlatInput);
        reqForPlatParagraph.classList.add("formElement");
        listItem.appendChild(reqForPlatParagraph);

        //only on
        //selection box
        //can select multiple
        //if select other, create list of others, any size
        let platformParagraph=document.createElement('p');
        platformParagraph.id="platformParagraph";
        platformParagraph.innerHTML="Platform: ";
        let platformSelect = document.createElement('select');
        platformSelect.id="achievementSelectPlatform";
        platformSelect.multiple=true;
        let options = ["PlayStation 3", "PlayStation 4", "PlayStation Vita", "PlayStation 5", "XBox", "XBox 360", "XBox One", "XBox Series X", "Steam", "GOG", "Other"];
        for (let i=0;i<options.length;i++) {
            let optionSelect = document.createElement('option');
            optionSelect.value=options[i];
            optionSelect.innerHTML=options[i];
            platformSelect.appendChild(optionSelect);
        }
        platformSelect.size=1;

        let platformList = document.createElement('ul');
        platformList.hidden=true;

        let platformTextInputCount = document.createElement('input');
        platformTextInputCount.type="number";
        platformTextInputCount.id="platformCountTextInput";
        platformTextInputCount.hidden=true;
        platformSelect.addEventListener('change', function(event) {
            //console.log(platformSelect.selectedOptions);
            let flag=false;
            for (let i=0;i<platformSelect.selectedOptions.length&&!flag;i++) {
                if (platformSelect.selectedOptions.item(i).innerText=="Other") {
                    platformTextInputCount.hidden=false;
                    platformList.hidden=false;
                    console.log("Found Other!");
                    flag=true;
                }
            }
            if (!flag) {
                platformTextInputCount.hidden=true;
                platformList.hidden=true;
            }
            self.json.achievements[index].onlyOn=Array.from(platformSelect.selectedOptions).map((option)=> {
                if (option!="Other") {
                    return option.innerText;
                }
            });
            //self.json.file[index].platform=platformSelect.value;
        });
        platformTextInputCount.addEventListener('change',function(event) {
            platformList.innerHTML="";
            for (let i=0;i<platformTextInputCount.value;i++) {
                let platformTextInput=document.createElement('input');
                platformTextInput.type="text";
                platformTextInput.id="addGameTextInput";
                platformTextInput.addEventListener('change', function() {
                    self.json.achievements[index].onlyOn[i+platformSelect.selectedOptions.length]=platformTextInput.value;
                });
                platformList.appendChild(document.createElement('li').appendChild(platformTextInput));
            }
        });
        platformParagraph.appendChild(platformSelect);
        platformParagraph.appendChild(platformTextInputCount);
        platformParagraph.appendChild(platformList);
        platformParagraph.classList.add("formElement");
        listItem.appendChild(platformParagraph);

        if (obj!=undefined) {
            let platformsArr=[];
            for (let i=0;i<obj.onlyOn.length;i++) {
                if (options.find((value)=> {
                    return value==obj.onlyOn[i];
                })) {
                    document.querySelector(`#platformSelect option[value="${val}"]`).selected=true;
                } else {
                    platformsArr.push(obj.onlyOn[i]);
                }
            }
            
            if (platformsArr.length!=0) {
                document.querySelector(`#platformSelect option[value="Other"]`).selected=true;
                platformSelect.dispatchEvent(new Event('change'));
                platformTextInputCount=platformsArr.length;
                platformTextInputCount.dispatchEvent(new Event('change'));
                for (let i=0;i<platformsArr.length;i++) {
                    platformList.children[i].children[0].value=platformsArr[i];
                }
            }
        }
        //achievements in the set


        //console.log(obj);

        //delete the game
        let deleteSetBtn = document.createElement('button');
        deleteSetBtn.id="removeAchievementSetFromJsonBtn";
        deleteSetBtn.innerText="Remove this achievement Set";
        deleteSetBtn.addEventListener("click",()=>{
            this.json.achievements.splice(index,1);
            listItem.remove();
        });
        listItem.appendChild(deleteSetBtn);
        
        return listItem;
    }
    /**
     * @param {achievementObject} obj 
     * @param {Number} index 
     */
    createAchievementView(obj, index) {
        
    }
}