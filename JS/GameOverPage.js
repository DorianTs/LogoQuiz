/**
 * Created by DorianTs on 21/03/2016.
 */
var loadGameOverScreen = function(){
    $("#cancelButt").click(clickListener);
    $("#sendButt").click(clickListener);
    name = "temp";
    var savedName = {name: name};
    localStorage.setItem("name", JSON.stringify(savedName));
};

var clickListener = function(e) {
    if(e.target.id == "cancelButt"){
        window.location.href = "index.html";
    }

    if(e.target.id == "sendButt"){
        var nameStr = localStorage.getItem("name");
        var nameObj = JSON.parse(nameStr);
        nameObj.name = $("#playerName").val();
        localStorage.setItem("name", JSON.stringify(nameObj));

        window.location.href = "RecordsTable.html";
    }
}
