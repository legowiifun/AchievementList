import { AchievementSet } from "../achievementSet.js";
import { getCompletePath } from "../utils.js";
export class AchievementSetHolder {
    myHTML;
    /**
     * 
     * @param {AchievementSet} achievementSet 
     */
    constructor(achievementSet, idx) {
        let newHTML = "<li class=\"achievementSetEntry\" onClick=\"window.app.viewManager.setView(window.app.viewManager.views.achievementsView, "+idx+");\">";
        getCompletePath(achievementSet.img).then((result)=>{
            newHTML=newHTML+"<img class=\"setImg\" wdith=\"100\" height=\"100\" src=\""+result+"\">";
            newHTML=newHTML+"<span class=\"setName\">"+achievementSet.name+"</span>";
            newHTML=newHTML+"<span class=\"percent\" id=\""+achievementSet.name+"Percent\">"+achievementSet.getPercentageCompleted()+"%</span>";
            newHTML=newHTML+"</li>";
            this.myHTML=newHTML;
            document.getElementById("achievementSetsList").innerHTML=document.getElementById("achievementSetsList").innerHTML+this.myHTML;
        });
    }
}