import {saveJSON, saveObject} from '../../JSONObjects/saveJSON.js';
import { getJson, getFilePath, editJson, fileSelection, getPathFromResources, validateGameJSON, validateSaveJSON } from '../../utils.js';
import { windowAPI } from '../../APIThroughWindow.js';
export class editSaveJSONView {
    /**
     * @type {saveJSON}
     */
    json = new saveJSON();
    /**
     * @type {HTMLUListElement}
     */
    list;
    /**
     * @param {string} path 
     */
    constructor(path) {
        this.list = document.createElement('ul');
        if (path!=undefined) {
            getJson(path).then((jsonStr)=> {
                this.json.file = JSON.parse(jsonStr);
                //it should be an array
                //validate
                if (!Array.isArray(this.json.file)) {
                    console.error("JSON file ",path,"is not an array");
                    windowAPI.viewManager.setView(windowAPI.viewManager.views.gamesView);
                } else {
                    //it is an array, parse the elements of it
                    for (let i=0;i<this.json.file.length;i++) {
                        this.list.appendChild(this.createAchievementSetSaveView(this.json.file[i],i));
                    }
                }
            });
        }
        //add the list to the main content
        windowAPI.mainContent.appendChild(this.list);
        //button to add an achievement set
        let addBtn = document.createElement('button');
        addBtn.id="addGameToGamesJSONBtn";
        addBtn.innerText="Add an Achievement Set";
        addBtn.addEventListener("click",()=>{
            this.list.appendChild(this.createAchievementSetSaveView(undefined,this.list.childElementCount));
            this.json.file.push([]);
        });
        windowAPI.mainContent.appendChild(addBtn);

        //button to save the content
        let saveButton = document.createElement('button');
        saveButton.id="editGamesSaveButton";
        saveButton.innerHTML="DONE";
        //add the event listener to the button
        saveButton.addEventListener("click",()=> {
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
        });
        windowAPI.mainContent.appendChild(saveButton);
    }

    /**
     * 
     * @param {saveObject[]} obj 
     * @param {Number} index 
     * @returns 
     */
    createAchievementSetSaveView(obj, index) {
        let listItem = document.createElement('li');
        let achievementList = document.createElement('ul');
        //achievements in the set
        if (obj!=undefined) {
            for (let i=0;i<obj.achievements.length;i++) {
                achievementList.appendChild(this.createAchievementSaveView(obj.achievements[i],index,i));
            }
        }
        //button to add an achievement
        let addBtn = document.createElement('button');
        addBtn.id="addAchievementToAchievementSetBtn";
        addBtn.innerText="Add an Achievement";
        addBtn.addEventListener("click",()=>{
            achievementList.appendChild(this.createAchievementSaveView(undefined, index, achievementList.childElementCount));
            this.json.file[index].push(new saveObject());
        });
        listItem.appendChild(addBtn);

        //delete the achievement set
        let deleteSetBtn = document.createElement('button');
        deleteSetBtn.id="removeAchievementSetFromJsonBtn";
        deleteSetBtn.innerText="Remove this achievement Set";
        deleteSetBtn.addEventListener("click",()=>{
            this.json.file.splice(index,1);
            listItem.remove();
        });
        listItem.appendChild(deleteSetBtn);

        listItem.appendChild(achievementList);
        
        return listItem;
    }
    
    /**
     * @param {saveObject} obj 
     * @param {Number} index1 
     * @param {Number} index2 
     */
    createAchievementSaveView(obj, index1, index2) {
        let self=this;
        let listItem = document.createElement('li');
        //obtained
        let obtainedParagraph = document.createElement('p');
        obtainedParagraph.id="obtainedParagraph";
        obtainedParagraph.innerText="Have you obtained this achievement?";
        let obtainedInput=document.createElement('input');
        obtainedInput.name="obtained";
        obtainedInput.id="obtainedInput";
        obtainedInput.type="checkbox";
        if (obj!=undefined) {
            obtainedInput.checked=obj.obtained;
        }
        obtainedInput.addEventListener('change', function(event) {
            self.json.file[index1][index2].obtained=obtainedInput.checked;
        });
        obtainedParagraph.appendChild(obtainedInput);
        obtainedParagraph.classList.add("formElement");
        listItem.appendChild(obtainedParagraph);

        //obtainedDate
        let obtainedDateParagraph = document.createElement('p');
        obtainedDateParagraph.id="obtainedDateParagraph";
        obtainedDateParagraph.innerText="When did you obtain this achievement";
        let obtainedDateInput = document.createElement('input');
        obtainedDateInput.name="obtainedDate";
        obtainedDateInput.id="obtainedDateInput";
        obtainedDateInput.type="date";
        if (obj!=undefined) {
            obtainedDateInput.valueAsDate=obj.obtainedDate;
        }
        obtainedDateInput.addEventListener('change', function(event) {
            self.json.file[index1][index2].obtainedDate=new Date(editAchievementdate.value).toString();
        });
        obtainedDateParagraph.appendChild(obtainedDateInput);
        obtainedDateParagraph.classList.add("formElement");
        listItem.appendChild(obtainedDateParagraph);

        //outOf
        let outOfParagraph = document.createElement('p');
        outOfParagraph.id="outOfParagraph";
        outOfParagraph.innerText="How close are you to obtaining this achievement?";
        let outOfInput=document.createElement('input');
        outOfInput.name="out of";
        outOfInput.id="outOfInput";
        outOfInput.type="number";
        if (obj!=undefined) {
            outOfInput.value=obj.outOf;
        }
        outOfInput.addEventListener('change', function(event) {
            self.json.file[index1][index2].outOf=outOfInput.value;
        });
        outOfParagraph.appendChild(outOfInput);
        outOfParagraph.classList.add("formElement");
        listItem.appendChild(outOfParagraph);

        //delete the achievement
        let deleteAchievementBtn = document.createElement('button');
        deleteAchievementBtn.id="removeAchievementFromJsonBtn";
        deleteAchievementBtn.innerText="Remove this achievement";
        deleteAchievementBtn.addEventListener("click",()=>{
            this.json.file[index1].splice(index2,1);
            listItem.remove();
        });
        listItem.appendChild(deleteAchievementBtn);
        return listItem;
    }
}