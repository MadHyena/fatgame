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
            $("#playground").prepend('<div class="title customfont" id="titlename">Fat Game</div><p class="customfont" id="quittitle">click here to start!</p>');
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
        $("#launchIt").click(function (){
            console.log("click exit menu");
            $("#popNewGame").remove();
        });   
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
        if(!m_title){
            console.log("writing title section");
            $("body").addClass("titlescreen");
            $("#playground").prepend('<div class="title customfont" id="titlename">Fat Game</div><p class="customfont" id="quittitle">click here to start!</p>');
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
                                     '<div id="launchIt"><h2>New game</h2>'+
                                     '</div><div class="startOption">cluster range<input type="range" align="left"></input></div>'+
                                           '<div class="startOption">fancy word<input type="range" align="left"></input></div></div>'
                                    );
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
