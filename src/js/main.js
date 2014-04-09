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


function main()
{
	//===================================================
	//DRAG N DROP
	
	//Je savais pas où le mettre on verra hein...

	var clickedDiv;

	//Ici gQ_sprite mais on fera surement nos propres class
	$(".gQ_sprite").mousedown(function() {
	    clickedDiv = $(this);
	});

	$("#playground").mouseup(function() {
	    clickedDiv = false;
	});

	$.playground().mousemove(function() {

	    if(clickedDiv){

	    	//Pour avoir le curseur au centre du sprite pendant le drag n drop
	    	var halfWidth = parseInt($(clickedDiv).css("width").replace(/[^-\d\.]/g, '')) / 2;
	    	var halfHeight = parseInt($(clickedDiv).css("height").replace(/[^-\d\.]/g, '')) / 2;

	    	$(clickedDiv).xy($.gQ.mouseTracker.x - halfWidth, $.gQ.mouseTracker.y - halfHeight);
	    	console.log($(clickedDiv).css("width"));
	    }
	});

	//===================================================
	
	switch(gameState)
	{
	case "title" :
		
		// mettre un keycode de la touche qu'on veut pour aller au menu depuis le titleScreen
		// ou même trouver comment faire pour passer au menu en appuyant sur nawak
		if($.gQ.keyTracker[])
			{
				changeScreen("menu");
			}
		
		break;
	
		
	case "menu" :
		
		break:
			
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
function changeScreen(var screen)
{
	//Ici du code qui va changer le background, nettoyer les objets courants, etc.
	
	//Puis changement d'état de jeu
	gameState = screen;
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
