import { AchievementSet } from "./achievementSet.js";

export class Achievement {
    name="";
    description="";
    /**
     * @type {AchievementSet}
     */
    achievementSet=null;
    unlocked=false;
    unlockDate="";
    img="";
    outOf=undefined;
    doneOutOf=undefined;
    
    constructor(name, description, achievementSet, img, outOf, unlocked=false, unlockDate="") {
        this.name=name;
        this.description=description;
        this.achievementSet=achievementSet;
        this.img=img;
        this.outOf=outOf;
        this.unlocked=unlocked;
        this.unlockDate=unlockDate;
    }
}