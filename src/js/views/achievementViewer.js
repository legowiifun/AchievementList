import {AchievementHolder} from '../HTMLElements/achievementHolder.js'
export class AchievementViewer {
    constructor(achievementArray) {
        let HTML = "<ul id=\"achievementList\"></ul>";
        document.getElementById("content").innerHTML=HTML;
        for (let i=0;i<achievementArray.length;i++) {
            new AchievementHolder(achievementArray[i], i);
        }
    }
}