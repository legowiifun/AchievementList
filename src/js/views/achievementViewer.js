import { Achievement } from "../achievement.js";
import { getCompletePath, convertDate } from "../utils.js";
import { windowAPI } from "../APIThroughWindow.js"

export class AchievementViewer {
    constructor(achievementArray) {
        let achievementList = document.createElement('ul');
        achievementList.id="achievementList";
        for (let i=0;i<achievementArray.length;i++) {
            //new AchievementHolder(achievementArray[i], i,achievementList);
            achievementList.appendChild(this.createAchievementHolder(achievementArray[i],i));
        }
        document.getElementById("content").appendChild(achievementList);
    }
    /**
     * 
     * @param {Achievement} achievement 
     * @param {int} idx 
     * @returns 
     */
    createAchievementHolder(achievement, idx) {
        this.achievement=achievement;
        let achievementEntry = document.createElement('li');
        achievementEntry.classList.add("achievementEntry");
        achievementEntry.classList.add("displayHolder");
        if (achievement.hidden&&!achievement.unlocked) {
            let achievementImg = document.createElement('img');
            achievementImg.height=100;
            achievementImg.src="../Default Resources/Hidden Achievement.png";
            achievementImg.classList.add("achievementImg");
            achievementEntry.appendChild(achievementImg);

            let achievementName = document.createElement('span');
            achievementName.classList.add("achievementName");
            achievementName.innerText="Hidden";
            achievementEntry.appendChild(achievementName);

            let achievementDesc = document.createElement('span');
            achievementDesc.classList.add("achievementDesc");
            achievementDesc.innerText="Hidden";
            achievementEntry.appendChild(achievementDesc);
            
            let achievementDate = document.createElement('span');
            achievementDate.classList.add("achievementDate");
            achievementDate.innerText="Unobtained";
            achievementEntry.appendChild(achievementDate);

            let showHiddenAchievement = document.createElement('button');
            let isHidden=true;
            showHiddenAchievement.id="showHidden";
            showHiddenAchievement.innerText="Show";
            showHiddenAchievement.addEventListener('click',()=> {
                isHidden=!isHidden;
                if (isHidden) {
                    achievementImg.src="../Default Resources/Hidden Achievement.png";
                    achievementImg.classList.remove("unobtainedAchImg");
                    achievementName.innerText="Hidden";
                    achievementDesc.innerText="Hidden";
                } else {
                    achievementImg.classList.add("unobtainedAchImg");
                    achievementName.innerText=achievement.name;
                    achievementDesc.innerText=achievement.description;
                    getCompletePath(achievement.img).then((result)=>{
                        achievementImg.src=result;
                    });
                }
            });
            achievementEntry.appendChild(showHiddenAchievement);

            let achievementEdit = document.createElement('button');
            achievementEdit.id="achievementEdit";
            achievementEdit.innerText="Edit";
            achievementEdit.addEventListener('click', ()=> {
                windowAPI.viewManager.setView(windowAPI.viewManager.views.editAchievementView, idx);
            });
            achievementEntry.appendChild(achievementEdit);

            return achievementEntry;
        } else {
            getCompletePath(achievement.img).then((result)=>{
                let achievementImg = document.createElement('img');
                achievementImg.height=100;
                achievementImg.src=result;
                achievementImg.classList.add("achievementImg");
                if (!achievement.unlocked) {
                    achievementImg.classList.add("unobtainedAchImg");
                }
                achievementEntry.appendChild(achievementImg);

                let achievementName = document.createElement('span');
                achievementName.classList.add("achievementName");
                achievementName.innerText=achievement.name;
                achievementEntry.appendChild(achievementName);

                let achievementDesc = document.createElement('span');
                achievementDesc.classList.add("achievementDesc");
                achievementDesc.innerText=achievement.description;
                achievementEntry.appendChild(achievementDesc);
                
                let achievementDate = document.createElement('span');
                achievementDate.classList.add("achievementDate");
                if (achievement.unlocked) {
                    achievementDate.innerText=convertDate(achievement.unlockDate,0);
                } else {
                    achievementDate.innerText="Unobtained";
                }
                achievementEntry.appendChild(achievementDate);

                

                let achievementEdit = document.createElement('button');
                achievementEdit.id="achievementEdit";
                achievementEdit.innerText="Edit";
                achievementEdit.addEventListener('click', ()=> {
                    windowAPI.viewManager.setView(windowAPI.viewManager.views.editAchievementView, idx);
                });
                achievementEntry.appendChild(achievementEdit);

                
            });
            return achievementEntry;
        }
    }
}