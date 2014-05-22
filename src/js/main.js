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
*/
var SCORE=0;
var tappedBlock = 1;
var gameState = "start";
var partyState = "spawn";
var GAME_DURATION = 20; // durée d'un cycle lors de la partie
var PLAYGROUND_HEIGHT;
var PLAYGROUND_WIDTH;
var BLOCK_MAX_SIZE;

var CLUSTER_SIZE = 16;
var NB_BLOCKS;
var LANDSCAPE = false;
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
            if (millisecondes>29)
            {
            	
                millisecondes-=30;
            } 
            else if(secondes != 0) 
            { 
            	console.log(partyState);
                secondes--;
                millisecondes=1000-millisecondes;
                
                    if(secondes%3==0 && partyState == "spawn")
                    {
                    		generator.createBlock();
                    }
                    if(secondes%5==0 && partyState == "spawn" && LEVEL >1 && BLOCK_MAX_SIZE == 64)
                    {
                    	generator.createBlock();
                    }
                    
            } 
            else 
            {
            	if(partyState == "spawn")
            	{
            		
                	secondes= GAME_DURATION; 
                	partyState = "defrag"; 
                	//cleanMemory();
                	console.log("CHANGEMENT:" + partyState);
            	}
            	if(partyState == "defrag" && secondes == 0)
            	{
            		secondes = GAME_DURATION;
            		
            		generator.addFile();
            		
            		LEVEL++;
                    $("#level").text("Niveau : " + LEVEL);

            		
            		partyState = "spawn";
            		console.log("CHANGEMENT:" + partyState);
                    cleanMemory();
                    
                    $("#score").text("Score : " + SCORE);
            	}
            }
            
            makeBlocksFall();

            checkPositions();
            
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

            try{
                PlayMusic("./intro.mp3");      
            }
            catch(err)
            {
                console.log("Music fail");
            }

            try{
                PlayMusic("./intro.mp3");      
            }
            catch(err)
            {
                console.log("Music fail");
            }

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
                '<input type="range" name="bmSize" min="64" max="128" step="64" value="64" align="left"></input><div id="bmSizeDisplay"></div></div>'+
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
                BLOCK_MAX_SIZE=$("input[name=bmSize]").val();
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
                
                $.playground().addGroup("level",{width:PLAYGROUND_WIDTH/3,height: PLAYGROUND_HEIGHT/20,posx: PLAYGROUND_WIDTH/2+PLAYGROUND_WIDTH/6, posy:50});
                $("#level").addClass("customfont");
                $("#level").css("font-size","1em");
                
                $.playground().addGroup("score",{width:PLAYGROUND_WIDTH/3,height: PLAYGROUND_HEIGHT/20,posx: PLAYGROUND_WIDTH/2+PLAYGROUND_WIDTH/6, posy:50+PLAYGROUND_HEIGHT/20});
                $("#score").addClass("customfont");
                $("#score").css("font-size","1em");
                

                //================================================================

                //Barre memoire

                //Width = Taille d'une case * nbCase(taille memoire)
                // posy affecté par posy et top (cf affichage avec debugger), donc à diviser par 2
                $.playground().addGroup('memory', { width : (SLOT_WIDTH+BORDER_SIZE)*NB_BLOCKS, height : BLOCK_HEIGHT * 4, posy : (PLAYGROUND_HEIGHT- (BLOCK_HEIGHT*2.5))/2 - 1.5*BLOCK_HEIGHT});
                $.playground().addGroup('miniMemory', { width : PLAYGROUND_HEIGHT, posy : PLAYGROUND_HEIGHT - 40});
                //$.playground().addGroup('miniMemoryCursor', { width : PLAYGROUND_HEIGHT, height : 50, posy : PLAYGROUND_HEIGHT - 40});

                $("#miniMemory").append("<div id='miniMemoryCursor' style='z-index:1;'></div>");

                var memoryWidth = parseInt($("#memory").css("width").split("px")[0]);
                var cursorWidth = PLAYGROUND_WIDTH / (memoryWidth / PLAYGROUND_WIDTH);

                $("#miniMemoryCursor").css({
                    height: PLAYGROUND_WIDTH / NB_BLOCKS,
                    width: cursorWidth,
                    'border' : "5px solid #FF0000",
                    left : 0,
                    top : -4
                })

                memory = new Memory(NB_BLOCKS, { posy : 3*BLOCK_HEIGHT}); //Le div memory doit avoir une assez grande largeur pour être drag de n'importe où donc la position des slot doit être décalé
                $("#memory").pep({ axis: 'x', drag: function(){ dragMemory(); }});
                $("#miniMemoryCursor").pep({ axis: 'x', drag: function(){ dragMiniMap(); }});

                try{
                	PlayMusic("./music.mp3");      
                }
                catch(err)
                {
                	console.log("Music fail");
                }
                
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
            
            $("#level").text("Niveau : " + LEVEL);
            $("#score").text("Score : " + SCORE);
            
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
            $("#menuGameOver").append('<p><div class="animated infinite pulse"><h1>Game Over</h1></div></p> <p style="margin-top:60px">Score: <div id="score"></div></p><div id="launchNewGame" style="margin-top:60px"><p><h2>New game</h2></p></div>');
            $("#score").append(SCORE);
            // handler pour nouvelle partie
            $("#launchNewGame").click(function (){
                $.playground().clearAll();
                partyState="spawn";
                memory=null;
                LEVEL=1;
                millisecondes=0;
                secondes = GAME_DURATION;
                generator = new Generator();
                changeScreen("menu");
            });
            break;

        default : break;
	
	}
    
}

// supprime les fichiers dont tous les blocs sont adjacents en fin de defrag
function blockDeletion()
{
    var i;
    var bonusPoints = 1;
    var toDestroy = new Array(); // contient les id de bloc memoire à supprimer
    
    var count = 0;
    var tempDestroy = new Array();
    for(i=0;i<NB_BLOCKS-1;i++)
    {
    	try
    	{
	    	var block1 = memory.GetMemorySlot(i).linkedBlock;
	    	var block2 = memory.GetMemorySlot(i+1).linkedBlock;
    	}
    	catch(err)
    	{
    		console.log("Empty slot")
    	}
    	//on vérifie si il y a bien des blocs dans chaque case que l'on va vérfier
    	if(block1!=undefined)
    	{
        	
    		//si on a un bloc différent/pas de bloc c'est qu'on a atteint la fin de cette série de blocs du même fichier
    		if(block2 == undefined || block1.ownerFile != block2.ownerFile)
    		{
    			//on compte le dernier bloc
    			count++;
    			tempDestroy.push(i - block1.blockSize/16 +1);
    			
    			console.log("Nombre de blocs alignés : " +count);
    			console.log("Taille du fichier : " + block1.ownerFile.blockList.length);
    			
    			// si on a effectivement autant de blocs qu'il y a de blocs dans le fichier, on ajoute nos blocs à supprimmer à toDestroy
    			if(block1.ownerFile.blockList.length == count)
    			{
    				toDestroy = $.merge(toDestroy, tempDestroy);
    			}
    			
    			//on réinitialise nos compteurs
    			count = 0;
    			tempDestroy = new Array();
    		}
    		else if(block1.id != block2.id && block1.ownerFile == block2.ownerFile)
    		{ //on vérifie qu'ils appartiennent au même fichier et qu'ils ne soient pas le même bloc
                //si les blocs appartiennent au même fichier on compte un de plus
    			count++;
    			console.log(i+ " " + block1.blockSize/16);
    			tempDestroy.push(i - block1.blockSize/16 +1);
    			console.log("bloc : " + block1.id + " fichier : "+ block1.ownerFile.fileID);
            }
        } 
    }
    console.log(toDestroy);
    
    //pour chaque bloc à supprimer
    for(var i=0;i<toDestroy.length;i++){

    	var block = globalBlockList[memory.GetMemorySlot(toDestroy[j]).linkedBlock.id];

    	//console.log(toDestroy);

    	console.log("changing #mem" + toDestroy[j]);
    	$("#mem"+toDestroy[j]).css("background","#000");
    	$("#mem"+toDestroy[j]).text("");
    	$("#mem"+toDestroy[j]).css({width : SLOT_WIDTH+BORDER_SIZE});

    	block.placed = false;

    	if(block.blockSize>16)
    	{

    		//console.log("la taille est effectivement superieur à 16");

    		for(var k = 0; k < block.blockSize/CLUSTER_SIZE; k++)
    		{

    			var nextSlot = memory.GetMemorySlot(j+k);
    			nextSlot.linkedBlock = undefined;
    			memory.GetMemorySlot(toDestroy[j]).linkedData = undefined;

    		}
    	}
    	block.ownerFile = new File(block.ownerFile.fileID);
    	memory.GetMemorySlot(toDestroy[j]).isFree = true;
    	memory.GetMemorySlot(toDestroy[j]).linkedBlock = undefined;
    	memory.GetMemorySlot(toDestroy[j]).linkedData = undefined;

    }
    MiniMemorySlotColorSet();

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
