import {GameHolder} from '../HTMLElements/gameHolder.js';
import { windowAPI } from '../APIThroughWindow.js';
import { Game } from '../game.js';
export class GameViewer {
    constructor(gamesArray) {
        let HTML = "<ul id=\"gamesList\"></ul>";
        HTML+="<button onclick=\"window.app.viewManager.setView(window.app.viewManager.views.addGameView, 0);\">Add a game</button>"

        //sorting
        //options - last obtained achievement (ascending or descending), alphabetical
        HTML+="<select id=\"gameViewerSorting\">";
            HTML+="<option value=\"Alphabetical Ascending\">Alphabetical (Ascending)</option>";
            HTML+="<option value=\"Alphabetical Descending\">Alphabetical (Descending)</option>";
            HTML+="<option value=\"Last Obtained Achievement Date Ascending\">Last Obtained Achievement Date (Ascending)</option>";
            HTML+="<option value=\"Last Obtained Achievement Date Descending\">Last Obtained Achievement Date (Descending)</option>";
            HTML+="<option value=\"Percentage Ascending\">Percentage (Ascending)</option>";
            HTML+="<option value=\"Percentage Descending\">Percentage (Descending)</option>";
        HTML+="</select>";

        document.getElementById("content").innerHTML=HTML;
        for (let i=0;i<gamesArray.length;i++) {
            new GameHolder(gamesArray[i], i);
        }
        //set the default value
        document.getElementById("gameViewerSorting").value=windowAPI.currentSort;
        //add event listener to sort games
        document.getElementById("gameViewerSorting").addEventListener('change', function(event) {
            windowAPI.currentSort = document.getElementById("gameViewerSorting").value;
            windowAPI.sortGames();
        });
    }
}