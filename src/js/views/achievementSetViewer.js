import {AchievementSetHolder} from '../HTMLElements/achievementSetHolder.js'
export class AchievementSetViewer {
    constructor(achievementSetArray) {
        let HTML = document.createElement('ul');
        HTML.id='achievementSetsList';
        for (let i=0;i<achievementSetArray.length;i++) {
            new AchievementSetHolder(achievementSetArray[i], i, HTML);
        }
        document.getElementById("content").appendChild(HTML);
    }
}