import { Achievement } from "./achievement";
import * as json from "../test.json";
export class AchievementSet {
    name="";
    game=null;
    img="";
    achievements=[];
    constructor(name, game, img) {
        this.name=name;
        this.game=game;
        this.img=img;
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
    addAchievement(name, description, img, unlocked=false, unlockDate=null) {
        let newAchievement = new Achievement(name,description,this,img,unlocked,unlockDate);
        this.achievements.push(newAchievement);
    }
}