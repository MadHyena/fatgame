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
        console.log("id : " + e.slotNumber + " - isFree : " + e.isFree + " - LinkedBlock : " + e.linkedBlock);
    });
}

/*
Detection eventuelle de collision entre une block et les Slot
*/
function detectAllCollision(blockId,  memorySlotClass){

    var BC = globalBlockList[blockId];
    var displayedBlock = $("#"+blockId);

    $(memorySlotClass).each(function(index){


        if(collision(displayedBlock,$(this))/* && BC.blockSize <= 16*/){

            /* idSlot recupere le l'id de la caseMemoire courante grace à l'id de la div.
            thidSlot est l'objet correspondant a la div courante.*/

            var idSlot = $(this).attr("id").substr(3);
/*
            // gere les blocks memoire
            if (idSlot.length==4){
                idSlot = idSlot[3];
            } else {
                idSlot = idSlot[3]+idSlot[4];
            }
*/
            idSlot = parseInt(idSlot);

            //Test de la possibilité de placer le bloc ====================

            var canPlace = true;

            //Si toutes les cases memoire necessaires existent et sont libres
            for(i=0; i<BC.blockSize / 16; i++){

                if(memory.GetMemorySlot(idSlot + i)){ //S'il elle existe
                    if(!memory.GetMemorySlot(idSlot + i).isFree){ //Si elle est libre
                        canPlace = false;
                    }
                }else{
                    canPlace = false;
                }
            }

            if(canPlace && !BC.placed){

                var currentId;

                //On Deletes visuellement les blocs en trop
                for(i=1; i<BC.blockSize / 16; i++){

                    currentId = idSlot + i;
                    //$("#mem"+currentId).remove();

                    memory.GetMemorySlot(currentId).isFree = false;
                    memory.GetMemorySlot(currentId).linkBlock(BC);
                }

                var initialWidth = parseInt($("#mem"+idSlot).css("width").split("px")[0]);
                var newWidth = initialWidth*i + BORDER_SIZE*i;
                $("#mem"+idSlot).css({width : newWidth});

                var thisSlot = memory.GetMemorySlot(idSlot);

                $(this).css("background",BC.blockColor);
                $(this).addClass("customfont");

                thisSlot.isFree = false;
                thisSlot.linkBlock(BC);
                thisSlot.linkedData = displayedBlock;

                BC.placed = true;

                $(this).text(BC.blockSize);
                displayedBlock.remove();
            }
        }

    });
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
    console.info("collision detected");
    return true;
}

function checkMemoryPos(){

    var currentPosX = $("#memory").position().left;
    var currentWidth = parseInt($("#memory").css("width").split("px")[0]);

    //console.log("current X : " + currentPosX + " - Width : " + currentWidth + " - Limit : " + (-currentWidth + PLAYGROUND_WIDTH));

    if(currentPosX < (-currentWidth + PLAYGROUND_WIDTH - 50)){
        $("#memory").offset({left : -currentWidth + PLAYGROUND_WIDTH - 50});
    }
    else if(currentPosX > 50){
        $("#memory").offset({left : 50});
    }
}