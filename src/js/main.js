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
var gameState = "title";
var created = false;

// Booleens pour affichage des menus
var m_title = false,m_menu=false, m_game = false,m_pause= false, m_gameOver=false;

function main()
{

	switch(gameState)
	{
	case "title" :
        
        if(!m_title){
            console.log("writing title section");
            $("body").addClass("titlescreen");
            $("#playground").prepend('<div class="title customfont " id="titlename">Fat Game</div><p class="customfont animated infinite pulse" id="quittitle">click here to start!</p>');
            m_title=true;
            m_menu=false;
            m_game=false;
            m_gameOver=false;
            m_pause=false;
        }
        
        $("#quittitle").click(function (){
            $("body").removeClass("titlescreen");
            $("#titlename").remove();
            $("#quittitle").remove();
            changeScreen("menu");
            console.log("click exit title screen");
        });
            
		break;
	
		
	case "menu" :
        
        if ($("input[name=fType]").val()!=20){$("#fTypeDisplay").text($("input[name=fType]").val());}
        else {$("#fTypeDisplay").text("32");}
            
        $("#bmSizeDisplay").text($("input[name=bmSize]").val()+" bits");
        
        $("#launchIt").click(function (){
            console.log("click exit menu");
            $("#popNewGame").remove();
            changeScreen("game");
        });   
		break;
			
	case "game" :
		if(created != true)
		{		
			console.log(created);
			for(i = 0; i < 9; i++)
				{
					addRectangle(i,{text : "Blah", height : 100, width : 100, color : fileColors[i], posx : i*150});
				}
			
			created = true;
		}
		
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
        if(!m_title){
            console.log("writing title section");
            $("body").addClass("titlescreen");
            $("#playground").prepend('<div class="title customfont" id="titlename">Fat Game</div><p class="customfont animated infinite pulse" id="quittitle">click here to start!</p>');
            $("#titlename").y($(window).height*0.15);
            m_title=true;
            m_menu=false;
            m_game=false;
            m_gameOver=false;
            m_pause=false;
        }
		break;
	
		
	case "menu" :
        if(!m_menu){
            console.log("writing menu section");
            $("#playground").prepend('<div id="popNewGame" class="customfont menu">'+
                                     '<div class="startOption">FAT type<input type="range" min="12" max="20" step="4" name="fType" align="left"></input>'+
                                        '<div id="fTypeDisplay"></div></div>'+
                                     '<div class="startOption">block max size<input type="range" name="bmSize" align="left"></input><div id="bmSizeDisplay"></div></div>'+
                                     '<div id="launchIt" class="animated infinite flash2"><p>launch game</p></div></div>'
                                    );
            $("#popNewGame div:last-child").css("margin-bottom","30px");
            $("#popNewGame div:first-child").css("margin-top","50px").css("margin-bottom","20px");
            $("#popNewGame").xy(200,200);
            m_title=false;
            m_menu=true;
            m_game=false;
            m_gameOver=false;
            m_pause=false;
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
