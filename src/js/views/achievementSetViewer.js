import {AchievementSetHolder} from '../HTMLElements/achievementSetHolder.js'
export class AchievementSetViewer {
    constructor(achievementSetArray) {
        let HTML = "<ul id=\"achievementSetsList\"></ul>";
        document.getElementById("content").innerHTML=HTML;
        for (let i=0;i<achievementSetArray.length;i++) {
            new AchievementSetHolder(achievementSetArray[i]);
        }
    }
}