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

var tappedBlock = 1;
var gameState = "start";
var partyState = "spawn";
var GAME_DURATION = 40; // durée d'une partie
var PLAYGROUND_HEIGHT;
var PLAYGROUND_WIDTH;
var BLOCK_MAX_SIZE;

var CLUSTER_SIZE = 16;
var NB_BLOCKS;
var LANDSCAPE = false;
var secondes = 0, millisecondes = 0;
var LEVEL = 1;

var memory;
var NB_BLOCKS;
var LANDSCAPE = false;
var secondes = GAME_DURATION, millisecondes = 0;

var generator = new Generator();

function main()
{
    
	switch(gameState)
	{
            
        case "start":
            PLAYGROUND_HEIGHT = $("#playground").height();
            PLAYGROUND_WIDTH = $("#playground").width();
            if(PLAYGROUND_WIDTH>PLAYGROUND_HEIGHT){LANDSCAPE=true;}
            changeScreen("title");
            break;


        case "title":

            break;


        case "menu":

            $("#fTypeDisplay").text($("input[name=fType]").val()/1000+" Mo");
            $("#bmSizeDisplay").text($("input[name=bmSize]").val()+" Ko");

            break;

        case "game":
            if (millisecondes>29){
                millisecondes-=30;
            } else if(secondes !=0) { 
                secondes--;
                millisecondes=1000-millisecondes;
                    if(partyState=="spawn"&&secondes%39==0){  
                        generator.createBlock();
                    }
            } else {
                if (partyState == "spawn"){ partyState="defrag"; secondes = GAME_DURATION;}
                else {changeScreen("gameover");}
            }
            
            checkMemoryPos();
            
            $("#timer").text(secondes+'.'+millisecondes/10);

            break;

        case "pause":

            break;

        case "gameover":

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

            $("#quittitle").click(function (){
                $("#menuTitle").remove();
                console.log("click exit title screen");
                changeScreen("menu");
            });

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
            $.playground().addGroup("divTuto",{width: PLAYGROUND_WIDTH/4, height: PLAYGROUND_HEIGHT/8});
            $("#divTuto").append("<div id='openControls' class='customfont'><p>Controls</p></div>");
            $("#menuGame").prepend('<div id="popNewGame" class="customfont menu">'+
                '<div class="startOption"><div style="margin-bottom:-5px">partition size</div>'+
                '<input type="range" min="15360" max="30720" step="2560" name="fType" align="left"></input>'+
                '<div id="fTypeDisplay"></div></div>'+
                '<div class="startOption"><div style="margin-bottom:-5px">File max size</div>'+
                '<input type="range" name="bmSize" min="1024" max="2048" step="1024" align="left"></input><div id="bmSizeDisplay"></div></div>'+
                '<div id="launchIt" class="animated infinite flash2" style="margin-bottom:0px"><p>Launch game</p></div></div>'
            );
            $("#openControls").click(function (){
                console.log("click controls");
                $("#divTuto").remove();
                $("#menuGame").remove();
                changeScreen("tutorial");
            });
            
            $("#launchIt").click(function (){
                console.log("click exit menu");
                BLOCK_MAX_SIZE=$("input[name=bmSize]").val()/16;
                NB_BLOCKS = $("input[name=fType]").val()/512;
                console.log("NB_BLOCKS :"+NB_BLOCKS+"\nBLOCK_MAX_SIZE :"+BLOCK_MAX_SIZE);
                $("#divTuto").remove();
                $("#menuGame").remove();
                
                /*
                 * La création de la minibar et de l'affichage du timer se fait ici
                 * pour eviter qu'ils ne soient détruits/recréés à chaque passage en pause
                 */
                $.playground().addGroup("timer",{width:PLAYGROUND_WIDTH/3,height: PLAYGROUND_HEIGHT/10,posx: PLAYGROUND_WIDTH/2-PLAYGROUND_WIDTH/10, posy:50});
                $("#timer").addClass("customfont");
                $("#timer").css("font-size","2em");

                //================================================================

                //Barre memoire

                //Width = Taille d'une case * nbCase(taille memoire)
                // posy affecté par posy et top (cf affichage avec debugger), donc à diviser par 2
                $.playground().addGroup('memory', { width : (SLOT_WIDTH+BORDER_SIZE)*NB_BLOCKS, height : BLOCK_HEIGHT, posy : (PLAYGROUND_HEIGHT- (BLOCK_HEIGHT*2))/2 });

                memory = new Memory(NB_BLOCKS, { posy : 0});
                $("#memory").pep({ axis: 'x', drag: function(ev, obj){ /*checkMemoryPos(ev, obj);*/ }});
                
                changeScreen("game");
            });       

            $("#popNewGame div:last-child").css("margin-bottom","30px");
            $("#popNewGame div:first-child").css("margin-top","50px").css("margin-bottom","20px");
            $("#menuGame").x((PLAYGROUND_WIDTH/2)-($("#menuGame").width()/2));



            break;
            
        case "tutorial" :
            $.playground().append('<div class="menu customfont" style="overflow-y : scroll; height : 700px ; align : center">'+
                '<div class="menu">'+
                    '<p>Split a block</p><img src="img/tutoDoubleTap.png" alt="double tap on a block to split it" style="margin-bottom : 30px">'+
                '</div>'+
                '<div class="menu">'+
                    '<p>free a filled memory slot</p><img src="img/tutoSwipeUp.png" alt="swipe up on memory to free it" style="margin-bottom : 30px">'+
                '</div>'+
                '</div>'
            );
            break;
            
        case "game" :         
            
            $.playground().addGroup("menuInGame",{width: 40, height: 50 });
            $("#menuInGame").prepend('<div class="customfont pauseButton"><div id="pauseIt"><font size="3em">||</font></div></div>');
            $("#pauseIt").css("margin-top","5px");
            $("#pauseIt").css("margin-bottom","5px");

            $("#pauseIt").click(function (){
                console.log("click pause button");
                $("#menuInGame").remove();
                changeScreen("pause");
            }); 
            
            break;

        case "pause" :
            $.playground().addGroup("block",{width:PLAYGROUND_WIDTH, height:PLAYGROUND_HEIGHT})
            if(LANDSCAPE){  
                $.playground().addGroup("menuPause",{width: PLAYGROUND_WIDTH*0.55, height: PLAYGROUND_HEIGHT*0.4 });
                $("#menuPause").y((PLAYGROUND_HEIGHT/2)-($("#menuPause").height()/1.1));
            }
            else {
                $.playground().addGroup("menuPause",{width: PLAYGROUND_WIDTH*0.4, height: PLAYGROUND_HEIGHT*0.7 });
                $("#menuPause").y((PLAYGROUND_HEIGHT/2)-($("#menuPause").height()/2));
            }
            $("#menuPause").x((PLAYGROUND_WIDTH/2)-($("#menuPause").width()/2));
            $("#menuPause").addClass("customfont menu");
            $("#menuPause").append('<p>Pause</p><div id="resumeIt" class="animated infinite flash2"><font size="6em">resume</font></div>');
            $("#resumeIt").css("margin-top","100px");
            
            $("#resumeIt").click(function (){
                console.log("click exit menu");
                $("#block").remove();
                $("#menuPause").remove();
                changeScreen("game");
            });   
            
            break;

        case "gameover" :
            $.playground().clearAll();
            if(LANDSCAPE){  
                $.playground().addGroup("menuGameOver",{width: PLAYGROUND_WIDTH*0.55, height: PLAYGROUND_HEIGHT*0.4 });
                $("#menuGameOver").y((PLAYGROUND_HEIGHT/2)-($("#menuGameOver").height()/1.1));
            }
            else {
                $.playground().addGroup("menuGameOver",{width: PLAYGROUND_WIDTH*0.4, height: PLAYGROUND_HEIGHT*0.7 });
                $("#menuGameOver").y((PLAYGROUND_HEIGHT/2)-($("#menuGameOver").height()/2));
            }
            $("#menuGameOver").x((PLAYGROUND_WIDTH/2)-($("#menuGameOver").width()/2));
            $("#menuGameOver").addClass("customfont menu");
            $("#menuGameOver").append('<p><div class="animated infinite pulse"><h1>Game Over</h1></div></p> <p>Score : Null</p><div id="launchNewGame"><p><h2>New game</h2></p></div>');
            
            // handler pour nouvelle partie
            $("#launchNewGame").click(function (){
                $.playground().clearAll();
                secondes = GAME_DURATION;
                changeScreen("menu");
            });
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
