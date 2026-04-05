import { AchievementSet } from "../achievementSet.js";
import { getCompletePath } from "../utils.js";
export class AchievementSetHolder {
    myHTML;
    /**
     * 
     * @param {AchievementSet} achievementSet 
     * @param {number} idx
     * @param {HTMLUListElement} parentElement  
     */
    constructor(achievementSet, idx, parentElement) {
        let achievementSetEntry=document.createElement('li');
        achievementSetEntry.classList.add("achievementSetEntry");
        achievementSetEntry.classList.add("displayHolder");
        achievementSetEntry.addEventListener('click', ()=> {
            window.app.viewManager.setView(window.app.viewManager.views.achievementsView, idx);
        })

        getCompletePath(achievementSet.img).then((result)=>{
            let setImg=document.createElement('img');
            setImg.height=100;
            setImg.width=100;
            setImg.src=result;
            setImg.classList.add("setImg");
            achievementSetEntry.appendChild(setImg);

            let setName = document.createElement('span');
            setName.classList.add("setName");
            setName.innerText=achievementSet.name;
            achievementSetEntry.appendChild(setName);

            let percent = document.createElement('span');
            percent.classList.add("percent");
            percent.innerText=achievementSet.getPercentageCompleted()+"%";
            achievementSetEntry.appendChild(percent);

            parentElement.appendChild(achievementSetEntry);
        });
    }
}