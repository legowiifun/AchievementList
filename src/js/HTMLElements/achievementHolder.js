import { Achievement } from "../achievement.js";
import { getCompletePath, convertDate } from "../utils.js";
import { windowAPI } from "../APIThroughWindow.js"
export class AchievementHolder {
    myHTML;
    achievement;
    /**
     * 
     * @param {Achievement} achievement
     * @param {number} idx 
     * @param {HTMLUListElement} parentElement 
     */
    constructor(achievement, idx, parentElement) {
        this.achievement=achievement;
        let achievementEntry = document.createElement('li');
        achievementEntry.classList.add("achievementEntry");
        getCompletePath(achievement.img).then((result)=>{
            let achievementImg = document.createElement('img');
            achievementImg.height=100;
            achievementImg.width=100;
            achievementImg.src=result;
            achievementImg.classList.add("achievementImg");
            if (!achievement.unlocked) {
                achievementImg.classList.add("unobtainedAchImg");
            }
            achievementEntry.appendChild(achievementImg);

            let achievementName = document.createElement('span');
            achievementName.classList.add("achievementName");
            achievementName.innerHTML=achievement.name;
            achievementEntry.appendChild(achievementName);

            let achievementDesc = document.createElement('span');
            achievementDesc.classList.add("achievementDesc");
            achievementDesc.innerHTML=achievement.description;
            achievementEntry.appendChild(achievementDesc);
            
            let achievementDate = document.createElement('span');
            achievementDate.classList.add("achievementDate");
            if (achievement.unlocked) {
                achievementDate.innerHTML=convertDate(achievement.unlockDate,0);
            } else {
                achievementDate.innerHTML="Unobtained";
            }
            achievementEntry.appendChild(achievementDate);

            

            let achievementEdit = document.createElement('button');
            achievementEdit.id="achievementEdit";
            achievementEdit.innerHTML="Edit";
            achievementEdit.addEventListener('click', ()=> {
                windowAPI.viewManager.setView(windowAPI.viewManager.views.editAchievementView, idx);
            });
            achievementEntry.appendChild(achievementEdit);

            parentElement.appendChild(achievementEntry);
        });
    }
}