//load the characters when page loads
$(document).ready(function(){

    var kenobi = {
                alias:"kenobi",
        		name: 'Obi-Wan Kenobi',
        		health: 128,
        		attack: 8,
        		image: '<img src="assets/images/Obiwankenobi.jpg" class="image  img-thumbnail">'
            };

     //  luke
	var luke = {
        alias: "luke",
		name: 'Luke SkyWalker',
		health: 100,
		attack: 2,
		image: '<img src="assets/images/luke.jpg" class="image  img-thumbnail">'
	};
	// derth sidious object
	var sidious = {
        alias: "sidious",
		name: 'Darth Sidious',
		health: 158,
		attack: 10,
		image: '<img src="assets/images/darth_sidious.jpg" class="image  img-thumbnail">'
	};
	// derth Maul
	var maul = {
        alias: "maul",
		name: 'Darth Maul',
		health: 180,
		attack: 7,
		image: '<img src="assets/images/derth_maul.jpg" class="image  img-thumbnail">'
    };
    let charArr= [kenobi,maul,sidious,luke];
    let selectedChar ;
    let charAliasArr = ["kenobi","maul","sidious","luke"];
    let $you;
    let $defender ;
    // let enemiesDiv ;
    let enemySelected = false;
    let yourAttack='' ; 
        let yourHealth=''; 
        let defenderAttack='';
        let  defenderHealth=''; 
        let ybaseAttack = 6 ; 

    createCharacters(charArr);
    chooseCharacter();
    // selectEnemy();
    // createEnemies(charArr);
    selectEnemy();
    //  let $charDiv ;

    function createCharacters(charArr){
        
        for(let i =0; i<charArr.length; i++)
        {
        // var $charDiv = $('<div id='+charArr[i].alias+'>');
         var $charDiv = $('<div class="character col-md-3" id='+charArr[i].alias+'>');
         $charDiv.append('<div class="characterName">'+charArr[i].name);
           $charDiv.append(charArr[i].image);  
         $charDiv.append('<div class="characterHealth">'+charArr[i].health);
         $charDiv.attr('data_attack', charArr[i].attack);
         $charDiv.attr('data_health', charArr[i].health);
        $("#characters").append($charDiv); 

        }
      
    };
   


   function chooseCharacter()
    {
        //click on any image to choose a character 
       
        $(".character").on("click", function() {
            $you = $(this);
            $('#characters').empty();
            $('#characters').append('<div class="title">Your Character</div>');
             $(this).addClass("yourCharacter");
             $(this).removeClass("character , col-md-3" );
           
             $("#characters").append($(this)); 
             $("#enemyPool").append('<div class="title">Pick Your Enemy</div>');
             yourAttack =  parseInt($you.attr('data_attack'));
             yourHealth = parseInt($you.attr('data_health'));

            var removeChar = charAliasArr.indexOf($(this).attr('id'))
			charArr.splice(removeChar, 1);
            createEnemies(charArr);
          });
          
    };
   

    function createEnemies(charArr)
    {
        $("#enemyPool").empty();
         let $enemyPoolT = $('<div class="title" >Enemies Available</div>');
         $("#enemyPool").append($enemyPoolT); 
        for(let i =0; i<charArr.length; i++)
        {
           
         var $enemyDiv =  $('<div class="enemy" id='+charArr[i].alias+'>');
         $enemyDiv.append('<div class="characterName">'+charArr[i].name);
         $enemyDiv.append(charArr[i].image);  
         $enemyDiv.append('<div class="characterHealth">'+charArr[i].health);
         $enemyDiv.attr('data_attack', charArr[i].attack);
         $enemyDiv.attr('data_health', charArr[i].health);
        $("#enemyPool").append($enemyDiv); 
        
        }
        if(enemySelected ===false){
        selectEnemy();
        }
    };
    
   
    function selectEnemy()
    {
        //click on any image to choose a character 
       // if(enemySelected ===false)
      // {
        $(".enemy").on("click", function() {
            $defender =  $(this);
           if(enemySelected ===true) return;
            $("#characters").empty();
            $you.addClass('yourCharacter');
            
            $("#you").append($you);
            $("#you").prepend($('<div class="title">you</div>'));
            $("#fightButton").append('<img src="assets/images/vs.jpg" alt="VS" class="vs" width="60">');
            // $("#fightButton").append('<div>Pick an enemy</div>');
            $("#fightButton").append('<button type="button" name="attack" id="attackBtn" class="btn btn-dark btn-md mt-5">ATTACK!</button>');
            $(this).addClass('yourEnemy');
            $(this).removeClass('enemy');
            $(this).removeClass('col-md-3');
            $("#yourEnemy").append($(this)); 
            enemySelected =true;
            $("#yourEnemy").prepend($('<div class="title">Enemy</div>'));

            defenderAttack = parseInt($defender.attr('data_attack'));
            defenderHealth = parseInt($defender.attr('data_health'));
            $('#attackBtn').on('click', function() {
                // alert("dhj");
                if (enemySelected) {
                    fight();
                } else {
                   // alert('YOU NEED TO PICK AN OPPONENT');
                   $("#fightButton").append('<div>Pick an enemy</div>');
                }
            });
          });
        //}
    };
   

    

    

    function fight()
    {
        defenderHealth = defenderHealth-yourAttack;

        yourAttack = yourAttack + ybaseAttack;
        yourHealth = yourHealth - defenderAttack;

        $(".yourCharacter").text(yourHealth);
        $(".yourEnemy").text(defenderHealth);
    }



});

