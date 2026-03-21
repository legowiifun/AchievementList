import {GameHolder} from '../HTMLElements/gameHolder.js'
export class GameViewer {
    constructor(gamesArray) {
        let HTML = "<ul id=\"gamesList\"></ul>";
        HTML+="<button onclick=\"initialize.setView(initialize.views.addGameView, 0);\">Add a game</button>"
        document.getElementById("content").innerHTML=HTML;
        for (let i=0;i<gamesArray.length;i++) {
            new GameHolder(gamesArray[i], i);
        }
    }
}