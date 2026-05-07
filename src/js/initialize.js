import { Game } from './game.js';
import { getJson,openDevTools, getPathMinusFiles } from './utils.js';
import { windowAPI } from './APIThroughWindow.js';

/**
 * Handles initializing the application JSON files
 */
export class Initialize {
    /**
     * @type {object[]}
     */
    gamesJson;

    /**
     * @returns {void}
     */
    main() {
        //developer toolbar
        if (!windowAPI.hideDevTools) {
            let devBtn=document.getElementById("developerBtn");
            devBtn.hidden=false;
            devBtn.addEventListener('click',()=> {
                openDevTools();
            });
        }
        document.getElementById("gamesView").addEventListener('click',()=>{
            windowAPI.viewManager.setView(windowAPI.viewManager.views.gamesView);
        });
        document.getElementById("editJSON").addEventListener('click',()=>{
            windowAPI.viewManager.setView(windowAPI.viewManager.views.selectJSONView);
        });
        document.getElementById("mosaic").addEventListener('click',()=>{
            windowAPI.viewManager.setView(windowAPI.viewManager.views.mosaicView);
        });
        document.getElementById("refreshBtn").addEventListener('click',()=> {
            location.reload();
        });
        getJson("games.json").then((result)=>{
            this.gamesJson=JSON.parse(result);
        }).then(()=>{
            this.init().catch((err)=> {
                console.error("Failed to initialize JSON files",err);
            });
        }).catch((err)=> {
            console.error("Failed to read games.json!",err);
            this.gamesJson=[];
            this.init().catch((err)=> {
                console.error("Failed to initialize JSON files",err);
            });
        });
    }

    async init() {
        await getPathMinusFiles();
        if (this.gamesJson.length==undefined) {
            console.error("Games.json is not an array!");
            return;
        }

        //for each game in gamesJson
        for (let i=0;i<this.gamesJson.length;i++) {
            let gameIdx=i;
            //add a new game
            let jsonName=this.gamesJson[i].jsonName;
            if (jsonName==undefined) {
                console.error("Current game is not formatted properly. I can not read it!");              
            } else {
                //get the main JSON file
                let thisJson;
                try {
                    thisJson=await getJson(jsonName);
                
                    gameIdx=this.initGame(JSON.parse(thisJson),this.gamesJson[i].platform, jsonName);
                    //if there was not an error
                    if (gameIdx!=-1) {
                        //get the save file
                        let saveName = this.gamesJson[i].save;
                        if (saveName==undefined) {
                            console.error("Current game is not formatted properly. I can not read it!");                
                        } else {
                            //store the save file name for later use
                            windowAPI.myGames[gameIdx].saveJSONLocation=saveName;
                            //get the save file
                            try {
                                let saveJSON = await getJson(saveName)
                                this.initSaves(JSON.parse(saveJSON),gameIdx);
                            } catch(error) {
                                //if you can not get the save file, it does not exist   
                            }
                        }
                    }
                } catch(error) {
                    console.error("Can not read JSON file!");
                }
            }
        }
        this.setInitialView();
    }

    /**
     * @param {object} game 
     */
    initGame(game, platform, JSONLocation) {
        if (windowAPI.viewConsoleLogs) {
            console.log("initializing game: ",game);
        }
        let name=game.name;
        if (name==undefined) {
            console.error("I can not read this name!");
            return -1;
        }
        let img=game.img;
        if (img==undefined) {
            console.error("I can not find the image for game "+name+"!");
            return -1;
        }
        let platImg=game.platImg;
        if (platImg==undefined) {
            console.error("I can not find the platinum image for game "+name+"!");
            return -1;
        }
        let achievements=game.achievements;
        if (achievements==undefined) {
            console.error("I can not find the achievements for game "+name+"!");
            return -1;
        }
        let newGame=new Game(name,img,platform,platImg, JSONLocation);
        let skippedSets=0;
        for (let i=0;i<game.achievements.length;i++) {
            let skipAchievements=true;
            //check for the onlyOn array
            if (achievements[i].onlyOn!=undefined) {
                if (windowAPI.viewConsoleLogs) {
                    console.log("OnlyOn=",achievements[i].onlyOn);
                }
                if (achievements[i].onlyOn.find((value)=>{return value==platform})!=undefined) {
                    //if you find the platform in the only on array, skip the achievement set
                    skipAchievements=false;
                }
            } else {
                //if there is not an onlyOn array, do not skip this achievement set
                skipAchievements=false;
            }
            
            if (!skipAchievements) {
                if (windowAPI.viewConsoleLogs) {
                    console.log("Adding achievement set ",achievements[i].name);
                }
                newGame.addAchievementSet(achievements[i].name,achievements[i].image,achievements[i].requiredForPlat);
                for (let j=0;j<achievements[i].achievements.length;j++) {
                    let skipAchievement=true;
                    if (achievements[i].achievements[j].onlyOn!=undefined) {
                        if (achievements[i].achievements[j].onlyOn.find((value)=>{return value==platform})!=undefined) {
                            //don't add the achievement
                            skipAchievement=false;
                        }
                    } else {
                        skipAchievement=false;
                    }
                    if (!skipAchievement) {
                        if (windowAPI.viewConsoleLogs) {
                            console.log("Adding achievement ",achievements[i].achievements[j].name);
                        }
                        newGame.addAchievementByIndex(i-skippedSets,achievements[i].achievements[j].name,achievements[i].achievements[j].description,achievements[i].achievements[j].img,achievements[i].achievements[j].outOf,achievements[i].achievements[j].hidden);
                    } else {
                        if (windowAPI.viewConsoleLogs) {
                            console.log("Skipping adding achievement ",achievements[i].achievements[j].name);
                        }
                    }
                }
            } else {
                if (windowAPI.viewConsoleLogs) {
                    console.log("Skipping adding achievement set ",achievements[i].name);
                }
                skippedSets++;
            }
        }
        windowAPI.myGames.push(newGame);
        return(windowAPI.myGames.length-1);
    }
    initSaves(save, gameIdx) {
        if (save.length==undefined) {
            console.error("Saves JSON is not an array!");
            return;
        }
        if (windowAPI.viewConsoleLogs) {
            console.log("initializing save: ",save);
        }
        for (let i=0;i<save.length;i++) {
            if (save[i].length==undefined) {
                console.error("Save for this achievement set is not an array!");
            } else {
                for (let j=0;j<save[i].length;j++) {
                    let skipAddingAchievements=false;
                    if (windowAPI.myGames[gameIdx].achievementSets[i]==undefined) {
                        skipAddingAchievements=true;
                    } else if (windowAPI.myGames[gameIdx].achievementSets[i].achievements[j]==undefined) {
                        skipAddingAchievements=true;
                    }
                    if (!skipAddingAchievements) {
                        if (save[i][j].obtained==undefined) {
                            console.error("Can not determine if this achievement is obtained!");
                        } else {
                            windowAPI.myGames[gameIdx].achievementSets[i].achievements[j].unlocked=save[i][j].obtained;
                        }
                        if (save[i][j].obtainedDate==undefined&&save[i][j].obtained) {
                            console.error("Can not read the date for this achievement!");
                        } else {
                            windowAPI.myGames[gameIdx].achievementSets[i].achievements[j].unlockDate=new Date(save[i][j].obtainedDate);
                        }
                        windowAPI.myGames[gameIdx].achievementSets[i].achievements[j].doneOutOf=save[i][j].outOf;
                    }
                }
            }
        }
    }

    setInitialView() {
        //set the proper view
        if (windowAPI.viewConsoleLogs) {
            console.log("Current view: ",windowAPI.viewManager.currentState);
        }
        windowAPI.viewManager.setView(windowAPI.viewManager.views.gamesView);
        let currentSort = localStorage.getItem("Sort");
        if (currentSort==null) {
            currentSort=windowAPI.currentSort;
        }
        windowAPI.currentSort=currentSort;
        //windowAPI.sortGames(false);
    }
}