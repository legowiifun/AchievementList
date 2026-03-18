import { Achievement } from "./achievement.js";
export class AchievementSet {
    name="";
    game=null;
    img="";
    /**
     * @type {Achievement[]}
     */
    achievements=[];
    requiredForPlat=false;
    constructor(name, game, img,requiredForPlat=false) {
        this.name=name;
        this.game=game;
        this.img=img;
        this.requiredForPlat=requiredForPlat;
    }
    getPercentageCompleted() {
        let totalAchievements=this.getAchievementCount();
        let completedAchievements=this.getCompletedAchievementCount();
        return (completedAchievements/totalAchievements)*100;
    }
    getCompletedAchievementCount() {
        let completedAchievements=0;
        for(let i=0;i<this.achievements.length;i++) {
            if (this.achievements[i].unlocked==true) {
                completedAchievements++;
            }
        }
        return completedAchievements;
    }
    getAchievementCount() {
        return this.achievements.length;
    }
    addAchievement(name, description, img, outOf, unlocked=false, unlockDate="") {
        let newAchievement = new Achievement(name,description,this,img,outOf, unlocked,unlockDate);
        this.achievements.push(newAchievement);
    }
}