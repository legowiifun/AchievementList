import { Game } from "../game.js";
import { windowAPI } from '../APIThroughWindow.js';
import { getCompletePath } from "../utils.js";
export class MosaicViewer {
    /**
     * @type {string[]}
     */
    platforms=[];
    /**
     * 
     * @param {Game[]} gamesArray 
     */
    constructor(gamesArray) {
        let self=this;
        //platform filter
        //selection box
        //can select multiple
        //if select other, create list of others, any size
        let platformParagraph=document.createElement('p');
        platformParagraph.id="platformParagraph";
        platformParagraph.innerHTML="Platforms to view (leave empty for all): ";
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
            let flag=false;
            for (let i=0;i<platformSelect.selectedOptions.length&&!flag;i++) {
                if (platformSelect.selectedOptions.item(i).innerText=="Other") {
                    platformTextInputCount.hidden=false;
                    platformList.hidden=false;
                    flag=true;
                }
            }
            if (!flag) {
                platformTextInputCount.hidden=true;
                platformList.hidden=true;
            }
            self.platforms=Array.from(platformSelect.selectedOptions).map((option)=> {
                if (option!="Other") {
                    return option.innerText;
                }
            });
        });
        platformTextInputCount.addEventListener('change',function(event) {
            platformList.innerHTML="";
            for (let i=0;i<platformTextInputCount.value;i++) {
                let platformTextInput=document.createElement('input');
                platformTextInput.type="text";
                platformTextInput.id="addGameTextInput";
                platformTextInput.addEventListener('change', function() {
                    self.platforms[i+platformSelect.selectedOptions.length]=platformTextInput.value;
                });
                platformList.appendChild(document.createElement('li').appendChild(platformTextInput));
            }
        });
        platformParagraph.appendChild(platformSelect);
        platformParagraph.appendChild(platformTextInputCount);
        platformParagraph.appendChild(platformList);
        platformParagraph.classList.add("formElement");
        windowAPI.mainContent.appendChild(platformParagraph);

        //percentage threshold/have plat
        let havePlatParagraph = document.createElement('p');
        havePlatParagraph.id="havePlatParagraph";
        havePlatParagraph.innerText="Percentage filter - check for if you are checking for the platinum";
        let havePlatCheckbox=document.createElement('input');
        havePlatCheckbox.name="havePlatCheckbox";
        havePlatCheckbox.id="havePlatCheckbox";
        havePlatCheckbox.type="checkbox";
        let percentageInput = document.createElement('input');
        percentageInput.name="percentageInput";
        percentageInput.id="percentageInput";
        percentageInput.type="number";
        percentageInput.min=0;
        percentageInput.max=100;
        havePlatCheckbox.addEventListener('change', function(event) {
            if (havePlatCheckbox.checked) {
                percentageInput.hidden=true;
            } else {
                percentageInput.hidden=false;
            }
        });
        havePlatParagraph.appendChild(havePlatCheckbox);
        havePlatParagraph.appendChild(percentageInput);
        havePlatParagraph.classList.add("formElement");
        windowAPI.mainContent.appendChild(havePlatParagraph);

        //number of columns/automatic fit
        let columnCountParagraph = document.createElement('p');
        columnCountParagraph.id="columnCountParagraph";
        columnCountParagraph.innerText="Column count - Check to automatically fit";
        let autoFitCheckbox=document.createElement('input');
        autoFitCheckbox.name="autoFitCheckbox";
        autoFitCheckbox.id="autoFitCheckbox";
        autoFitCheckbox.type="checkbox";
        let columnCountInput = document.createElement('input');
        columnCountInput.name="columnCountInput";
        columnCountInput.id="columnCountInput";
        columnCountInput.type="number";
        columnCountInput.min=0;
        autoFitCheckbox.addEventListener('change', function(event) {
            if (autoFitCheckbox.checked) {
                columnCountInput.hidden=true;
            } else {
                columnCountInput.hidden=false;
            }
        });
        columnCountParagraph.appendChild(autoFitCheckbox);
        columnCountParagraph.appendChild(columnCountInput);
        columnCountParagraph.classList.add("formElement");
        windowAPI.mainContent.appendChild(columnCountParagraph);

        //create mosaic button
        let createBtn = document.createElement('button');
        createBtn.id="createBtn";
        createBtn.innerText="Create Mosaic!";
        windowAPI.mainContent.appendChild(createBtn);
        // canvas
        let canvasElement = document.createElement('canvas');
        canvasElement.id="MosaicCanvas";
        canvasElement.width=3000;
        canvasElement.height=1500;
        
        createBtn.addEventListener('click',(event)=> {
            let games = gamesArray.filter((value)=> {
                //first filter by platform
                if (this.platforms.length!=0) {
                    let flag=false;
                    for (let i=0;i<this.platforms.length&&!flag;i++) {
                        if (this.platforms[i]==value.platform) {
                            flag=true;
                        }
                    }
                    //if the platform is not in the platforms list
                    if (!flag) {
                        return false;
                    }
                }
                //filter by percent
                if (havePlatCheckbox.checked) {
                    if (value.havePlat()) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if (value.getPercentageCompleted()>=percentageInput.valueAsNumber) {
                        return true;
                    } else {
                        return false;
                    }
                }
            });
            if (havePlatCheckbox.checked) {
                games.sort((a, b)=> {
                    let aCompleted=a.getDateForPlat();
                    let bCompleted=b.getDateForPlat();
                    let aTime;
                    if (aCompleted==undefined) {
                        aTime=0;
                    } else {
                        aTime=aCompleted.getTime();
                    }
                    let bTime;
                    if (bCompleted==undefined) {
                        bTime=0;
                    } else {
                        bTime=bCompleted.getTime();
                    }
                    if (aTime<bTime) {
                        return -1;
                    }
                    if (aTime>bTime) {
                        return 1;
                    }
                    return 0;
                });
            } else {
                console.log(games);
                games.sort((a, b)=> {
                    let aCompleted=a.getDateForPercentage(percentageInput.valueAsNumber);
                    let bCompleted=b.getDateForPercentage(percentageInput.valueAsNumber);
                    let aTime;
                    if (aCompleted==undefined) {
                        aTime=0;
                    } else {
                        aTime=aCompleted.getTime();
                    }
                    let bTime;
                    if (bCompleted==undefined) {
                        bTime=0;
                    } else {
                        bTime=bCompleted.getTime();
                    }
                    if (aTime<bTime) {
                        return -1;
                    }
                    if (aTime>bTime) {
                        return 1;
                    }
                    return 0;
                });
                console.log(games);
            }
            let rows;
            let columns;
            if (autoFitCheckbox.checked) {
                //TODO: algorithm to automatically calculate rows and columns
                columns=10;
                rows=Math.ceil(games.length/columns);
            } else {
                columns=columnCountInput.valueAsNumber;
                rows=Math.ceil(games.length/columns);
            }
            let gameSize=625;
            canvasElement.width=gameSize*columns;
            canvasElement.height=gameSize*rows;            
            let context = canvasElement.getContext("2d");
            let gameIdx = 0;
            //self.createImgTag(games[gameIdx],context,0,0,gameSize);
            for (let i=0;(i<rows)&&(gameIdx<games.length);i++) {
                //go through each column, and each row
                for (let j=0;j<(columns)&&(gameIdx<games.length);j++) {
                    self.createImgTag(games[gameIdx],context,gameSize*j,gameSize*i,gameSize);
                    
                    gameIdx++;
                }
                //context.drawImage(createimgTag(games[gameIdx]),0,0,10,10);
            }
        });

        //save button
        let saveCanvas = document.createElement('button');
        saveCanvas.innerText="Save";
        saveCanvas.addEventListener('click', (event)=> {
            let link = document.createElement('a');
            let img = canvasElement.toDataURL('image/png');
            link.href=img;
            link.download='mosaic-img.png';
            link.click();
        });
        windowAPI.mainContent.appendChild(saveCanvas);
        windowAPI.mainContent.appendChild(document.createElement('br'));
        windowAPI.mainContent.appendChild(canvasElement);
        
    }

    /**
     * @param {Game} game 
     * @return {HTMLImageElement}
     */
    createImgTag(game,context,locationX,locationY,size) {
        let imgTag = document.createElement("img");
        getCompletePath(game.platImg).then((result)=>{
            imgTag.src=result;
            imgTag.width=size;
            imgTag.height=size;
        }).then(()=> {
            context.drawImage(imgTag,locationX,locationY,size,size);
        });
        return imgTag;
    }
}