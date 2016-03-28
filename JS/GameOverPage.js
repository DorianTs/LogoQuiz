/**
 * Created by DorianTs on 21/03/2016.
 */
var app = angular.module("gameOver", ['ngMaterial']);

var loadGameOverScreen = function(){
    $("#cancelButt").click(clickListener);
    $("#sendButt").click(clickListener);
    $(document).keydown(clickListener);
    name = null;
    var savedName = {name: name};
    localStorage.setItem("name", JSON.stringify(savedName));
};

var clickListener = function(e) {
    if(e.target.id == "cancelButt"){
        window.location.href = "index.html";
    }

    if(e.target.id == "sendButt" || e.keyCode == 13){
        var nameStr = localStorage.getItem("name");
        var nameObj = JSON.parse(nameStr);
        if($("#playerName").val() == "")
            nameObj.name = "NoName";
        else
            nameObj.name = $("#playerName").val();
        localStorage.setItem("name", JSON.stringify(nameObj));

        window.location.href = "RecordsTable.html";
    }
}
