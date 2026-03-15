export class GameHolder {
    myHTML;
    constructor(idx) {
        let myGames = window.initialize.myGames;
        let newHTML = "<li>";
        window.resources.getCompletePath(myGames[idx].img).then((result)=>{
            newHTML=newHTML+"<img wdith=\"100\" height=\"100\" src=\""+result+"\">";
            newHTML=newHTML+"<span class=\"gameName\">"+myGames[idx].name+"</span>";
            newHTML=newHTML+"<span class=\"platform\">"+myGames[idx].platform+"</span>";
            newHTML=newHTML+"<span class=\"percent\" id=\""+myGames[idx].name+myGames[idx].platform+"Percent\">"+myGames[idx].getPercentageCompleted()+"%</span>";
            newHTML=newHTML+"</li>";
            this.myHTML=newHTML;
            document.getElementById("gamesList").innerHTML=document.getElementById("gamesList").innerHTML+this.myHTML;
        });
    }
}