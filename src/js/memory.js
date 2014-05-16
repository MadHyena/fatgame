function Memory(size, options)
{
	this.size = size;
	this.memorySlotList = new Array();

	/*Options : 
		width & height : taille physique des cases (surement à adapter à la taille des blocks)
		posy : position à l'écran...
	*/
	options = $.extend({
		width: BLOCK_WIDTH + (BLOCK_WIDTH + BLOCK_HEIGHT)/20 + 20,
		height: BLOCK_WIDTH + (BLOCK_WIDTH + BLOCK_HEIGHT)/20 + 20,
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
			posx : i*options.width + i*((options.width + options.height)/30),
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
	
}

/*
Etant donné qu'il y a des classe 
il faut detecter les collision au cas par cas avec des each
*/
function detectAllCollision(blockId,  memorySlotClass){
    console.log("Detect collision with memory");
    var BC = globalBlockList[blockId];
    var displayedBlock = $("#"+blockId);
    $(memorySlotClass).each(function(index){
        //console.log(displayedBlock +"   "+$(this));
        if(collision(displayedBlock,$(this)) && BC.blockSize <= 16){
            /*
             * idSlot recupere le l'id de la caseMemoire courante grace à l'id de la div.
             * thidSlot est l'objet correspondant a la div courante.
             */
            var idSlot = $(this).attr("id").split("");
            // gere les blocks memoire
            if (idSlot.length==4){
                idSlot = idSlot[3];
            } else {
                idSlot = idSlot[3]+idSlot[4];
            }
            var thisSlot = memory.GetMemorySlot(idSlot);
            console.info(thisSlot.slotNumber +" "+ thisSlot.isFree+ " "+ thisSlot.linkedBlock );
            if (thisSlot.isFree){
                $(this).css("background",BC.blockColor);
                $(this).addClass("customfont");
                thisSlot.isFree = false;
                thisSlot.linkBlock(BC);
                thisSlot.linkedData = displayedBlock;
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