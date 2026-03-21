import {GameHolder} from '../HTMLElements/gameHolder.js';
import { windowAPI } from '../APIThroughWindow.js';
import { Game } from '../game.js';
export class GameViewer {
    constructor(gamesArray) {
        let gamesList = document.createElement('ul');
        gamesList.id="gamesList";
        let addGameButton = document.createElement('button');
        addGameButton.innerHTML="Add a game";
        addGameButton.addEventListener('click', ()=>{
            windowAPI.viewManager.setView(windowAPI.viewManager.views.addGameView,0);
        });
        let gameViewerSorting = document.createElement('select');
        gameViewerSorting.id="gameViewerSorting";
        
        let sortOption=document.createElement('option');
        sortOption.value="Alphabetical Ascending";
        sortOption.innerHTML="Alphabetical (Ascending)";
        gameViewerSorting.appendChild(sortOption);

        sortOption=document.createElement('option');
        sortOption.value="Alphabetical Descending";
        sortOption.innerHTML="Alphabetical (Descending)";
        gameViewerSorting.appendChild(sortOption);

        sortOption=document.createElement('option');
        sortOption.value="Last Obtained Achievement Date Ascending";
        sortOption.innerHTML="Last Obtained Achievement Date (Ascending)";
        gameViewerSorting.appendChild(sortOption);

        sortOption=document.createElement('option');
        sortOption.value="Last Obtained Achievement Date Descending";
        sortOption.innerHTML="Last Obtained Achievement Date (Descending)";
        gameViewerSorting.appendChild(sortOption);

        sortOption=document.createElement('option');
        sortOption.value="Percentage Ascending";
        sortOption.innerHTML="Percentage (Ascending)";
        gameViewerSorting.appendChild(sortOption);

        sortOption=document.createElement('option');
        sortOption.value="Percentage Descending";
        sortOption.innerHTML="Percentage (Descending)";
        gameViewerSorting.appendChild(sortOption);

        //set the default value
        gameViewerSorting.value=windowAPI.currentSort;
        //add event listener to sort games
        gameViewerSorting.addEventListener('change', function(event) {
            windowAPI.currentSort = document.getElementById("gameViewerSorting").value;
            windowAPI.sortGames();
        });
        
        document.getElementById("content").appendChild(gamesList);
        document.getElementById("content").appendChild(addGameButton);
        document.getElementById("content").appendChild(gameViewerSorting);
        for (let i=0;i<gamesArray.length;i++) {
            new GameHolder(gamesArray[i], i, gamesList);
        }

    }
}