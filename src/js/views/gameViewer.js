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
            let val = document.getElementById("gameViewerSorting").value;
            windowAPI.currentSort=val;
            windowAPI.myGames.sort(
                /**
                 * @param {Game} a 
                 * @param {Game} b 
                 */
                (a, b)=> {
                
                    switch(val){
                        case "Alphabetical Ascending":{
                            let nameA=a.name.toLowerCase();
                            let nameB=b.name.toLowerCase();
                            if (nameA<nameB) {
                                return -1;
                            }
                            if (nameA>nameB) {
                                return 1;
                            }
                            //nameA==nameB
                            let platA=a.platform.toLowerCase();
                            let platB=b.platform.toLowerCase();
                            if (platA<platB) {
                                return -1;
                            }
                            if (platA>platB) {
                                return 1;
                            }
                            //name and platform are the same
                            return 0;
                            break;
                        }
                        case "Alphabetical Descending":{
                            let nameA=a.name.toLowerCase();
                            let nameB=b.name.toLowerCase();
                            if (nameA<nameB) {
                                return 1;
                            }
                            if (nameA>nameB) {
                                return -1;
                            }
                            //nameA==nameB
                            let platA=a.platform.toLowerCase();
                            let platB=b.platform.toLowerCase();
                            if (platA<platB) {
                                return 1;
                            }
                            if (platA>platB) {
                                return -1;
                            }
                            //name and platform are the same
                            return 0;
                            break;
                        }
                        case "Last Obtained Achievement Date Ascending":{
                            //if a is before b
                            if (a.getLastCompletedAchievementDate().getTime()<b.getLastCompletedAchievementDate().getTime()) {
                                return 1;
                            }
                            if (a.getLastCompletedAchievementDate().getTime()>b.getLastCompletedAchievementDate().getTime()) {
                                return -1;
                            }
                            return 0;
                        }
                        case "Last Obtained Achievement Date Descending":{
                            //if a is before b
                            if (a.getLastCompletedAchievementDate().getTime()<b.getLastCompletedAchievementDate().getTime()) {
                                return -1;
                            }
                            if (a.getLastCompletedAchievementDate().getTime()>b.getLastCompletedAchievementDate().getTime()) {
                                return 1;
                            }
                            return 0;
                        }
                        case "Percentage Ascending":{
                            if (a.getPercentageCompleted()<b.getPercentageCompleted()) {
                                return 1;
                            }
                            if (a.getPercentageCompleted()>b.getPercentageCompleted()) {
                                return -1;
                            }
                        }
                        case "Percentage Descending":{
                            if (a.getPercentageCompleted()<b.getPercentageCompleted()) {
                                return -1;
                            }
                            if (a.getPercentageCompleted()>b.getPercentageCompleted()) {
                                return 1;
                            }
                        }
                    }
                }
            );
            windowAPI.viewManager.setView(windowAPI.viewManager.views.gamesView,0, true);
        });
    }
}