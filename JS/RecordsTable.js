/**
 * Created by DorianTs on 19/03/2016.
 */

var app = angular.module("recordsTable", ['ngMaterial']);

var clickListener = function(e){
    if(e.target.id == "mainPage")
    {
        window.location.href = "index.html";
    }
};

/*When the page comes up and loading, we need to fill our table and maybe
* update it with new score*/
var loadRecordsTable = function()
{
    $("#cmdNewList").click(newlist);
    $("#mainPage").click(clickListener);
    fillTable();

    var ScoreStr = localStorage.getItem("score");
    if(ScoreStr == null)
        return;
    var ScoreObj = JSON.parse(ScoreStr);
    var score = ScoreObj.score;

    var NameStr = localStorage.getItem("name");
    if(NameStr == null)
        return;
    var NameObj = JSON.parse(NameStr);
    var name = NameObj.name;

    if(name==null && score==0)
        return;

    // adding new name and score to the table, and refresh the table
    add(name, score);

    ScoreObj.score = 0;
    localStorage.setItem("score", JSON.stringify(ScoreObj));
    NameObj.name = null;
    localStorage.setItem("name", JSON.stringify(NameObj));

};

//==========Here handling with score saving in local storage==============
var add = function(name, score) {
    // setting the item to be stored in local storage
    var item = {name : name, score: score};
    addItem(item);
    fillTable();
};

/* function takes the items array from the local storage
(if there isn't array, make new one) and push to him the new item */
var addItem = function(item) {
    var itemsStr = localStorage.getItem("Items");
    if(itemsStr == null){
        var items = [];
        localStorage.setItem("Items", JSON.stringify(items));
        itemsStr = localStorage.getItem("Items");
    }
    var itemsObj = JSON.parse(itemsStr);
    itemsObj.push(item);
    localStorage.setItem("Items", JSON.stringify(itemsObj));
};

// filling the html table dynamically
var fillTable = function() {
    if(localStorage.getItem("Items") == undefined) {
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
    swal({
        title: "Are you sure?",
        text: "Creating a new list will erase the existing list totally",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        closeOnConfirm: false },
        function(){
            if(localStorage.getItem("Items") != undefined)
                localStorage.removeItem("Items");
            var items = [];
            localStorage.setItem("Items", JSON.stringify(items));
            fillTable();
            swal("Done", "New list has been created", "success");
        });
    return;
}

// Bubble sort to see the table in a descending order, starting from the winner
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
                flag = true; //shows a swap occurred
            }
        }
    }
}