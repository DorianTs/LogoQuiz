/**
 * Created by DorianTs on 21/03/2016.
 */
var loadWelcomeScreen = function(){
    $("#newGameButt").click(clickListener);
    $("#recordsButt").click(clickListener);
};

var clickListener = function(e) {
    if(e.target.id == "newGameButt"){
        window.location.href = "GameScreen.html";
    }

    if(e.target.id == "recordsButt"){
        window.location.href = "RecordsTable.html";
    }
}