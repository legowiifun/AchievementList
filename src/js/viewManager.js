import { AddGameViewer } from './views/addGameViewer.js';
import {GameViewer} from './views/gameViewer.js';
import { AchievementSetViewer } from './views/achievementSetViewer.js';
import { AchievementViewer } from './views/achievementViewer.js';
import { EditAchievementView } from './views/editAchievementView.js';
import { windowAPI } from './APIThroughWindow.js';
import { SelectJSONView } from './views/JSONEditing/selectJSONView.js';
import { editGamesJSONView } from './views/JSONEditing/editGamesJSONView.js';
import { editGameJSONView } from './views/JSONEditing/editGameJSONView.js';
import { editSaveJSONView } from './views/JSONEditing/editSaveJSONView.js';
import { MosaicViewer } from './views/mosaicView.js';
/**
 * Handles switching between different application views
 */
export class ViewManager {
    views = {
        gamesView: "GamesView",
        achievementSetsView: "AchievementSetsView",
        achievementsView: "AchievementsView",
        editAchievementView: "EditAchievementView",
        addGameView: "AddGameView",
        selectJSONView: "SelectJSONView",
        editGamesJSONView: "editGamesJSONView",
        editGameJSONView: "editGameJSONView",
        editSaveJSONView: "editSaveJSONView",
        mosaicView: "mosaicView"
    };
    currentState="";
    previousState="";
    previousIdx=0;
    currentIdx=0;
    gameIdx=0;
    achievementSetIdx=0;
    achievementIdx=0;
    
    gameScrollPos=0;
    achievementSetScrollPos=0;
    achievementScrollPos=0;

    JSONSelectionPath="";

    /**
     * @param {string} view 
     * @param {number} idx
     * @param {boolean} refresh
     */
    setView(view, idx=0, refresh=false) {
        if (this.currentState==view&&!refresh) {
            return;
        }
        if (this.currentState==this.views.gamesView) {
            this.gameScrollPos=windowAPI.mainContent.scrollTop;
        }
        else if (this.currentState==this.views.achievementSetsView) {
            this.achievementSetScrollPos=windowAPI.mainContent.scrollTop;
        }
        else if (this.currentState==this.views.achievementsView) {
            this.achievementScrollPos=windowAPI.mainContent.scrollTop;
        }
        document.getElementById('content').innerHTML="";
        document.getElementById("sideBar").innerHTML="";
        if (windowAPI.viewConsoleLogs) {
            console.log("Setting view to ",view, idx);
        }
        document.getElementById("backButton").removeAttribute("hidden");
        switch (view) {
            case this.views.gamesView: 
                document.getElementById("backButton").setAttribute("hidden",true);
                this.previousState="";
                new GameViewer(windowAPI.myGames);
                if (this.currentState==this.views.achievementSetsView) {
                    windowAPI.mainContent.scrollTo(0,this.gameScrollPos);
                } else {
                    windowAPI.mainContent.scrollTo(0,0);
                }
                break;
            case this.views.achievementSetsView:
                this.gameIdx=idx;
                this.previousState=this.views.gamesView;
                new AchievementSetViewer(windowAPI.myGames[idx].achievementSets);
                if (this.currentState==this.views.achievementsView) {
                    windowAPI.mainContent.scrollTo(0,this.achievementSetScrollPos);
                } else {
                    windowAPI.mainContent.scrollTo(0,0);
                }
                break;
            case this.views.achievementsView:
                this.achievementSetIdx=idx;
                this.previousState=this.views.achievementSetsView;
                this.previousIdx=this.gameIdx;
                new AchievementViewer(windowAPI.myGames[this.gameIdx].achievementSets[idx].achievements);
                if (this.currentState==this.views.editAchievementView) {
                    windowAPI.mainContent.scrollTo(0,this.achievementScrollPos);
                } else {
                    windowAPI.mainContent.scrollTo(0,0);
                }
                break;
            case this.views.editAchievementView:
                this.achievementIdx=idx;
                this.previousState=this.views.achievementsView;
                this.previousIdx=this.achievementSetIdx;
                new EditAchievementView(windowAPI.myGames[this.gameIdx].achievementSets[this.achievementSetIdx].achievements[idx]);
                windowAPI.mainContent.scrollTo(0,0);
                break;
            case this.views.addGameView:
                this.previousState=this.views.gamesView;
                new AddGameViewer();
                windowAPI.mainContent.scrollTo(0,0);
                break;
            case this.views.selectJSONView:
                document.getElementById("backButton").setAttribute("hidden",true);
                this.previousState="";
                new SelectJSONView();
                windowAPI.mainContent.scrollTo(0,0);
                break;
            case this.views.editGamesJSONView:
                this.previousState=this.views.selectJSONView;
                new editGamesJSONView(this.JSONSelectionPath);
                windowAPI.mainContent.scrollTo(0,0);
                break;
            case this.views.editGameJSONView:
                this.previousState=this.views.selectJSONView;
                new editGameJSONView(this.JSONSelectionPath);
                windowAPI.mainContent.scrollTo(0,0);
                break;
            case this.views.editSaveJSONView:
                this.previousState=this.views.selectJSONView;
                new editSaveJSONView(this.JSONSelectionPath);
                windowAPI.mainContent.scrollTo(0,0);
                break;
            case this.views.mosaicView:
                document.getElementById("backButton").setAttribute("hidden",true);
                this.previousState="";
                new MosaicViewer(windowAPI.myGames);
                windowAPI.mainContent.scrollTo(0,0);
                break;
        }
        this.currentIdx=idx;
        this.currentState=view;
    }
}