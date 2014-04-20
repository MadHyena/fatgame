/* la main loop va checker à chaque tour dans quel état de jeu on est et va nous rediriger
* vers les bons écrans
* 
* écrans possibles:
* title
* menu
* game
* pause
* gameover
* 
* si vous avez d'autres idées go rajouter
*/
var gameState = "start";
var PLAYGROUND_HEIGHT;
var PLAYGROUND_WIDTH;
var LANDSCAPE=false;
/*
*   unique_onclick permet de bloquer la definition des onclick lors du switch dans la main
*   et eviter l'envoi de plusieurs changeScreen() si l'utilisateur n'appuie pas instantanement
*   sur le bouton pour changer de menu.
*/
var unique_onclick=0;

function main()
{
    
	switch(gameState)
	{
            
    case "start" :
        PLAYGROUND_HEIGHT = $("#playground").height();
        PLAYGROUND_WIDTH = $("#playground").width();
        if(PLAYGROUND_WIDTH>PLAYGROUND_HEIGHT){LANDSCAPE=true;}
        changeScreen("title");
        break;

               
	case "title" :
        if (unique_onclick==0){
            unique_onclick++;
            $("#quittitle").click(function (){
                $("#menuTitle").remove();
                console.log("click exit title screen");
                unique_onclick--;
                changeScreen("menu");
            });
        }
		break;
	
		
	case "menu" :
        
        if ($("input[name=fType]").val()!=20){$("#fTypeDisplay").text($("input[name=fType]").val());}
        else {$("#fTypeDisplay").text("32");}
            
        $("#bmSizeDisplay").text($("input[name=bmSize]").val()+" bits");
        
        if(unique_onclick==0){
            unique_onclick++;
            $("#launchIt").click(function (){
                console.log("click exit menu");
                $("#menuGame").remove();
                unique_onclick++;
                changeScreen("game");
            });   
        }
		break;
			
	case "game" :
		
		break;
		
	case "pause" :
		
		break;
		
	case "gameover" :
		
		break;
		
	default : break;
	
	}
}





//on passe en argument le screen qu'on veut
//différent pour la pause qui va conserver les objets déjà en jeu et tout
function changeScreen(screen)
{
	gameState = screen;
    
    	switch(gameState)
	{
	case "title" :
            
        console.log("writing title section");
        $.playground().addGroup("menuTitle",{width: 400 , height: 300 });
        $("#menuTitle").y((PLAYGROUND_HEIGHT/3)-$("#menuTitle").height()/2);
        $("#menuTitle").x((PLAYGROUND_WIDTH/2)-$("#menuTitle").width()/2);

        $("#menuTitle").append('<div class="title customfont" id="titlename">Fat Game</div>'+
                               '<p class="customfont animated infinite pulse" id="quittitle">click here to start!</p>'
                             );
		break;
	
		
	case "menu" :
        
        console.log("writing menu section");
        if(LANDSCAPE){  
            $.playground().addGroup("menuGame",{width: PLAYGROUND_WIDTH*0.55, height: PLAYGROUND_HEIGHT*0.4 });
            $("#menuGame").y((PLAYGROUND_HEIGHT/2)-($("#menuGame").height()/1.1));
        }
        else {
            $.playground().addGroup("menuGame",{width: PLAYGROUND_WIDTH*0.5, height: PLAYGROUND_HEIGHT*0.7 });
            $("#menuGame").y((PLAYGROUND_HEIGHT/2)-($("#menuGame").height()/2));
        }
        $("#menuGame").prepend('<div id="popNewGame" class="customfont menu">'+
                                 '<div class="startOption"><div style="margin-bottom:-5px">FAT type</div>'+
                                    '<input type="range" min="12" max="20" step="4" name="fType" align="left"></input>'+
                                    '<div id="fTypeDisplay"></div></div>'+
                                 '<div class="startOption"><div style="margin-bottom:-5px">block max size</div>'+
                                    '<input type="range" name="bmSize" min="64" max="2048" step="64" align="left"></input><div id="bmSizeDisplay"></div></div>'+
                                 '<div id="launchIt" class="animated infinite flash2" style="margin-bottom:0px"><p>launch game</p></div></div>'
                                );
        $("#popNewGame div:last-child").css("margin-bottom","30px");
        $("#popNewGame div:first-child").css("margin-top","50px").css("margin-bottom","20px");
        $("#menuGame").x((PLAYGROUND_WIDTH/2)-($("#menuGame").width()/2));
        
            
            
		break;
			
	case "game" :
		
            $.playground().addGroup("menuInGame",{width: 40, height: 50 });
            $("#menuInGame").prepend('<div class="customfont pauseButton"><div id="pauseIt"><font size="3em">||</font></div></div>');
            $("#pauseIt").css("margin-top","5px");
            $("#pauseIt").css("margin-bottom","5px");
		break;
		
	case "pause" :
		
		break;
		
	case "gameover" :
		
		break;
		
	default : break;
	
	}
    
}

//bon elle sert un peu à rien mais y'à unpause donc autant avoir pause
function pause()
{
	gameState = "pause";
}

//nettoie l'écran de pause et relance le jeu
function unpause()
{
	//là on va nettoyer les trucs de l'écran de pause puis relancer le jeu
	gameState = "game";
}
