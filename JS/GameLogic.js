/**
 * Created by DorianTs on 01/03/2016.
 */

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
    easy.addLogo("אסם", "זה טוב זה טוב זה", 1, "css/logos/easy/osem.jpg");
    easy.addLogo("בזק", "הכי טוב בבית", 1, "css/logos/easy/bezeq.png");
    easy.addLogo("012 smile", "סתם כי בא לי לדבר", 1, "css/logos/easy/012.png");
    easy.addLogo("לאומי קארד", "תמיד, לפנק, לפנק, לפנק", 1, "css/logos/easy/leumi.jpg");
    easy.addLogo("הראל", "אולי יש לכם ביטוח בריאות אבל אין לכם " , 1, "css/logos/easy/harel.png");
    easy.addLogo("אלפא רומיאו", "זה שאתה נושם, לא אומר שאתה חי", 1, "css/logos/easy/romeo.jpg");
    easy.addLogo("נביעות", "לגוף ולנשמה", 1, "css/logos/easy/neviot.jpg");
    easy.addLogo("Nike", "just do it", 1, "css/logos/easy/nike.png");
    easy.addLogo("תפוצ'יפס", "טבעי שלא תשלוט בעצמך", 1, "css/logos/easy/tapuchips.png");
    easy.addLogo("אל על", "הכי בבית בעולם", 1, "css/logos/easy/elal.jpg");
    easy.addLogo("מחסני תאורה", "באתי, נדלקתי!", 1, "css/logos/easy/teura.jpg");
    easy.addLogo("צבר", "חומוס עושים באהבה או שלא עושים בכלל", 1, "css/logos/easy/tzabar.jpg");

    medium = new LogoList();
    medium.addLogo("Wobi", "משווים וקונים ביטוח", 2, "css/logos/medium/wobi.jpg");
    medium.addLogo("רכבת ישראל", "פשוט ליהנות מהדרך", 2, "css/logos/medium/rakevet.jpg");
    medium.addLogo("תנובה", "לגדול בבית ישראלי", 2, "css/logos/medium/tnuva.png");
    medium.addLogo("Nescafe", "it all starts with a-", 2, "css/logos/medium/Nescafe.jpg");
    medium.addLogo("מטרנה", "הכי קרוב לאמא", 2, "css/logos/medium/materna.png");
    medium.addLogo("Renault", "Drive the change", 2, "css/logos/medium/reno.jpg");
    medium.addLogo("קוקה קולה", "לאהוב את החיים", 2, "css/logos/medium/cola.png");
    medium.addLogo("Apple", "Think different", 2, "css/logos/medium/apple.png");
    medium.addLogo("H&O", "זה רק נראה יקר", 2, "css/logos/medium/hno.png");
    medium.addLogo("McDonald's", "I'm Loving It", 2, "css/logos/medium/mcdonalds.png");
    medium.addLogo("ניקול", "במטבח זה הכל", 2, "css/logos/medium/nikol.png");
    medium.addLogo("הופ", "לגדול בידיים טובות", 2, "css/logos/medium/hop.png");
    medium.addLogo("סימילאק", "בגלל המדע", 2, "css/logos/medium/similak.jpg");

    hard = new LogoList();
    hard.addLogo("שופרסל", "לקנות כמו שצריך", 3, "css/logos/hard/shufersal.png");
    hard.addLogo("דואר ישראל", "בכל מקום בשביל כולם", 3, "css/logos/hard/doar.png");
    hard.addLogo("Mercedes", "The best or nothing", 3, "css/logos/hard/mercedes.png");
    hard.addLogo("Subaru", "Confidence in motion", 3, "css/logos/hard/subaru.jpg");
    hard.addLogo("Peugeot", "Motion & Emotion", 3, "css/logos/hard/pegu.png");
    hard.addLogo("Kia", "The power to surprise", 3, "css/logos/hard/kia.png");
    hard.addLogo("Seat", "Enjoyneering", 3, "css/logos/hard/seat.png");
    hard.addLogo("BMW", "The Ultimate Driving Machine", 3, "css/logos/hard/bmw.jpg");
    hard.addLogo("IBM", "Think", 3, "css/logos/hard/ibm.jpg");
    hard.addLogo("L'oreal", "Because You're Worth It", 3, "css/logos/hard/loreal.jpg");
    hard.addLogo("MasterCard", "There are some things money can't buy. For everything else, there's-", 3, "css/logos/hard/mastercard.png");

    return {
        easyList : easy,
        mediumList : medium,
        hardList : hard
    };
}() );


//Declaring the global variables for the game
var score = 0;
var level = 1;
var lives = 3; // how many times player can has mistakes
var stage = 1;
var clues = 3;
var logoNumber;

var clickListener = function(e) {
    if(e.target.id == "startgamebutt") {
        $("#startgamebutt").hide();

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
        $(".sloganPlace").html(logoLists.easyList.list[logoNumber].slogan);
        $("#answer").focus();
        $("#answer").attr('readonly',false);

    }

    if ( (e.target.id == "helpButton" || e.target.id == "checkButt")
        &&
        $("#startgamebutt").css('display') != 'none' ){

        return; /* if user clicked one of the buttons before the game
         started, we don't do nothing*/
    }

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
        if(confirm("Are you sure you want to go back to main page?\n" +
                "All game progress will be erased") == true)
        {
            window.location.href = "index.html";
        }
        else return;
    }

    if(e.target.id == "checkButt")
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

            $("#nextStage").show();
            $("#answer").attr('readonly',true);
        }
        else // answer is incorrect
        {
            if(lives == 1)
            {
                lives = 0;
                $(".lives").html(lives);

                var ScoreStr = localStorage.getItem("score");
                var ScoreObj = JSON.parse(ScoreStr);
                ScoreObj.score = score;
                localStorage.setItem("score", JSON.stringify(ScoreObj));
                alert("Game Over!");


                //go to other page (we need to save score for the leadership table)
                window.location.href = "GameOverPage.html";
            }
            else
                lives --;
            $(".lives").html(lives); // update screen
        }
    }

    if(e.target.id == "nextStage")
    {
        stage++;
        updateLevel();
        if(level == -1)
        {
            alert("You finished all the logos for now! Well done!");
            //go to other page (we need to save score for the leadership table)
            window.location.href = "GameOverPage.html";
            return;
        }
        $(".stage").html(stage);
        logoNumber = getRandomLogoNumber();
        $(".sloganPlace").html(getLogoSlogan());


        /*Cleaning the screen for the next stage*/
        $("#nextStage").hide();
        $("#img").hide();
        $("#answer").val('');
        $("#answer").focus();
        $("#answer").attr('readonly',false);
    }
};

/*First function to run on this specific page.
* Function initializes all button listeners and set
* different initializations on the screen*/
var loadPage = function(){
    $("#startgamebutt").click(clickListener);
    $("#helpButton").click(clickListener);
    $("#checkButt").click(clickListener);
    $("#exitButt").click(clickListener);
    $("#nextStage").click(clickListener);

    $("#img").hide();
    $("#nextStage").hide();
    $("#answer").attr('readonly',true);

    var savedScore = {score: 0};
    localStorage.setItem("score", JSON.stringify(savedScore));
};

/*Function checks what level the player in and return a string
* that represents this level number*/
function getLevel(){
    if(level == 1)
        return "Easy";
    else if (level == 2)
        return "Medium";
    else return "Hard";
}

/*Function checks what level the player in, and returns the specific
* logoSymbol for that level*/
function getLinkToLogo(){
    var link;
    if(level == 1)
        link = logoLists.easyList.list[logoNumber].logoSymbol;
    else if(level == 2)
        link = logoLists.mediumList.list[logoNumber].logoSymbol;
    else
        link = logoLists.hardList.list[logoNumber].logoSymbol;
    return link;
}

/*Function checks what level the player in, and returns the specific
 * name of logo for that level*/
function getLogoName(){
    var name;
    if(level == 1)
        name = logoLists.easyList.list[logoNumber].name;
    else if(level == 2)
        name = logoLists.mediumList.list[logoNumber].name;
    else
        name = logoLists.hardList.list[logoNumber].name;
    return name;
}

/*Function checks what level the player in, and returns the specific
 * slogan of logo for that level*/
function getLogoSlogan(){
    var slogan;
    if(level == 1)
        slogan = logoLists.easyList.list[logoNumber].slogan;
    else if(level == 2)
        slogan = logoLists.mediumList.list[logoNumber].slogan;
    else slogan = logoLists.hardList.list[logoNumber].slogan;
    return slogan;
}

/*Function returns the current level*/
function getLogoLevel(){
    var lv;
    if(level == 1)
        lv = logoLists.easyList.list[logoNumber].level;
    else if(level == 2)
        lv = logoLists.mediumList.list[logoNumber].level;
    else
        lv = logoLists.hardList.list[logoNumber].level;
    return lv;
}

/*Function gets the logo level the player succeeded to guess
* right and update his new score according to the level*/
function updateScore(logoLevel){
    if(logoLevel == 1)
        score += 10;
    else if(logoLevel == 2)
        score += 25;
    else score += 50;
}

/*Function updates the current level by the current stage
* the player in*/
function updateLevel(){
    if(stage >=1 && stage <=5)
    {
        level = 1;
        $(".level").html(getLevel());
        return;
    }
    if(stage >=6 && stage <=10)
    {
        level = 2;
        $(".level").html(getLevel());
        return;
    }

    else if(stage>=11 && stage<=15)
    {
        level = 3;
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
    if(level == 1)
        num = Math.floor(Math.random() * (logoLists.easyList.list.length));
    else if(level == 2)
        num = Math.floor(Math.random() * (logoLists.mediumList.list.length));
    else num = Math.floor(Math.random() * (logoLists.hardList.list.length));
    return num;
}


