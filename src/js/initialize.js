import { Game } from './game.js';
export class initialize {
    /**
     * @type {object[]}
     */
    gamesJson;
    /**
     * @returns {void}
     */
    main() {
        window.electron.getJson("games.json").then((result)=>{
            this.gamesJson=JSON.parse(result);
        }).then(()=>{
            this.init();
        }).catch((err)=> {
            console.error("Failed to read games.json!");
        });
    }

    /**
     * @returns {void}
     */
    init() {
        //console.log(this.gamesJson);
        for (let i=0;i<this.gamesJson.length;i++) {
            this.myGames.push(new Game(this.gamesJson[i].name, this.gamesJson[i].img, this.gamesJson[i].platform));
            let jsonName=this.gamesJson[i].jsonName;
            window.electron.getJson(jsonName).then((result)=>{
                this.initGame(JSON.parse(result));
            }).catch((err)=> {
                console.error("Failed to read "+jsonName+"!");
            });
        }
        //console.log(this.myGames);
    }

    /**
     * @param {object[]} game 
     */
    initGame(game) {
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