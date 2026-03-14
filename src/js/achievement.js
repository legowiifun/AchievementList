export class Achievement {
    name="";
    description="";
    achievementSet=null;
    unlocked=false;
    unlockDate="";
    img="";
    
    constructor(name, description, achievementSet, img, unlocked=false, unlockDate="") {
        this.name=name;
        this.description=description;
        this.achievementSet=achievementSet;
        this.img=img;
        this.unlocked=unlocked;
        this.unlockDate=unlockDate;
    }
}