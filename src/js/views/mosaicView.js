import { Game } from "../game.js";
import { windowAPI } from '../APIThroughWindow.js';
export class MosaicViewer {
    /**
     * 
     * @param {Game[]} gamesArray 
     */
    constructor(gamesArray) {
        //platform filter
        
        //percentage threshold/have plat

        //number of columns/automatic fit

        //create mosaic button

        // canvas
        let canvasElement = document.createElement('canvas');
        
        windowAPI.mainContent.appendChild(canvasElement);
        
    }

    /**
     * @param {Game} game 
     * @return {HTMLImageElement}
     */
    createImgTag(game) {
        let imgTag = document.createElement("img");
        imgTag.src=game.platImg;
        
        return imgTag;
    }
}