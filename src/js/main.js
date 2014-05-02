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
var BLOCK_MAX_SIZE;

var CLUSTER_SIZE = 16;
var NB_BLOCKS;
var LANDSCAPE = false;
var secondes = 0, millisecondes = 0;
var LEVEL = 1;

var NB_BLOCKS;
var LANDSCAPE = false;
var secondes = 0, millisecondes = 0;

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
            millisecondes+=30;
            if (millisecondes >= 1000){
                secondes++;
                millisecondes -= 1000;
                generator.createBlock();
            }
            $("#timer").text(secondes+'.'+millisecondes/10);

            DragBar("#memoryBar");
            DragMinimap("#cursor", "#memoryBar");

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
            $("#menuGame").prepend('<div id="popNewGame" class="customfont menu">'+
                                     '<div class="startOption"><div style="margin-bottom:-5px">partition size</div>'+
                                        '<input type="range" min="15360" max="30720" step="2560" name="fType" align="left"></input>'+
                                        '<div id="fTypeDisplay"></div></div>'+
                                     '<div class="startOption"><div style="margin-bottom:-5px">File max size</div>'+
                                        '<input type="range" name="bmSize" min="1024" max="2048" step="1024" align="left"></input><div id="bmSizeDisplay"></div></div>'+
                                     '<div id="launchIt" class="animated infinite flash2" style="margin-bottom:0px"><p>Launch game</p></div></div>'
                                    );

            $("#launchIt").click(function (){
                console.log("click exit menu");
                BLOCK_MAX_SIZE=$("input[name=bmSize]").val();
                NB_BLOCKS = $("input[name=fType]").val()/512;
                console.log("NB_BLOCKS :"+NB_BLOCKS+"\nBLOCK_MAX_SIZE :"+BLOCK_MAX_SIZE);
                BLOCK_MAX_SIZE=$("input[name=bmSize]").val()/16;
                NB_BLOCKS = $("input[name=fType]").val()/512;
    console.log("NB_BLOCKS :"+NB_BLOCKS+"\nBLOCK_MAX_SIZE :"+BLOCK_MAX_SIZE);
                $("#menuGame").remove();
                
                /*
                 * La création de la minibar et de l'affichage du timer se fait ici
                 * pour eviter qu'ils ne soient détruits/recréés à chaque passage en pause
                 */
                $.playground().addGroup("timer",{width:PLAYGROUND_WIDTH/3,height: PLAYGROUND_HEIGHT/10,posx: PLAYGROUND_WIDTH/2-PLAYGROUND_WIDTH/10, posy:50});
                $("#timer").addClass("customfont");
                $("#timer").css("font-size","2em");

                //================================================================
                //Integration temporaire en dur d'une minimap
                $.playground().addGroup('miniMap', { width : PLAYGROUND_WIDTH, height : 300 });
                var memoryBar = new $.gameQuery.Animation({
                    imageURL : "temp/Profile_Header.png"
                });
                var miniMemoryBar = new $.gameQuery.Animation({
                    imageURL : "temp/Profile_Header_Mini.png"
                });
                var cursor = new $.gameQuery.Animation({
                    imageURL : "temp/cursor.png"
                });
                $('#miniMap').addSprite('memoryBar', { // on ajoute un sprite
                    animation : memoryBar, // premier objet instancié
                    height : 50,
                    width : 2400,
                    posy : 150
                });
                $('#miniMap').addSprite('miniMemoryBar', { // on ajoute un sprite
                    animation : miniMemoryBar, // premier objet instancié
                    height : 16,
                    width : 732,
                    posy : 250
                });
                $('#miniMap').addSprite('cursor', { // on ajoute un sprite
                    animation : cursor, // premier objet instancié
                    height : 21,
                    width : 222,
                    posy : 247,
                    posx : 0
                });
                //==============================
                $("#miniMap").y(PLAYGROUND_HEIGHT-300);

                
                changeScreen("game");
            });       

            $("#popNewGame div:last-child").css("margin-bottom","30px");
            $("#popNewGame div:first-child").css("margin-top","50px").css("margin-bottom","20px");
            $("#menuGame").x((PLAYGROUND_WIDTH/2)-($("#menuGame").width()/2));



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
