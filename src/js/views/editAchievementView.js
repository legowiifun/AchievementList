import { editJson } from "../utils.js";
import { Achievement } from "../achievement.js";

export class EditAchievementView {
    /**
    * @param {Achievement} achievement
    */
    constructor(achievement) {
        let newHTML="<form>"
            newHTML=newHTML+"<p> Date: ";
                newHTML=newHTML+"<input type=\"date\" id=\"editAchievementDate\">";
            newHTML=newHTML+"</p>";
            newHTML=newHTML+"<p> Obtained?: ";
                newHTML=newHTML+"<input type=\"checkbox\" id=\"editAchievementCheckbox\">";
            newHTML=newHTML+"</p>";
            newHTML=newHTML+"<button id=\"achievementEditBtn\""
                newHTML=newHTML+">DONE</button>";
        newHTML=newHTML+"</form>";
        document.getElementById("content").innerHTML=newHTML;
        
        //add the event listener to the button
        document.getElementById("achievementEditBtn").addEventListener("click",()=> {
            achievement.unlockDate=document.getElementById("editAchievementDate").valueAsDate;
            achievement.unlocked=document.getElementById("editAchievementCheckbox").checked;
            editJson(achievement.achievementSet.game.saveJSONLocation,achievement.achievementSet.game.createSaveJSON());
            window.initialize.setView(window.initialize.views.achievementsView, window.initialize.achievementIdx);
        });
    }
}