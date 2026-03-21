import { editJson } from "../utils.js";
import { Achievement } from "../achievement.js";
import { windowAPI } from "../APIThroughWindow.js";

export class EditAchievementView {
    /**
    * @param {Achievement} achievement
    */
    constructor(achievement) {
        let newHTML="<p> Date: ";
            newHTML=newHTML+"<input type=\"datetime-local\" id=\"editAchievementDate\">";
        newHTML=newHTML+"</p>";
        newHTML=newHTML+"<p> Obtained?: ";
            newHTML=newHTML+"<input type=\"checkbox\" id=\"editAchievementCheckbox\">";
        newHTML=newHTML+"</p>";
        newHTML=newHTML+"<button id=\"achievementSaveBtn\""
            newHTML=newHTML+">DONE</button>";
        document.getElementById("content").innerHTML=newHTML;
        
        //add the event listener to the button
        document.getElementById("achievementSaveBtn").addEventListener("click",()=> {
            let newDate=new Date(document.getElementById("editAchievementDate").value);
            let newUnlocked=document.getElementById("editAchievementCheckbox").checked;
            if (newUnlocked) {
                if (!isNaN(newDate.getTime())) {
                    achievement.unlockDate=newDate;
                    achievement.unlocked=newUnlocked;
                    editJson(achievement.achievementSet.game.saveJSONLocation,achievement.achievementSet.game.createSaveJSON());
                    windowAPI.viewManager.setView(windowAPI.viewManager.views.achievementsView, windowAPI.viewManager.achievementSetIdx);
                } else {

                }
            } else {
                achievement.unlocked=newUnlocked;
                achievement.unlockDate=undefined;
                editJson(achievement.achievementSet.game.saveJSONLocation,achievement.achievementSet.game.createSaveJSON());
                windowAPI.viewManager.setView(windowAPI.viewManager.views.achievementsView, windowAPI.viewManager.achievementSetIdx);
            }
        });
    }
}