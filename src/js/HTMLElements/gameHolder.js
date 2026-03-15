export class GameHolder {
    myHTML;
    constructor(game) {
        let newHTML = "<li>";
        window.resources.getCompletePath(game.img).then((result)=>{
            newHTML=newHTML+"<img wdith=\"100\" height=\"100\" src=\""+result+"\">";
            newHTML=newHTML+"<span class=\"gameName\">"+game.name+"</span>";
            newHTML=newHTML+"<span class=\"platform\">"+game.platform+"</span>";
            newHTML=newHTML+"<span class=\"percent\" id=\""+game.name+game.platform+"Percent\">"+game.getPercentageCompleted()+"%</span>";
            newHTML=newHTML+"</li>";
            this.myHTML=newHTML;
            document.getElementById("gamesList").innerHTML=document.getElementById("gamesList").innerHTML+this.myHTML;
        });
    }
}