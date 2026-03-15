import { Game } from './game.js';
import games from '../../resources/games.json' with {type: "json"};
import TestGame1 from '../../resources/TestGame1.json' with {type: "json"};
export class initialize {
    resourcesPath;
    main() {
        window.electron.getPath.then((result)=>{
            this.resourcesPath=result;
        }).then(()=>{
            this.init();
        });
    }

    init() {
        //window.electron.getPath.then((result)=>{console.log(result)});
        console.log(this.resourcesPath);
        for (let i=0;i<games.length;i++) {
            this.myGames.push(new Game(games[i].name, games[i].img, games[i].platform));
            let jsonName=games[i].jsonName;
            switch(jsonName) {
                case "TestGame1":
                    this.initGame(TestGame1);
            }
        }
        console.log(this.myGames);
    }

    initGame(game) {
        for (let i=0;i<game.length;i++) {
            this.myGames.at(-1).addAchievementSet(game[i].name,game[i].image);
            for (let j=0;j<game[i].achievements.length;j++) {
                console.log("i=",i);
                console.log("Adding to achievement set ",this.myGames.at(-1).achievementSets[i]);
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