    let kenobi = {
        fighterNo: 0,
        name: 'Obi-Wan Kenobi',
        health: 128,
        attack: 18,
        image: '<img src="assets/images/Obiwankenobi.jpg" class="image img-responsive">'
    };

    //  luke
    let luke = {
    fighterNo: 1,
    name: 'Luke Skywalker',
    health: 100,
    attack: 30,
    image: '<img src="assets/images/luke.jpg" class="image img-responsive">'
    };
    // derth sidious object
    let sidious = {
    fighterNo: 2,
    name: 'Darth Sidious',
    health: 158,
    attack: 15,
    image: '<img src="assets/images/darth_sidious.jpg" class="image img-responsive">'
    };
    // derth Maul
    let maul = {
    fighterNo: 3,
    name: 'Darth Maul',
    health: 180,
    attack: 12,
    image: '<img src="assets/images/derth_maul.jpg" class="image img-responsive">'
    };
    let fightersArr= [kenobi,luke,sidious,maul];


    let $yourFighterDiv = $('#yourfighter');
    let $yourFighter = "" ;
    let fighterSelected =false ;
    let opponentSelected =false;
    let $yourOpponentDiv = $('#youropponent');
    let  $yourOpponent = " "

    //fight 
    let opponentAttack = " " ;
    let opponentHealth = " " ;
    let fighterAttack = " ";
    let fighterHealth = " ";
    let fighterbaseAtt = 6 ;
    let opponentName = " " ;
    let btnAdded = false;
    let counter =0 ;
    let $fighterNo = 0;
    let arrObj ;
    //select fighter

function selectFighter(){
    $(".fighter").on("click", function()
    {
        if(fighterSelected) return;
        $("#mainHeading").css("font-size" ,"50px");
            $yourFighter =  $(this);
            $(".fighters").css("margin-top" , "0px");
            $(".fighters").empty();
            $yourFighterDiv.empty();
            // $(".title").text(" ");
        
            $yourFighter.addClass('yourFighter');
        
            $yourFighterDiv.append('<h5 class="fighterTitle">You</h5>');
            $yourFighterDiv.append($yourFighter);
            fighterSelected =true;
        
            fighterAttack =  parseInt($yourFighter.attr('data_attack'));
            fighterHealth = parseInt($yourFighter.attr('data_health'));
            
            $fighterNo = parseInt($(this).attr('data_fighterno'));
            arrObj = fightersArr[ $fighterNo];
            fightersArr.splice($fighterNo,1);
            
            modifyUI(); 
        
     
    });
}

function selectOpponent ()
{
    $(".opponent").on("click", function() 
    {
        if(opponentSelected) return;
        $yourOpponent =  $(this);
        $yourOpponent.addClass('yourOpponent');
        $yourOpponent.removeClass('opponent');
        $(".msg").empty() ;
    
        counter++ ;
        $yourOpponentDiv.append('<h5 class="fighterTitle">Opponent</h5>');
        $yourOpponentDiv.append($yourOpponent);
        if(counter === fightersArr.length)
        {
            $(".title").text(" ");
            $("#opponents").empty();
        }

        opponentSelected =true;
        $("#fightBtn").append('<button type="button" class="fightBtn">Attack</button>');
        // $(".fightBtn").animate({opacity: 1}, 700 );
        // setInterval(fightBlink ,500);
       
       
        opponentAttack = parseInt($yourOpponent.attr('data_attack'));
        opponentHealth = parseInt($yourOpponent.attr('data_health'));
        opponentName = $yourOpponent.attr('data_name');
    });
}

function fightBlink(){
    $(".fightBtn").animate({    
        opacity: 1
    }, 500, function() {
        $(this).animate({
            opacity: 0.3
        }, 500);
    });
// $(this).fadeOut(250).fadeIn(250);
}

function modifyUI () 
{
    $("#mainHeading").css("font-size" ,"50px");
    $("#opponents").css("margin-top" , "10px");
    $("#opponents").append ( '<h3 class="title">Select Your Opponent</h3>');
    $(".title").css("font-size" ,"20px");
    for(let i =0; i<fightersArr.length; i++)
        {
         let $opponentDiv = $('<div class="opponent">');
         $opponentDiv.attr('data_attack', fightersArr[i].attack);
         $opponentDiv.attr('data_health', fightersArr[i].health);
         $opponentDiv.attr('data_name', fightersArr[i].name);
       
         $opponentDiv.append('<h5 class="opponentName">'+fightersArr[i].name);
         $opponentDiv.append(fightersArr[i].image); 
         
         $opponentDiv.append('<h5 class="opponentHealth">'+fightersArr[i].health);
         
         $("#opponents").append($opponentDiv); 

        }
    selectOpponent ();
};

$('#fightBtn').on('click', function() {
   
   
    fight($yourFighter , $yourOpponent);
   
});

function restartGame()
{
    $('#restartBtn').on('click', function() {
   
        $(".fighters").empty();
        $("#opponents").empty();
        fighterSelected =false;
        opponentSelected =false;
        fightersArr.splice($fighterNo,0, arrObj);
        counter =0;
        constructGamePage();
        $(".msg").empty();
    });
     
};

function fight($yourFighter , $yourOpponent)
{   
    if (opponentSelected) 
    {
       if(opponentHealth >0 && fighterHealth >0){
        opponentHealth = opponentHealth-fighterAttack;
        if(opponentHealth > 0 )
        {fighterHealth = fighterHealth - opponentAttack;}
 
        $(".fighterHealth").text(fighterHealth)
        // .animate({
        //     fontSize: 35,
        //     fontWeight: "bold",
        //     color: '#FF0000'
        // }, 500, function() {
        //     $(this).animate({
        //         fontSize: 20,
        //         color: 'white'
        //     }, 500);
        // });
       

        $(".yourOpponent > .opponentHealth").text(opponentHealth)
        // .animate({
        //     fontSize: 35,
        //     color: '#FF0000'
        // }, 500, function() {
        //     $(this).animate({
        //         fontSize: 20,
        //         color: 'white'
        //     }, 500);
        // });
        $(".msg").css("color" , "white");
        $(".msg").text("You attacked " + opponentName + " for " + fighterAttack + " damage points.").css("font-size" ,"20px");
        $(".msg").append("<br>" + opponentName + " counter attacked you for " + opponentAttack + " damage points.").css("font-size" ,"20px");
    }
        //win case
        if(opponentHealth <=0 )
       {
         $yourOpponentDiv.empty();
         $("#fightBtn").empty();
          
           if(counter === fightersArr.length)
            { 
                $("#mainHeading").css("font-size" ,"80px");
                $(".fighters"). css("margin-top", "60px");
                $yourFighterDiv.empty();
                $(".fighters").append($yourFighter); 
                $(".msg").text("You Won. Game Over!").css(
                    {
                        "font-size" :"50px",
                        "color": "white",
                        "font-weight" : "bold"
                     });
                $('.restart').append('<button class="restartBtn btn btn-lg btn-warning">Restart Game</button>');
                $("#opponents").append('<button type="button" class="btn btn-lg btn-warning" id="restartBtn">Play Again!</button>');
                restartGame();
              }
              else{
              $(".msg").text("You have defeated " +  opponentName+"." + " You can choose to find another opponent.");
              opponentSelected =false;
              }
            //   break;
        } 
            
     else if(fighterHealth <=0 ) //loss case restart
            {
            $("#mainHeading").css("font-size" ,"80px");
            $(".fighters"). css("margin-top", "60px");
                $yourFighterDiv.empty();
                $("#opponents").empty();
                $("#fightBtn").empty();
                $yourOpponentDiv.empty();
                $(".fighters").append($yourFighter); 
                $(".msg").text("You Lost. Game Over!").css(
                    {
                        "font-size" :"50px",
                        "color": "red",
                        "font-weight" : "bold"
                     }
                 );
                $("#opponents").append('<button type="button" class="btn btn-lg btn-warning" id="restartBtn">Play Again!</button>');
                restartGame();
       }  
     fighterAttack = fighterAttack + fighterbaseAtt;
    }
};

function constructGamePage()
{
    $(".fighters"). css("margin-top", "60px");
    $(".fighters").append ( '<h3 class="title">Select Your Fighter</h3>');
    
    for(let i =0; i<fightersArr.length; i++)
        {
         let $fighterDiv = $('<div class="fighter">');
         $fighterDiv.attr('data_attack', fightersArr[i].attack);
         $fighterDiv.attr('data_health', fightersArr[i].health);
         $fighterDiv.attr('data_fighterno', fightersArr[i].fighterNo);
         $fighterDiv.append('<h5 class="fighterName">'+fightersArr[i].name);
         $fighterDiv.append(fightersArr[i].image); 
        
         $fighterDiv.append('<h5 class="fighterHealth">'+fightersArr[i].health);
         
        $(".fighters").append($fighterDiv); 

        }
        selectFighter();
      
};

//Creat UI when page loads.
$(document).ready(function(){
    var audio = new Audio("assets/audio/John Williams - Battle of the Heroes (Official Audio).mp3");
   audio.play();
    constructGamePage();
});

