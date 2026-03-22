import { editJson } from "../utils.js";
import { Achievement } from "../achievement.js";
import { windowAPI } from "../APIThroughWindow.js";

export class EditAchievementView {
    /**
    * @param {Achievement} achievement
    */
    constructor(achievement) {

        /*let newHTML="<p> Date: ";
            newHTML=newHTML+"<input type=\"datetime-local\" id=\"editAchievementDate\">";
        newHTML=newHTML+"</p>";
        newHTML=newHTML+"<p> Obtained?: ";
            newHTML=newHTML+"<input type=\"checkbox\" id=\"editAchievementCheckbox\">";
        newHTML=newHTML+"</p>";
        newHTML=newHTML+"<button id=\"achievementSaveBtn\""
            newHTML=newHTML+">DONE</button>";
        document.getElementById("content").innerHTML=newHTML;*/
        
        let dateParagraph=document.createElement('p');
        dateParagraph.innerHTML="Date: ";
        let editAchievementdate=document.createElement('input');
        editAchievementdate.type="datetime-local";
        editAchievementdate.id="editAchievementDate";
        dateParagraph.appendChild(editAchievementdate);
        document.getElementById("content").appendChild(dateParagraph);

        let checkboxParagraph=document.createElement('p');
        checkboxParagraph.innerHTML="Date: ";
        let editAchievementCheckbox=document.createElement('input');
        editAchievementCheckbox.type="checkbox";
        editAchievementCheckbox.id="editAchievementCheckbox";
        checkboxParagraph.appendChild(editAchievementCheckbox);
        document.getElementById("content").appendChild(checkboxParagraph);

        let achievementSaveBtn = document.createElement('button');
        achievementSaveBtn.id="achievementSaveBtn";
        achievementSaveBtn.innerHTML="DONE";

        //add the event listener to the button
        achievementSaveBtn.addEventListener("click",()=> {
            let newDate=new Date(editAchievementdate.value);
            let newUnlocked=editAchievementCheckbox.checked;
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
        document.getElementById("content").appendChild(achievementSaveBtn);
    }
}