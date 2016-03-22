/**
 * Created by DorianTs on 19/03/2016.
 */


var clickListener = function(e){
    if(e.target.id == "mainPage")
    {
        window.location.href = "index.html";
    }
};

var loadRecordsTable = function()
{
    $("#cmdNewList").click(newlist);
    $("#mainPage").click(clickListener);
    fillTable();

    var ScoreStr = localStorage.getItem("score");
    var ScoreObj = JSON.parse(ScoreStr);
    var score = ScoreObj.score;

    var NameStr = localStorage.getItem("name");
    var NameObj = JSON.parse(NameStr);
    var name = NameObj.name;

    if(name==null && score==0)
        return;
    add(name, score);

    ScoreObj.score = 0;
    localStorage.setItem("score", JSON.stringify(ScoreObj));
    NameObj.name = null;
    localStorage.setItem("name", JSON.stringify(NameObj));

};

//=========Here handling with score saving in local storage==============
var add = function(name, score) {
    var item = {name : name, score: score};
    addItem(item);
    fillTable();
};

var addItem = function(item) {
    var itemsStr = localStorage.getItem("Items");
    var itemsObj = JSON.parse(itemsStr);
    itemsObj.push(item);
    localStorage.setItem("Items", JSON.stringify(itemsObj));
};

var fillTable = function() {
    if(localStorage.getItem("Items") == undefined) {
        var items = [];
        localStorage.setItem("Items", JSON.stringify(items));
        return;
    }

    $("tr:gt(0)").remove();

    var items = JSON.parse(localStorage.getItem("Items"));
    sortTableByScore(items);
    $.each(items, function(i, item) {
        var row = "<tr><td>" + (i+1) + ".</td><td>" + item.name + "</td><td>" + item.score + "</td></tr>";
        $("tr:last").after(row);
    });
};

var newlist = function(){
    var answer = confirm("Creating a new list will erase existing list. Are you sure you want to create a new list?");
    if(answer === false)
        return;
    if(localStorage.getItem("Items") != undefined)
        localStorage.removeItem("Items");
    var items = [];
    localStorage.setItem("Items", JSON.stringify(items));
    fillTable();
}

function sortTableByScore(items){
    var j;
    var flag = true;   // set flag to true to begin first pass
    var tempScore, tempName;   //holding variable

    while (flag) {
        flag= false;    //set flag to false awaiting a possible swap
        for(j=0;j<items.length-1;j++) {
            if(items[j].score < items[j+1].score)   // change to > for ascending sort
            {
                tempScore = items[j].score;
                tempName = items[j].name;
                items[j].score = items[j+1].score;
                items[j].name = items[j+1].name;

                items[j+1].score = tempScore;
                items[j+1].name = tempName;
                flag = true;              //shows a swap occurred
            }
        }
    }
}