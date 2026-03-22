import {AchievementHolder} from '../HTMLElements/achievementHolder.js'
export class AchievementViewer {
    constructor(achievementArray) {
        let achievementList = document.createElement('ul');
        achievementList.id="achievementList";
        for (let i=0;i<achievementArray.length;i++) {
            new AchievementHolder(achievementArray[i], i,achievementList);
        }
        document.getElementById("content").appendChild(achievementList);
    }
}