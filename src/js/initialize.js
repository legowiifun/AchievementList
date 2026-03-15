import { Game } from './game.js';
import {GameViewer} from './views/gameViewer.js';
import { AchievementSetViewer } from './views/achievementSetViewer.js';
import { AchievementViewer } from './views/achievementViewer.js';

export class initialize {
    /**
     * @type {object[]}
     */
    gamesJson;
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
            this.myGames.push(new Game(this.gamesJson[i].name, this.gamesJson[i].img, this.gamesJson[i].platform));
            let jsonName=this.gamesJson[i].jsonName;
            window.resources.getJson(jsonName).then((result)=>{
                this.initGame(JSON.parse(result));
            }).catch((err)=> {
                console.error("Failed to read "+jsonName+"!");
            });
        }
        new GameViewer(this.myGames);
    }

    /**
     * @param {object[]} game 
     */
    initGame(game) {
        if (game.length==undefined) {
            console.error("JSON file is not an array!");
            return;
        }
        for (let i=0;i<game.length;i++) {
            this.myGames.at(-1).addAchievementSet(game[i].name,game[i].image);
            for (let j=0;j<game[i].achievements.length;j++) {
                //console.log("i=",i);
                //console.log("Adding to achievement set ",this.myGames.at(-1).achievementSets[i]);
                this.myGames.at(-1).addAchievementByIndex(i,game[i].achievements[j].name,game[i].achievements[j].description,game[i].achievements[j].img,game[i].achievements[j].unlocked,game[i].achievements[j].unlockDate);
            }
        }
    }
    /**
    * @type {Game[]}
    */
    myGames = [];
}


if (typeof window!=undefined) {
    window.initialize=new initialize();
}