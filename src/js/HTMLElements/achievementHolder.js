import { Achievement } from "../achievement.js";
import { getCompletePath, convertDate } from "../utils.js";

export class AchievementHolder {
    myHTML;
    achievement;
    /**
     * 
     * @param {Achievement} achievement
     */
    constructor(achievement, idx) {
        this.achievement=achievement;
        let newHTML = "<li class=\"achievementEntry\" id=\"";
        newHTML=newHTML+achievement.name;
        newHTML=newHTML+"\">";
        getCompletePath(achievement.img).then((result)=>{
            if (achievement.unlocked) {
                newHTML=newHTML+"<img class=\"achievementImg\" wdith=\"100\" height=\"100\" src=\""+result+"\">";
            } else {
                newHTML=newHTML+"<img class=\"achievementImg unobtainedAchImg\" wdith=\"100\" height=\"100\" src=\""+result+"\">";
            }
            newHTML=newHTML+"<span class=\"achievementName\">"+achievement.name+"</span>";
            newHTML=newHTML+"<span class=\"achievementDesc\">"+achievement.description+"</span>";
            if (achievement.unlocked) {
                newHTML=newHTML+"<span class=\"achievementDate\">"+convertDate(achievement.unlockDate)+"</span>";
            } else {
                newHTML=newHTML+"<span class=\"achievementDate\">Unobtained</span>";
            }
            newHTML=newHTML+"<button id=\"achievementEdit\" onclick=\"initialize.setView(initialize.views.editAchievementView, "
            newHTML=newHTML+idx;
            newHTML=newHTML+")\">Edit</button>";
            newHTML=newHTML+"</li>";
            this.myHTML=newHTML;
            document.getElementById("achievementList").innerHTML=document.getElementById("achievementList").innerHTML+this.myHTML;
        });
    }
}