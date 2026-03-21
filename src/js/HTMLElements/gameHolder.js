import { getCompletePath } from "../utils.js";
export class GameHolder {
    myHTML;
    constructor(game, idx) {
        let newHTML = "<li class=\"gameEntry\" onClick=\"window.app.viewManager.setView(window.app.viewManager.views.achievementSetsView, "+idx+");\">";
        getCompletePath(game.img).then((result)=>{
            newHTML=newHTML+"<img class=\"gameImg\" wdith=\"100\" height=\"100\" src=\""+result+"\">";
            newHTML=newHTML+"<span class=\"gameName\">"+game.name+"</span>";
            newHTML=newHTML+"<span class=\"platform\">"+game.platform+"</span>";
            newHTML=newHTML+"<span class=\"percent\" id=\""+game.name+game.platform+"Percent\">"+game.getPercentageCompleted()+"%</span>";
            newHTML=newHTML+"</li>";
            this.myHTML=newHTML;
            document.getElementById("gamesList").innerHTML=document.getElementById("gamesList").innerHTML+this.myHTML;
        });
    }
}