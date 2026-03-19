export class EditAchievementView {
    constructor(achievement) {
        let newHTML="<form>"
            newHTML=newHTML+"<p> Date: ";
                newHTML=newHTML+"<input type=\"date\" id=\"editAchievementDate\">";
            newHTML=newHTML+"</p>";
            newHTML=newHTML+"<p> Obtained?: ";
                newHTML=newHTML+"<input type=\"checkbox\" id=\"editAchievementCheckbox\">";
            newHTML=newHTML+"</p>";
            newHTML=newHTML+"<button id=\"achievementEdit\" onclick=\"initialize.setView(initialize.views.achievementsView, initialize.achievementSetIdx"
                newHTML=newHTML+")\">DONE</button>";
        newHTML=newHTML+"</form>";
        document.getElementById("content").innerHTML=newHTML;
    }
}