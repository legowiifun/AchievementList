import { editJson } from "../utils.js";
import { Achievement } from "../achievement.js";
import { windowAPI } from "../APIThroughWindow.js";

export class EditAchievementView {
    /**
    * @param {Achievement} achievement
    */
    constructor(achievement) {
        let dateParagraph=document.createElement('p');
        dateParagraph.innerHTML="Date: ";
        let editAchievementdate=document.createElement('input');
        editAchievementdate.type="datetime-local";
        editAchievementdate.id="editAchievementDate";
        dateParagraph.appendChild(editAchievementdate);
        document.getElementById("content").appendChild(dateParagraph);

        let checkboxParagraph=document.createElement('p');
        checkboxParagraph.innerHTML="Unlocked: ";
        let editAchievementCheckbox=document.createElement('input');
        editAchievementCheckbox.type="checkbox";
        editAchievementCheckbox.id="editAchievementCheckbox";
        checkboxParagraph.appendChild(editAchievementCheckbox);
        document.getElementById("content").appendChild(checkboxParagraph);
        let editAchievementOutofInput=undefined;
        if (achievement.outOf!=undefined) {
            let outOfParagraph=document.createElement('p');
            outOfParagraph.innerHTML="Completed out of: ";
            editAchievementOutofInput=document.createElement('input');
            editAchievementOutofInput.type="number";
            editAchievementOutofInput.id="editAchievementOutofInput";
            outOfParagraph.appendChild(editAchievementOutofInput);
            document.getElementById("content").appendChild(outOfParagraph);
        }

        let achievementSaveBtn = document.createElement('button');
        achievementSaveBtn.id="achievementSaveBtn";
        achievementSaveBtn.innerHTML="DONE";

        //add the event listener to the button
        achievementSaveBtn.addEventListener("click",()=> {
            let newDate=new Date(editAchievementdate.value);
            let newUnlocked=editAchievementCheckbox.checked;
            let newOutOf=editAchievementOutofInput.valueAsNumber;
            if (newUnlocked) {
                if (!isNaN(newDate.getTime())&&(!isNaN(newOutOf)||achievement.outOf==undefined)) {
                    achievement.unlockDate=newDate;
                    achievement.unlocked=newUnlocked;
                    achievement.doneOutOf=newOutOf;
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