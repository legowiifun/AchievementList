import { Initialize } from "./initialize.js";
import { ViewManager } from "./viewManager.js";

/**
 * Exports an API to the window
 * This is accessible through devtools
 */
export class APIThroughWindow {
    constructor() {
        document.getElementById("backButton").addEventListener('click',()=> {
            this.viewManager.setView(window.app.viewManager.previousState, window.app.viewManager.previousIdx);
        });
    }

    viewManager = new ViewManager();
    initJSON = new Initialize();
    /**
    * @type {Game[]}
    */
    myGames = [];
    currentSort="Alphabetical Ascending";
    /**
     * @returns {string}
     */
    createGamesJSON() {
        let newGamesJSON=[];
        for (let i=0;i<this.myGames.length;i++) {
            let newGamesObj={};
            newGamesObj.jsonName=this.myGames[i].gameJSONLocation;
            newGamesObj.platform=this.myGames[i].platform;
            newGamesObj.save=this.myGames[i].saveJSONLocation;
            newGamesJSON.push(newGamesObj);
        }
        return JSON.stringify(newGamesJSON);
    }

    sortGames(refreshAfter=true) {
        console.log("Sorting games with algorithm: ",this.currentSort, this.myGames);
        this.myGames.sort(
            /**
             * @param {Game} a 
             * @param {Game} b 
             */
            (a, b)=> {
                
                switch(this.currentSort){
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
                        let aCompleted=a.getLastCompletedAchievementDate();
                        let bCompleted=b.getLastCompletedAchievementDate();
                        let aTime;
                        if (aCompleted==undefined) {
                            aTime=0;
                        } else {
                            aTime=aCompleted.getTime();
                        }
                        let bTime;
                        if (bCompleted==undefined) {
                            bTime=0;
                        } else {
                            bTime=bCompleted.getTime();
                        }
                        if (aTime<bTime) {
                            return 1;
                        }
                        if (aTime>bTime) {
                            return -1;
                        }
                        return 0;
                    }
                    case "Last Obtained Achievement Date Descending":{
                        //if a is after b
                        let aCompleted=a.getLastCompletedAchievementDate();
                        let bCompleted=b.getLastCompletedAchievementDate();
                        let aTime;
                        if (aCompleted==undefined) {
                            aTime=0;
                        } else {
                            aTime=aCompleted.getTime();
                        }
                        let bTime;
                        if (bCompleted==undefined) {
                            bTime=0;
                        } else {
                            bTime=bCompleted.getTime();
                        }
                        if (aTime<bTime) {
                            return -1;
                        }
                        if (aTime>bTime) {
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
        if (refreshAfter) {
            this.viewManager.setView(this.viewManager.views.gamesView,0, true);
        }
    }
    
}
/**
 * export a singleton for better syntax highlighting in other files
 * @type {APIThroughWindow}
 */
export let windowAPI;

if (typeof window!=undefined) {
    windowAPI = new APIThroughWindow();
    window.app=windowAPI;
    window.addEventListener("DOMContentLoaded",()=> {
        windowAPI.initJSON.main();
    });
}