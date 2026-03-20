import { Game } from './game.js';
import {GameViewer} from './views/gameViewer.js';
import { AchievementSetViewer } from './views/achievementSetViewer.js';
import { AchievementViewer } from './views/achievementViewer.js';
import { EditAchievementView } from './views/editAchievementView.js';
import { getJson } from './utils.js';

export class initialize {
    /**
     * @type {object[]}
     */
    gamesJson;

    views = {
        gamesView: "GamesView",
        achievementSetsView: "AchievementSetsView",
        achievementsView: "AchievementsView",
        editAchievementView: "EditAchievementView"
    };

    currentState="";
    previousState="";
    previousIdx=0;
    currentIdx=0;
    gameIdx=0;
    achievementSetIdx=0;
    achievementIdx=0;
    /**
     * @returns {void}
     */
    main() {
        getJson("games.json").then((result)=>{
            this.gamesJson=JSON.parse(result);
        }).then(()=>{
            this.init();
        }).catch((err)=> {
            console.error("Failed to read games.json!",err);
        });
    }

    /**
     * @returns {void}
     */
    init() {
        if (this.gamesJson.length==undefined) {
            console.error("Games.json is not an array!");
            return;
        }
        for (let i=0;i<this.gamesJson.length;i++) {
            let gameIdx=i;
            //add a new game
            let jsonName=this.gamesJson[i].jsonName;
            if (jsonName==undefined) {
                console.error("Current game is not formatted properly. I can not read it!");              
            } else {
                getJson(jsonName).then((result)=>{
                    gameIdx=this.initGame(JSON.parse(result),this.gamesJson[i].platform);
                }).then(()=> {
                    let saveName = this.gamesJson[i].save;
                    if (saveName==undefined) {
                        console.error("Current game is not formatted properly. I can not read it!");                
                    } else {
                        getJson(saveName).then((result)=>{
                            this.initSaves(JSON.parse(result),gameIdx);
                        }).then(()=>{
                            console.log("Current view: ",this.currentState);
                            this.setView(this.views.gamesView);
                        }).catch((err)=> {
                            console.error("Failed to read "+saveName+"!",err);
                        });
                    }
                }).catch((err)=> {
                    console.error("Failed to read "+jsonName+"!",err);
                });
            }
        }
    }

    /**
     * @param {object[]} game 
     */
    initGame(game, platform) {
        let name=game.name;
        if (name==undefined) {
            console.error("I can not read this name!");
            return;
        }
        let img=game.img;
        if (img==undefined) {
            console.error("I can not find the image for game "+name+"!");
            return;
        }
        let platImg=game.platImg;
        if (platImg==undefined) {
            console.error("I can not find the platinum image for game "+name+"!");
            return;
        }
        let achievements=game.achievements;
        if (achievements==undefined) {
            console.error("I can not find the achievements for game "+name+"!");
            return;
        }
        let newGame=new Game(name,img,platform,platImg);
        
        for (let i=0;i<game.achievements.length;i++) {
            let skipAchievements=true;
            //check for the onlyOn array
            if (achievements[i].onlyOn!=undefined) {
                console.log("OnlyOn=",achievements[i].onlyOn);
                if (achievements[i].onlyOn.find((value)=>{return value==platform})!=undefined) {
                    //if you find the platform in the only on array, skip the achievement set
                    skipAchievements=false;
                }
            } else {
                //if there is not an onlyOn array, do not skip this achievement set
                skipAchievements=false;
            }
            if (!skipAchievements) {
                console.log("Adding achievement set ",achievements[i].name);
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
                        console.log("Adding achievement ",achievements[i].achievements[j].name);
                        newGame.addAchievementByIndex(i,achievements[i].achievements[j].name,achievements[i].achievements[j].description,achievements[i].achievements[j].img,achievements[i].achievements[j].outOf);
                    } else {
                        console.log("Skipping adding achievement ",achievements[i].achievements[j].name);
                    }
                }
            } else {
                console.log("Skipping adding achievement set ",achievements[i].name);
            }
        }
        this.myGames.push(newGame);
        return(this.myGames.length-1);
    }
    initSaves(save, gameIdx) {
        if (save.length==undefined) {
            console.error("Saves JSON is not an array!");
            return;
        }
        for (let i=0;i<save.length;i++) {
            if (save[i].length==undefined) {
                console.error("Save for this achievement set is not an array!");
            } else {
                for (let j=0;j<save[i].length;j++) {
                    let skipAddingAchievements=false;
                    if (this.myGames[gameIdx].achievementSets[i]==undefined) {
                        skipAddingAchievements=true;
                    } else if (this.myGames[gameIdx].achievementSets[i].achievements[j]==undefined) {
                        skipAddingAchievements=true;
                    }
                    if (!skipAddingAchievements) {
                        if (save[i][j].obtained==undefined) {
                            console.error("Can not read json!");
                        } else {
                            this.myGames[gameIdx].achievementSets[i].achievements[j].unlocked=save[i][j].obtained;
                        }
                        if (save[i][j].obtainedDate==undefined) {
                            console.error("Can not read json!");
                        } else {
                            this.myGames[gameIdx].achievementSets[i].achievements[j].unlockDate=new Date(save[i][j].obtainedDate);
                        }
                        this.myGames[gameIdx].achievementSets[i].achievements[j].doneOutOf=save[i][j].outOf;
                    }
                }
            }
        }
    }
    /**
    * @type {Game[]}
    */
    myGames = [];


    /**
     * @param {string} view 
     * @param {number} idx 
     */
    setView(view, idx=0) {
        if (this.currentState==view) {
            return;
        }
        console.log("Setting view to ",view, idx);
        document.getElementById("backButton").removeAttribute("hidden");
        switch (view) {
            case this.views.gamesView: 
                document.getElementById("backButton").setAttribute("hidden",true);
                this.previousState="";
                new GameViewer(this.myGames);
                break;
            case this.views.achievementSetsView:
                this.gameIdx=idx;
                this.previousState=this.views.gamesView;
                new AchievementSetViewer(this.myGames[idx].achievementSets);
                break;
            case this.views.achievementsView:
                this.achievementSetIdx=idx;
                this.previousState=this.views.achievementSetsView;
                this.previousIdx=this.gameIdx;
                new AchievementViewer(this.myGames[this.gameIdx].achievementSets[idx].achievements);
                break;
            case this.views.editAchievementView:
                this.achievementIdx=idx;
                this.previousState=this.views.achievementsView;
                this.previousIdx=this.achievementSetIdx;
                new EditAchievementView(this.myGames[this.gameIdx].achievementSets[this.achievementSetIdx].achievements[idx]);
                break;
        }
        this.currentIdx=idx;
        this.currentState=view;
    }
}


if (typeof window!=undefined) {
    window.initialize=new initialize();
}