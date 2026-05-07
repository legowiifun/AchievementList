import { Game } from "../game.js";
export class GameHolder {
    myHTML;
    /**
     * 
     * @param {Game} game 
     * @param {number} idx 
     * @param {HTMLUListElement} parentElement 
     */
    constructor(game, idx, parentElement) {
        let gameEntry = document.createElement('li');
        gameEntry.addEventListener('click', ()=> {
            window.app.viewManager.setView(window.app.viewManager.views.achievementSetsView, idx);
        });
        gameEntry.classList.add("gameEntry");
        gameEntry.classList.add("displayHolder");
        let gameImg = document.createElement('img');
        gameImg.height=100;
        gameImg.classList.add("gameImg");
        gameImg.src=game.img;
        gameEntry.appendChild(gameImg);

        let gameName=document.createElement('span');
        gameName.classList.add("gameName");
        gameName.innerText=game.name;
        gameEntry.appendChild(gameName);

        let platform=document.createElement('span');
        platform.classList.add("platform");
        platform.innerText=game.platform;
        gameEntry.appendChild(platform);

        let percent=document.createElement('span');
        percent.classList.add("percent");
        percent.innerText=game.getPercentageCompleted()+"%";
        gameEntry.appendChild(percent);
    
        parentElement.appendChild(gameEntry);
    }
}