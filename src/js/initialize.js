import { Game } from './game.js';
import {GameViewer} from './views/gameViewer.js';
import { AchievementSetViewer } from './views/achievementSetViewer.js';
import { AchievementViewer } from './views/achievementViewer.js';

export class initialize {
    /**
     * @type {object[]}
     */
    gamesJson;

    views = {
        gamesView: "GamesView",
        achievementSetsView: "AchievementSetsView",
        achievementsView: "AchievementsView"
    };

    currentState=this.views.gamesView;
    previousState="";
    previousIdx=0;
    currentIdx=0;

    /**
     * @returns {void}
     */
    main() {
        window.resources.getJson("games.json").then((result)=>{
            this.gamesJson=JSON.parse(result);
        }).then(()=>{
            this.init();
        }).catch((err)=> {
            console.error("Failed to read games.json!",err);
        });
    }

    /**
     * @returns {void}
     */
    init() {
        if (this.gamesJson.length==undefined) {
            console.error("Games.json is not an array!");
            return;
        }
        for (let i=0;i<this.gamesJson.length;i++) {
            //add a new game
            this.myGames.push(new Game(this.gamesJson[i].name, this.gamesJson[i].img, this.gamesJson[i].platform));
            let jsonName=this.gamesJson[i].jsonName;
            window.resources.getJson(jsonName).then((result)=>{
                this.initGame(JSON.parse(result), i);
            }).catch((err)=> {
                console.error("Failed to read "+jsonName+"!");
            });
        }
        new GameViewer(this.myGames);
    }

    /**
     * @param {object[]} game 
     */
    initGame(game, idx) {
        if (game.length==undefined) {
            console.error("JSON file is not an array!");
            return;
        }
        for (let i=0;i<game.length;i++) {
            this.myGames.at(idx).addAchievementSet(game[i].name,game[i].image);
            for (let j=0;j<game[i].achievements.length;j++) {
                //console.log("i=",i);
                //console.log("Adding to achievement set ",this.myGames.at(-1).achievementSets[i]);
                this.myGames.at(idx).addAchievementByIndex(i,game[i].achievements[j].name,game[i].achievements[j].description,game[i].achievements[j].img,game[i].achievements[j].unlocked,game[i].achievements[j].unlockDate);
            }
        }
    }
    /**
    * @type {Game[]}
    */
    myGames = [];


    /**
     * @param {string} view 
     * @param {number} idx 
     */
    setView(view, idx=0) {
        console.log("Setting view to ",view);
        switch (view) {
            case this.views.gamesView: 
                this.previousState="";
                new GameViewer(this.myGames);
                break;
            case this.views.achievementSetsView:
                this.previousState=this.views.gamesView;
                new AchievementSetViewer(this.myGames[idx].achievementSets);
                break;
            case this.views.achievementsView:
                this.previousState=this.views.achievementSetsView;
                this.previousIdx=this.currentIdx;
                new AchievementViewer(this.myGames[this.currentIdx].achievementSets[idx].achievements);
                break;
        }
        this.currentIdx=idx;
        this.currentState=view;
    }
}


if (typeof window!=undefined) {
    window.initialize=new initialize();
}