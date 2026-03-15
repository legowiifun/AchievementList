import { Achievement } from "../achievement.js";
export class AchievementHolder {
    myHTML;
    /**
     * 
     * @param {Achievement} achievement
     */
    constructor(achievement) {
        let newHTML = "<li>";
        window.resources.getCompletePath(achievement.img).then((result)=>{
            newHTML=newHTML+"<img wdith=\"100\" height=\"100\" src=\""+result+"\">";
            newHTML=newHTML+"<span class=\"achievementName\">"+achievement.name+"</span>";
            newHTML=newHTML+"<span class=\"achievementDesc\">"+achievement.description+"</span>";
            if (achievement.unlocked) {
                newHTML=newHTML+"<span class=\"achievementDate\">"+achievement.unlockDate+"</span>";
            } else {
                newHTML=newHTML+"<span class=\"achievementDate\">Unobtained</span>";
            }
            newHTML=newHTML+"</li>";
            this.myHTML=newHTML;
            document.getElementById("achievementList").innerHTML=document.getElementById("achievementList").innerHTML+this.myHTML;
        });
    }
}