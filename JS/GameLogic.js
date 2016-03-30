/**
 * Created by DorianTs on 01/03/2016.
 */
var app = angular.module('gameScreen', ['ngMaterial']);
/*===================Defines=======================*/
var LVL_EASY = 1;
var LVL_MEDIUM = 2;
var LVL_HARD = 3;

 var MIN_EASY_STAGE = 1;
 var MAX_EASY_STAGE = 5;
 var MIN_MEDIUM_STAGE = 6;
 var MAX_MEDIUM_STAGE = 10;
 var MIN_HARD_STAGE = 11;
 var MAX_HARD_STAGE = 15;
 /*=================================================*/

/*Declaring the global variables for the game*/
var score = 0;
var level = 1;
var lives = 3; // how many times player can has mistakes
var stage = 1;
var clues = 3;
var logoNumber;
var logosDone = [];
/*===================================================*/

/*Logo is an object represents a logo with a slogan, its level(1-easy
* 2-medium, 3-hard) and a link to a picture of the logo(will be used
* for the help button)*/
function Logo(name, slogan, level, logoSymbol){
    this.name = name;
    this.slogan = slogan;
    this.level = level;
    this.logoSymbol = logoSymbol;

}

/*Creating object LogoList. Object has a list of logos*/
function LogoList(){
    this.list = [];

    if(typeof LogoList.prototype.addLogo != "function")
    {
        // add logo to the list
        LogoList.prototype.addLogo = function(name, slogan, level, logoSymbol){
            logo = new Logo(name, slogan, level, logoSymbol);
            this.list = this.list.concat(logo);
        };
    }
}

// module to initialize our logo lists for the game
var logoLists = (function(){
    //starting with the easy part
    easy = new LogoList();
    easy.addLogo("אסם", "זה טוב זה טוב זה", LVL_EASY, "css/logos/easy/osem.jpg");
    easy.addLogo("בזק", "הכי טוב בבית", LVL_EASY, "css/logos/easy/bezeq.png");
    easy.addLogo("012 סמייל", "סתם כי בא לי לדבר", LVL_EASY, "css/logos/easy/012.png");
    easy.addLogo("לאומי קארד", "תמיד, לפנק, לפנק, לפנק", LVL_EASY, "css/logos/easy/leumi.jpg");
    easy.addLogo("הראל", "אולי יש לכם ביטוח בריאות אבל אין לכם " , LVL_EASY, "css/logos/easy/harel.png");
    easy.addLogo("אלפא רומיאו", "זה שאתה נושם, לא אומר שאתה חי", LVL_EASY, "css/logos/easy/romeo.jpg");
    easy.addLogo("נביעות", "לגוף ולנשמה", LVL_EASY, "css/logos/easy/neviot.jpg");
    easy.addLogo("נייק", "just do it", LVL_EASY, "css/logos/easy/nike.png");
    easy.addLogo("תפוצ'יפס", "טבעי שלא תשלוט בעצמך", LVL_EASY, "css/logos/easy/tapuchips.png");
    easy.addLogo("אל על", "הכי בבית בעולם", LVL_EASY, "css/logos/easy/elal.jpg");
    easy.addLogo("מחסני תאורה", "באתי, נדלקתי!", LVL_EASY, "css/logos/easy/teura.jpg");
    easy.addLogo("צבר", "חומוס עושים באהבה או שלא עושים בכלל", LVL_EASY, "css/logos/easy/tzabar.jpg");
    easy.addLogo("מוטורולה", "Hello Moto", LVL_EASY, "css/logos/easy/motorola.png");

    medium = new LogoList();
    medium.addLogo("וובי", "משווים וקונים ביטוח", LVL_MEDIUM, "css/logos/medium/wobi.jpg");
    medium.addLogo("רכבת ישראל", "פשוט ליהנות מהדרך", LVL_MEDIUM, "css/logos/medium/rakevet.jpg");
    medium.addLogo("תנובה", "לגדול בבית ישראלי", LVL_MEDIUM, "css/logos/medium/tnuva.png");
    medium.addLogo("נסקפה", "it all starts with a-", LVL_MEDIUM, "css/logos/medium/Nescafe.jpg");
    medium.addLogo("מטרנה", "הכי קרוב לאמא", LVL_MEDIUM, "css/logos/medium/materna.png");
    medium.addLogo("רנו", "Drive the change", LVL_MEDIUM, "css/logos/medium/reno.jpg");
    medium.addLogo("קוקה קולה", "לאהוב את החיים", LVL_MEDIUM, "css/logos/medium/cola.png");
    medium.addLogo("אפל", "Think different", LVL_MEDIUM, "css/logos/medium/apple.png");
    medium.addLogo("אייץ' אנד או", "זה רק נראה יקר", LVL_MEDIUM, "css/logos/medium/hno.png");
    medium.addLogo("מקדונלדס", "I'm Loving It", LVL_MEDIUM, "css/logos/medium/mcdonalds.png");
    medium.addLogo("ניקול", "במטבח זה הכל", LVL_MEDIUM, "css/logos/medium/nikol.png");
    medium.addLogo("הופ", "לגדול בידיים טובות", LVL_MEDIUM, "css/logos/medium/hop.png");
    medium.addLogo("סימילאק", "בגלל המדע", LVL_MEDIUM, "css/logos/medium/similak.jpg");
    medium.addLogo("ענבי טלי", "כל עינב זהב", LVL_MEDIUM, "css/logos/medium/taliGrapes.jpg");
    medium.addLogo("איביי", "The World's Online Market Place", LVL_MEDIUM, "css/logos/medium/ebay.png");


    hard = new LogoList();
    hard.addLogo("שופרסל", "לקנות כמו שצריך", LVL_HARD, "css/logos/hard/shufersal.png");
    hard.addLogo("דואר ישראל", "בכל מקום בשביל כולם", LVL_HARD, "css/logos/hard/doar.png");
    hard.addLogo("מרצדס", "The best or nothing", LVL_HARD, "css/logos/hard/mercedes.png");
    hard.addLogo("סובארו", "Confidence in motion", LVL_HARD, "css/logos/hard/subaru.jpg");
    hard.addLogo("פג'ו", "Motion & Emotion", LVL_HARD, "css/logos/hard/pegu.png");
    hard.addLogo("קיה", "The power to surprise", LVL_HARD, "css/logos/hard/kia.png");
    hard.addLogo("סיאט", "Enjoyneering", LVL_HARD, "css/logos/hard/seat.png");
    hard.addLogo("ב.מ.וו", "The Ultimate Driving Machine", LVL_HARD, "css/logos/hard/bmw.jpg");
    hard.addLogo("לוריאל", "Because You're Worth It", LVL_HARD, "css/logos/hard/loreal.jpg");
    hard.addLogo("מאסטר קארד", "There are some things money can't buy. For everything else, there's-", 3, "css/logos/hard/mastercard.png");
    hard.addLogo("בנק יהב", "הכי משתלם בשבילך", LVL_HARD, "css/logos/hard/yahav.png");
    hard.addLogo("נוקיה", "Connecting People", LVL_HARD, "css/logos/hard/nokia.jpg");
    hard.addLogo("גוגל", "don't be evil", LVL_HARD, "css/logos/hard/google.png");

    return {
        easyList : easy,
        mediumList : medium,
        hardList : hard
    };
}() );


var clickListener = function(e) {
    if ( (e.target.id == "helpButton" || e.target.id == "checkButt")
        &&
        $("#nextStage").css('display') != 'none' ){

        return; /* if user clicked one of the buttons before going
        to the next stage , we don't do nothing*/
    }


    if(e.target.id == "helpButton")
    {

        if (clues == 0){
            $("#helpButton").html("No more clues :(");
            return;
        }
        clues--;
        $("#helpButton").html("Get Clue ("+clues+" left)");


        var linkToImg = getLinkToLogo(level);


        $("#img").attr("src", linkToImg);
        $("#img").show(1000);
    }

    /*if exit button was clicked, confirm user choice again and then
    * we can go to the main page*/
    if(e.target.id == "exitButt")
    {
        swal({
                title: "Are you sure?",
                text: "All game progress will be erased",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes",
                closeOnConfirm: false },
            function(){
                window.location.href = "index.html";
            });
        return;
    }

    // If Check button was clicked
    if(e.target.id == "checkButt" /*||
        (e.keyCode == 13 && $("#nextStage").css('display') == 'none')*/)
    {
        var text = $("#answer").val();
        var logoName = getLogoName();

        var res = text.localeCompare(logoName);

        if(res == 0) // answer is correct
        {
            // got points for the level
            var logoLevel = getLogoLevel();

            updateScore(logoLevel);

            $(".score").html(score); // update screen
            var div = $(".score");
            div.animate({fontSize: '50px'}, "slow");
            div.animate({fontSize:'30px'}, "slow");

           // $("#nextStage").show();
            $("#nextStage").slideDown();
            $("#answer").attr('readonly',true);
        }
        else // answer is incorrect
        {
            if(lives == 1)
            {
                lives = 0;
                $(".lives").html(lives);

                setLocalStorageScore();

                swal({
                    title: "Game Over!",
                    type: "info",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                    closeOnConfirm: false,
                    allowEscapeKey: false,
                }, function(){
                    window.location.href = "GameOverPage.html";
                    return;
                });



            }
            else
                lives --;
            $(".lives").html(lives); // update screen
            var div = $(".lives");
            div.animate({fontSize: '70px', fontWeight:'bold'}, "slow");
            div.animate({fontSize:'30px', fontWeight:'normal'}, "slow");
        }
    }

    if(e.target.id == "nextStage" ||
        (e.keyCode == 13 && $("#nextStage").css('display') != 'none'))
    {
        stage++;
        updateLevel();
        if(level == -1)
        {
            setLocalStorageScore();
            swal({
                title: "Well done!",
                text:"You finished all the logos for now",
                type: "info",
                showCancelButton: false,
                confirmButtonText: "OK",
                closeOnConfirm: true,
            }, function(){
                window.location.href = "GameOverPage.html";
                return;
            });



        }
        $(".stage").html(stage);

        // reset the 'stages done' array to the new level of game
        if(stage == MIN_MEDIUM_STAGE || stage == MIN_HARD_STAGE)
            logosDone = [];
        setLogoNumber();
        logosDone.push(logoNumber);
        $(".sloganPlace").html(getLogoSlogan());
        cleanScreen();
    }
};

/*First function to run on this specific page.
* Function initializes all button listeners and set
* different initializations on the screen*/
var loadPage = function(){
    $("#helpButton").click(clickListener);
    $("#checkButt").click(clickListener);
    $(document).keydown(clickListener);
    $("#exitButt").click(clickListener);
    $("#nextStage").click(clickListener);

    $("#img").hide();
    $("#nextStage").hide();
    $("#answer").attr('readonly',true);

    var savedScore = {score: 0};
    localStorage.setItem("score", JSON.stringify(savedScore));

    // we need to initial the game now
    $(".score").html(score);
    $(".stage").html(stage);
    $(".level").html(getLevel());
    $(".lives").html(lives);
    $("#helpButton").html("Get Clue ("+clues+" left)");

    /*Can add here: get random number from 0 to number of logos
     * and use this number to show random logo from our list*/

    // add slogan of first logo on the screen
    logoNumber = Math.floor(Math.random() * (logoLists.easyList.list.length));
    logosDone.push(logoNumber);
    $(".sloganPlace").html(logoLists.easyList.list[logoNumber].slogan);
    $("#answer").focus();
    $("#answer").attr('readonly',false);
};

/*Function checks what level the player in and return a string
* that represents this level number*/
function getLevel(){
    if(level == LVL_EASY)
        return "Easy";
    else if (level == LVL_MEDIUM)
        return "Medium";
    else return "Hard";
}

/*Function checks what level the player in, and returns the specific
* logoSymbol for that level*/
function getLinkToLogo(){
    var link;
    if(level == LVL_EASY)
        link = logoLists.easyList.list[logoNumber].logoSymbol;
    else if(level == LVL_MEDIUM)
        link = logoLists.mediumList.list[logoNumber].logoSymbol;
    else
        link = logoLists.hardList.list[logoNumber].logoSymbol;
    return link;
}

/*Function checks what level the player in, and returns the specific
 * name of logo for that level*/
function getLogoName(){
    var name;
    if(level == LVL_EASY)
        name = logoLists.easyList.list[logoNumber].name;
    else if(level == LVL_MEDIUM)
        name = logoLists.mediumList.list[logoNumber].name;
    else
        name = logoLists.hardList.list[logoNumber].name;
    return name;
}

/*Function checks what level the player in, and returns the specific
 * slogan of logo for that level*/
function getLogoSlogan(){
    var slogan;
    if(level == LVL_EASY)
        slogan = logoLists.easyList.list[logoNumber].slogan;
    else if(level == LVL_MEDIUM)
        slogan = logoLists.mediumList.list[logoNumber].slogan;
    else slogan = logoLists.hardList.list[logoNumber].slogan;
    return slogan;
}

/*Function returns the current level*/
function getLogoLevel(){
    var lv;
    if(level == LVL_EASY)
        lv = logoLists.easyList.list[logoNumber].level;
    else if(level == LVL_MEDIUM)
        lv = logoLists.mediumList.list[logoNumber].level;
    else
        lv = logoLists.hardList.list[logoNumber].level;
    return lv;
}

/*Function gets the logo level the player succeeded to guess
* right and update his new score according to the level*/
function updateScore(logoLevel){
    if(logoLevel == LVL_EASY)
        score += 10;
    else if(logoLevel == LVL_MEDIUM)
        score += 25;
    else score += 50;
}

/*Function updates the current level by the current stage
* the player in*/
function updateLevel(){
    if(stage >=MIN_EASY_STAGE && stage <=MAX_EASY_STAGE)
    {
        level = LVL_EASY;
        $(".level").html(getLevel());
        return;
    }
    if(stage >=MIN_MEDIUM_STAGE && stage <=MAX_MEDIUM_STAGE)
    {
        level = LVL_MEDIUM;
        $(".level").html(getLevel());
        return;
    }

    else if(stage>=MIN_HARD_STAGE && stage<=MAX_HARD_STAGE)
    {
        level = LVL_HARD;
        $(".level").html(getLevel());
        return;
    }

    // if no more stages, update level to -1 which tells player won the game
    else level = -1;
}

/*Function computes a logo for the level, from the current list of logos
* and return it*/
function getRandomLogoNumber(){
    var num;
    if(level == LVL_EASY)
        num = Math.floor(Math.random() * (logoLists.easyList.list.length));
    else if(level == LVL_MEDIUM)
        num = Math.floor(Math.random() * (logoLists.mediumList.list.length));
    else num = Math.floor(Math.random() * (logoLists.hardList.list.length));
    return num;
}

/*Function set the logo number player is about to play.
* function makes sure level wasn't played before*/
function setLogoNumber(){
    logoNumber = getRandomLogoNumber();
    var valid = false;
    var i;
    while(!valid) {
        for (i = 0; i < logosDone.length; i++) {
            if (logoNumber == logosDone[i]) {
                logoNumber = getRandomLogoNumber();
                break;
            }
        }
        valid = true;
    }
}

/*Function cleans the screen for the next stage*/
function cleanScreen() {
    $("#nextStage").hide();
    $("#img").hide();
    $("#answer").val('');
    $("#answer").focus();
    $("#answer").attr('readonly', false);
}

/*Function sets the player score in the local storage*/
function setLocalStorageScore(){
    var ScoreStr = localStorage.getItem("score");
    var ScoreObj = JSON.parse(ScoreStr);
    ScoreObj.score = score;
    localStorage.setItem("score", JSON.stringify(ScoreObj));
}