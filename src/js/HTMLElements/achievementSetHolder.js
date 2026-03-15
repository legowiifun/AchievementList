import { AchievementSet } from "../achievementSet.js";
export class AchievementSetHolder {
    myHTML;
    /**
     * 
     * @param {AchievementSet} achievementSet 
     */
    constructor(achievementSet) {
        let newHTML = "<li>";
        window.resources.getCompletePath(achievementSet.img).then((result)=>{
            newHTML=newHTML+"<img wdith=\"100\" height=\"100\" src=\""+result+"\">";
            newHTML=newHTML+"<span class=\"setName\">"+achievementSet.name+"</span>";
            newHTML=newHTML+"<span class=\"percent\" id=\""+achievementSet.name+"Percent\">"+achievementSet.getPercentageCompleted()+"%</span>";
            newHTML=newHTML+"</li>";
            this.myHTML=newHTML;
            document.getElementById("achievementSetsList").innerHTML=document.getElementById("achievementSetsList").innerHTML+this.myHTML;
        });
    }
}