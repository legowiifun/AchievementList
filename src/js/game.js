import { AchievementSet } from "./achievementSet.js";

export class Game {
    name="";
    /**
     * @type {AchievementSet[]}
     */
    achievementSets=[];
    img="";
    platImg="";
    platform="";
    constructor(name, img, platform, platImg) {
        this.name=name;
        this.img=img;
        this.platform=platform;
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
    addAchievement(setName, name, description, img, outOf, unlocked=false, unlockDate="") {
        for (let i=0;i<this.achievementSets.length;i++) {
            if (this.achievementSets[i].name==setName) {
                this.achievementSets[i].addAchievement(name, description, img, outOf, unlocked, unlockDate);
                return;
            }
        }
        console.error("ERROR: adding an achievement to a set that does not exist!!!");
    }
    addAchievementByIndex(set, name, description, img, outOf, unlocked=false, unlockDate="") {
        if (this.achievementSets.length<=set) {
            console.error("ERROR: adding an achievement to a set that does not exist! achievementsSet length=",this.achievementSets.length," set index=",set);
            return;
        }
        this.achievementSets[set].addAchievement(name, description, img, outOf, unlocked, unlockDate);
    }
}