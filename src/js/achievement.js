import { AchievementSet } from "./achievementSet.js";
import { getCompletePath } from "./utils.js";

export class Achievement {
    name="";
    description="";
    /**
     * @type {AchievementSet}
     */
    achievementSet=null;
    unlocked=false;
    /**
     * @type {Date}
     */
    unlockDate=undefined;
    img="";
    outOf=undefined;
    doneOutOf=undefined;
    hidden=false;
    /**
     * 
     * @param {string} name 
     * @param {string} description 
     * @param {AchievementSet} achievementSet 
     * @param {string} img 
     * @param {Number} outOf 
     * @param {boolean} unlocked 
     * @param {Date} unlockDate 
     */
    
    constructor(name, description, achievementSet, img, outOf, hidden=false, unlocked=false, unlockDate=undefined) {
        this.name=name;
        this.description=description;
        this.achievementSet=achievementSet;
        getCompletePath(img).then((result)=> {
            this.img=result;
        });
        this.outOf=outOf;
        this.unlocked=unlocked;
        this.unlockDate=unlockDate;
        this.hidden=hidden;
        if (hidden==undefined) {
            this.hidden=false;
        }
    }
}