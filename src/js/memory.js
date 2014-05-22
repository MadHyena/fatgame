var SLOT_WIDTH = BLOCK_WIDTH + (BLOCK_WIDTH + BLOCK_HEIGHT)/20 + 20;

function Memory(size, options)
{
	this.size = size;
	this.memorySlotList = new Array();

	/*Options : 
		width & height : taille physique des cases (surement à adapter à la taille des blocks)
		posy : position à l'écran...
	*/
	options = $.extend({
		width: SLOT_WIDTH,
		height: SLOT_WIDTH,
		posy : 200
	}, options);

	var i;

	for(i=0; i<this.size; i++){

		//Les id des memoryslot n'interfèrent pas avec les blocs vu qu'ils ont un préfixe "mem"
		newSlot = new MemorySlot(i);
		this.memorySlotList.push(newSlot);
        MemorySlotGraph(i,{	
			width : options.width,
			height : options.height,
			posx : i*options.width + i*BORDER_SIZE,
			posy : options.posy
		});
	}
}

Memory.prototype.GetMemorySlot = function(id){

	var i;

	for(i=0;i<this.memorySlotList.length;i++){

		if(this.memorySlotList[i].slotNumber == id){
			return this.memorySlotList[i];
		}
	}
	
    return null;
}

Memory.prototype.PrintMemorySlot = function(){

    this.memorySlotList.forEach(function(e){
        //console.log("id : " + e.slotNumber + " - isFree : " + e.isFree + " - LinkedBlock : " + e.linkedBlock);
    });
}

/*
Detection eventuelle de collision entre une block et les Slot
*/
function detectAllCollision(blockId,  memorySlotClass){

    var BC = globalBlockList[blockId];
    var displayedBlock = $("#"+blockId);

    $(memorySlotClass).each(function(index){


        if(collision(displayedBlock,$(this))){

            /* idSlot recupere le l'id de la caseMemoire courante grace à l'id de la div.
            thidSlot est l'objet correspondant a la div courante.*/

        	var idSlot = $(this).attr("id").substr(3);
            idSlot = parseInt(idSlot);

            //Test de la possibilité de placer le bloc ====================
            var canPlace = true;

            //Si toutes les cases memoire necessaires existent et sont libres
            for(i=0; i<BC.blockSize / 16; i++){

                if(memory.GetMemorySlot(idSlot + i)){//S'il elle existe 

                    if(!memory.GetMemorySlot(idSlot + i).isFree){//Si elle est libre 
                        canPlace = false;
                    }
                }else{
                    canPlace = false;
                }
            }

            if(canPlace && !BC.placed)
            {
            	putInSlot(BC, idSlot, this);
                MiniMemorySlotColorSet();

                PlaySFX("./placement.wav");
            }
        }

    });
}

function putInSlot(block, slotId, initSlot)
{
	var currentId = slotId;

    //On Delete visuellement les blocs en trop
    for(i=1; i<block.blockSize / 16; i++){

        currentId = slotId+i;
        //$("#mem"+currentId).remove();

        memory.GetMemorySlot(currentId).isFree = false;
        memory.GetMemorySlot(currentId).linkBlock(block);
    }

    var initialWidth = parseInt($("#mem"+slotId).css("width").split("px")[0]);
    var newWidth = initialWidth*i + BORDER_SIZE*i;
    $("#mem"+slotId).css({width : newWidth});

    var thisSlot = memory.GetMemorySlot(slotId);

    $(initSlot).css("background",block.blockColor);
    $(initSlot).addClass("customfont");

    thisSlot.isFree = false;
    thisSlot.linkBlock(block);
    thisSlot.linkedData = $("#"+block.id);

    block.placed = true;

    $(initSlot).text(block.blockSize);
    $("#"+block.id).remove();
}

function highlightCollision(blockId,  memorySlotClass){

    var BC = globalBlockList[blockId];
    var displayedBlock = $("#"+blockId);

    var firstCollision = false;

    $(memorySlotClass).each(function(index){

        var idSlot = $(this).attr("id").substr(3);
        idSlot = parseInt(idSlot);

        if(collision(displayedBlock,$(this)) && !firstCollision){

            //Test de la possibilité de placer le bloc ====================
            var canPlace = true;
            var slotToHighlight = new Array;

            //Si toutes les cases memoire necessaires existent et sont libres
            for(i=0; i<BC.blockSize / 16; i++){

                if(memory.GetMemorySlot(idSlot + i)){//S'il elle existe 

                    slotToHighlight[i] = idSlot + i;

                    if(!memory.GetMemorySlot(idSlot + i).isFree){//Si elle est libre 
                        canPlace = false;
                    }
                }else{
                    canPlace = false;
                }
            }

            if(canPlace && !BC.placed){

                firstCollision = true;

                for(i=0; i<idSlot; i++){

                    if(memory.GetMemorySlot(i).linkedBlock == undefined)
                        $("#mem"+i).css({ "background-color" : "black" });
                }
                
                for(i=0; i<BC.blockSize / 16; i++){
                    $("#mem"+(idSlot+i)).css({ "background-color" : "#808080" });
                }

                for(i=idSlot + (BC.blockSize / 16); i < NB_BLOCKS - 1; i++){

                    if(memory.GetMemorySlot(i).linkedBlock == undefined)
                        $("#mem"+i).css({ "background-color" : "black" });
                }
            }
        }
        else{
            //$("#mem"+slotToHighlight[i]).css({ "background-color" : "#808080" });
        }

    });

    if(!firstCollision){

        for(i=0; i < NB_BLOCKS - 1; i++){

            if(memory.GetMemorySlot(i).linkedBlock == undefined)
                $("#mem"+i).css({ "background-color" : "black" });
        }
    }
}


function collision($div1, $div2) {

    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
}

function cleanMemory(){

    var fileIds = new Array();
    var i = 0;

    //Listage de tous les ID de block
    memory.memorySlotList.forEach(function(slot){ 
        if(slot.linkedBlock != undefined){

            var alreadyListed = false;
            var j;

            //On regarde si on a pas déjà lister cet ID de block
            for(j=0;j<fileIds.length;j++){ 
                if(fileIds[j] == slot.linkedBlock.ownerFile.fileID)
                    alreadyListed = true;
            }

            if(!alreadyListed){
                fileIds[i] = slot.linkedBlock.ownerFile.fileID;
                i++;
            }

        }
    }); 

    //Pour chaque "fichier" (id block commun) on va voir si les blocs sont chainés
    fileIds.forEach(function(e){

        var nbLinked = 0;

        //On compte combien de slot ont ce bloc lié
        memory.memorySlotList.forEach(function(slot){
            
            if(slot.linkedBlock != undefined && slot.linkedBlock.ownerFile.fileID == e){
                nbLinked++;
            }
        });

        i=0;

        //On parcours jusqu'au premier bloc avec cet ID
        while(memory.GetMemorySlot(i).linkedBlock == undefined || memory.GetMemorySlot(i).linkedBlock.ownerFile.fileID != e)
            i++;

        var chained = true;

        //Enfin on parcours tous les blocs qui sont censé être les uns à la suite des autres à partir du premier
        for(j=i; j < i + nbLinked; j++){
            if(memory.GetMemorySlot(j).linkedBlock == undefined || memory.GetMemorySlot(j).linkedBlock.ownerFile.fileID != e) //Si la "chaine est rompu" avant le nombre total de block présent, c'est qu'il ne se suivent pas
                chained = false;
        }

        if(chained){

            //Même parcours pour les delete cette fois ci
            for(j=i; j < i + nbLinked; j++){
            	
            	SCORE += memory.GetMemorySlot(j).linkedBlock.blockSize;
                
                $("#mem"+j).css("background","#000");
                $("#mem"+j).text("");
                $("#mem"+j).css({width : SLOT_WIDTH+BORDER_SIZE});

                memory.GetMemorySlot(j).isFree = true;
                memory.GetMemorySlot(j).linkedBlock = undefined;
                memory.GetMemorySlot(j).linkedData = undefined;
            }
        }

    });
    
    var perfect = true;
    memory.memorySlotList.forEach(function(slot){
        if(slot.linkedBlock != undefined){
            perfect = false;
        }
    });
    
    if(perfect) SCORE += 1000;

    MiniMemorySlotColorSet();
}

function checkPositions(){

    var currentMemoryPosX = $("#memory").position().left;
    var currentMemoryWidth = parseInt($("#memory").css("width").split("px")[0]);

    var currentCursorPosX = $("#miniMemoryCursor").position().left;
    var currentCursorWidth = parseInt($("#miniMemoryCursor").css("width").split("px")[0]);

    //console.log("current X : " + currentPosX + " - Width : " + currentWidth + " - Limit : " + (-currentWidth + PLAYGROUND_WIDTH));

    //Verif position de la memoire
    if(currentMemoryPosX < (-currentMemoryWidth + PLAYGROUND_WIDTH - 50)){
        $("#memory").offset({left : -currentMemoryWidth + PLAYGROUND_WIDTH - 50});
    }
    else if(currentMemoryPosX > 50){
        $("#memory").offset({left : 50});
    }

    //Verif position curseur minimap
    if(currentCursorPosX < 0){
        $("#miniMemoryCursor").offset({left : 0});
    }
    else if(currentCursorPosX > PLAYGROUND_WIDTH - currentCursorWidth){
        $("#miniMemoryCursor").offset({left : PLAYGROUND_WIDTH - currentCursorWidth});
    }
}

//Déplacement de la vrai barre memoire lors du déplacement de la minimap
function dragMiniMap(){

    var currentCorsorPosition = $("#miniMemoryCursor").position().left;
    var memoryWidth = parseInt($("#memory").css("width").split("px")[0]);
    var ratio = (memoryWidth / PLAYGROUND_WIDTH);

    $("#memory").offset({ left : -currentCorsorPosition * ratio });
}

//Inversement de la fonction précédente
function dragMemory(){

    var currentMemoryPosition = $("#memory").position().left;
    var memoryWidth = parseInt($("#memory").css("width").split("px")[0]);
    var ratio = (memoryWidth / PLAYGROUND_WIDTH);

    $("#miniMemoryCursor").offset({ left : -currentMemoryPosition / ratio });
}