import { Initialize } from "./initialize.js";
import { ViewManager } from "./viewManager.js";

/**
 * Exports an API to the window
 * This is accessible through devtools
 */
export class APIThroughWindow {
    viewManager = new ViewManager();
    initJSON = new Initialize();
    /**
    * @type {Game[]}
    */
    myGames = [];
    /**
     * ObjToAdd has parameters jsonName, platform, save
     * Is added to the JSON
     * For a downloading system
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
}
/**
 * export a singleton for better syntax highlighting in other files
 * @type {APIThroughWindow}
 */
export let windowAPI = new APIThroughWindow();
if (typeof window!=undefined) {
    window.app=windowAPI;
}