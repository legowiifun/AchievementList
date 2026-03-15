import {GameHolder} from '../HTMLElements/gameHolder.js'
export class GameViewer {
    constructor(gamesArray) {
        let HTML = "<ul id=\"gamesList\"></ul>";
        document.getElementById("content").innerHTML=HTML;
        for (let i=0;i<gamesArray.length;i++) {
            new GameHolder(i);
        }
    }
}