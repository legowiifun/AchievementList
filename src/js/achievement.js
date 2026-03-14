export class Achievement {
    name="";
    description="";
    achievementSet=null;
    unlocked=false;
    unlockDate=null;
    img="";
    
    constructor(name, description, achievementSet, img, unlocked=false, unlockDate=null) {
        this.name=name;
        this.description=description;
        this.achievementSet=achievementSet;
        this.img=img;
        this.unlocked=unlocked;
        this.unlockDate=unlockDate;
    }
}