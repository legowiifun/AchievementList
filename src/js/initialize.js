import { Game } from './game.js';
import { games } from '../json/games.json';
import {TestGame1} from '../json/TestGame1.json';

export function init() {
    for (let i=0;i<games.length;i++) {
        myGames.push(new Game(games[i].name, games[i].img, games[i].platform));
        myGames[-1]
    }
}
/**
 * @type {Game[]}
 */
export let myGames = [];