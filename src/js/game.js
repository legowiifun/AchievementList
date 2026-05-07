import { Achievement } from "./achievement.js";
import { AchievementSet } from "./achievementSet.js";
import { windowAPI } from "./APIThroughWindow.js";
import { getCompletePath } from "./utils.js";

export class Game {
    name="";
    /**
     * @type {AchievementSet[]}
     */
    achievementSets=[];
    img="";
    platImg="";
    platform="";
    gameJSONLocation="";
    saveJSONLocation=""
    constructor(name, img, platform, platImg, gameJSONLocation) {
        this.name=name;
        getCompletePath(img).then((result)=> {
            this.img=result;
        });
        this.platform=platform;
        getCompletePath(platImg).then((result)=> {
            this.platImg=result;
        });
        this.gameJSONLocation=gameJSONLocation;
    }
    havePlat() {
        let hasAPlat=false;
        for (let i=0;i<this.achievementSets.length;i++) {
            if (this.achievementSets[i].requiredForPlat) {
                hasAPlat=true;
                if (this.achievementSets[i].getPercentageCompleted()!=100) {
                    return false;
                }
            }
        }
        return hasAPlat;
    }
    getPercentageCompleted() {
        let totalAchievements=this.getAchievementCount();
        let completedAchievements=this.getCompletedAchievementCount();
        return (completedAchievements/totalAchievements)*100;
    }
    getCompletedAchievementCount() {
        let completedAchievements=0;
        for(let i=0;i<this.achievementSets.length;i++) {
            completedAchievements=completedAchievements+this.achievementSets[i].getCompletedAchievementCount();
        }
        return completedAchievements;
    }
    getAchievementCount() {
        let count = 0;
        for (let i=0;i<this.achievementSets.length;i++) {
            count=count+this.achievementSets[i].getAchievementCount();
        }
        return count;
    }
    addAchievementSet(name, img,requiredForPlat=false) {
        this.achievementSets.push(new AchievementSet(name, this, img, requiredForPlat));
    }
    addAchievement(setName, name, description, img, outOf, hidden=false,unlocked=false, unlockDate="") {
        for (let i=0;i<this.achievementSets.length;i++) {
            if (this.achievementSets[i].name==setName) {
                this.achievementSets[i].addAchievement(name, description, img, outOf,hidden, unlocked, unlockDate);
                return;
            }
        }
        console.error("ERROR: adding an achievement to a set that does not exist!!!");
    }
    addAchievementByIndex(set, name, description, img, outOf, hidden=false,unlocked=false, unlockDate="") {
        if (this.achievementSets.length<=set) {
            console.error("ERROR: adding an achievement to a set that does not exist! achievementsSet length=",this.achievementSets.length," set index=",set);
            return;
        }
        this.achievementSets[set].addAchievement(name, description, img, outOf, hidden, unlocked, unlockDate);
    }
    createGameJSON() {
        let json={};
        json.name=this.name;
        json.img=this.img;
        json.platImg=this.platImg;
        let jsonAchievements=[];
        for (let i=0;i<this.achievementSets.length;i++) {
            let achievementSetObj = {};
            achievementSetObj.img=this.achievementSets[i].img;
            achievementSetObj.name=this.achievementSets[i].name;
            achievementSetObj.requiredForPlat=this.achievementSets[i].requiredForPlat;
            let achievements2=[];
            for (let j=0;j<this.achievementSets[i].achievements.length;j++) {
                let achievementObj={};
                achievementObj.name=this.achievementSets[i].achievements[j].name;
                achievementObj.description=this.achievementSets[i].achievements[j].description;
                achievementObj.img=this.achievementSets[i].achievements[j].img;
                if (this.achievementSets[i].achievements[j].outOf!=undefined) {
                    achievementObj.outOf=this.achievementSets[i].achievements[j].outOf;
                }
                achievements2.push(achievementObj);
            }
            achievementSetObj.achievements=achievements2;
            jsonAchievements.push(achievementSetObj);
        }
        json.achievements=jsonAchievements;
        if (windowAPI.viewConsoleLogs) {
            console.log("Creating game JSON for game "+this.name+": ",json);
        }
        return JSON.stringify(json, null, 4);
    }
    createSaveJSON() {
        let json=[];
        for (let i=0;i<this.achievementSets.length;i++) {
            let achievementArr=[];
            for (let j=0;j<this.achievementSets[i].achievements.length;j++) {
                let achievementObj={};
                achievementObj.obtained=this.achievementSets[i].achievements[j].unlocked;
                achievementObj.obtainedDate=this.achievementSets[i].achievements[j].unlockDate;
                if (this.achievementSets[i].achievements[j].doneOutOf!=undefined) {
                    achievementObj.outOf=this.achievementSets[i].achievements[j].doneOutOf;
                }
                achievementArr.push(achievementObj);
            }
            json.push(achievementArr);
        }
        if (windowAPI.viewConsoleLogs) {
            console.log("Creating save JSON for game "+this.name+": ",json);
        }
        return JSON.stringify(json, null, 4);
    }
    /**
     * @returns {Date}
     */
    getLastCompletedAchievementDate() {
        let lastCompletion=undefined;
        for (let i=0;i<this.achievementSets.length;i++) {
            for (let j=0;j<this.achievementSets[i].achievements.length;j++) {
                //first date
                if (lastCompletion==undefined) {
                    if (this.achievementSets[i].achievements[j].unlocked) {
                        lastCompletion=this.achievementSets[i].achievements[j].unlockDate;
                    }
                }
                //check if it is unlocked
                if (this.achievementSets[i].achievements[j].unlocked) {
                    //compare the dates
                    //if it is more milliseconds than the current one
                    if (this.achievementSets[i].achievements[j].unlockDate.getTime()>lastCompletion.getTime()) {
                        lastCompletion=this.achievementSets[i].achievements[j].unlockDate;
                    }
                }
            }
        }
        return lastCompletion;
    }
    /**
     * @param {Number} percent 
     * @returns {Date | undefined}
     * Returns a Date if you have reached that percentage in that particular game, undefined otherwise
     */
    getDateForPercentage(percent) {
        //compress into one list
        /**
         * @type {Achievement[]}
         */
        let allAchievements = [];
        for (let i=0;i<this.achievementSets.length;i++) {
            for (let j=0;j<this.achievementSets[i].achievements.length;j++) {
                allAchievements.push(this.achievementSets[i].achievements[j]);
            }
        }
        //sort achievements by date
        allAchievements.sort((a,b)=>{
            let aCompleted=a.unlockDate;
            let bCompleted=b.unlockDate;
            let aTime;
            if (aCompleted==undefined||a.unlocked==false) {
                aTime=0;
                return 1;
            } else {
                aTime=aCompleted.getTime();
            }
            let bTime;
            if (bCompleted==undefined||b.unlocked==false) {
                bTime=0;
                return -1;
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

        //calculate how many achievements for that percent
        //percent is (achievement count/total count)*100
        let achievementsNeeded=Math.ceil((percent/100)*allAchievements.length);
        //if the index is bigger, just return the final date
        if (achievementsNeeded-1>allAchievements.length) {
            return (this.getLastCompletedAchievementDate());
        }
        //otherwise, return
        let percentDate = allAchievements[achievementsNeeded-1].unlockDate;
        return percentDate;
    }
    getDateForPlat() {
        if (this.havePlat()==false) {
            return undefined;
        }
        let lastCompletion=undefined;
        for (let i=0;i<this.achievementSets.length;i++) {
            if (this.achievementSets[i].requiredForPlat) {
                for (let j=0;j<this.achievementSets[i].achievements.length;j++) {
                
                    //first date
                    if (lastCompletion==undefined) {
                        if (this.achievementSets[i].achievements[j].unlocked) {
                            lastCompletion=this.achievementSets[i].achievements[j].unlockDate;
                        }
                    }
                    //check if it is unlocked
                    if (this.achievementSets[i].achievements[j].unlocked) {
                        //compare the dates
                        //if it is more milliseconds than the current one
                        if (this.achievementSets[i].achievements[j].unlockDate.getTime()>lastCompletion.getTime()) {
                            lastCompletion=this.achievementSets[i].achievements[j].unlockDate;
                        }
                    }
                }
            }
        }
        return lastCompletion;
    }
}