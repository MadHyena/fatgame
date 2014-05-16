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
		posy : 500,			
	}, options);

	var i;

	for(i=0; i<this.size; i++){

		//Les id des memoryslot n'interfèrent pas avec les blocs vu qu'ils ont un préfixe "mem"
		newSlot = new MemorySlot(i, 
		{	
			width : options.width,
			height : options.height,
			posx : i*options.width + i*((options.width + options.height)/30),
			posy : options.posy
		});

		this.memorySlotList.push(newSlot);
	}
}

Memory.prototype.GetMemorySlot = function(id){

	var i;

	for(i=0;i<this.memorySlotList.length;i++){

		if(this.memorySlotList[i].slotNumber = id){
			return this.memorySlotList[i];
		}
	}
	
}

/*
Etant donné qu'il y a que des classe 
il faut detecter les collision au cas par cas avec des each imbriqués
*/
function detectAllCollision(blockId,  memorySlotClass){

	//$(blockClass).each(function(index){

		console.log("Detect collision with memory");

		var notPlaced = true;
		var BC = globalBlockList[blockId];
        var displayedBlock = $("#"+blockId);

		$(memorySlotClass).each(function(index){
            var idSlot = $(this).attr("id").split("");
            idSlot = idSlot[3];
            var thisSlot = memory.GetMemorySlot(idSlot);
            //console.log(thisSlot.slotNumber);
            //Si les div existent et qu'on "depose" le block
            if(BC!=undefined && $(this)!=undefined){
				//console.log("test collision "+BC.blockColor);

				if(collision(displayedBlock, $(this)) && !displayedBlock.hasClass("placed") && thisSlot.isFree){
					
					//On fait adopter le block par le memorySlot physiquement et dans la classe
					/*pas $(BC) => BC et MEMORY_SLOT_BORDER_SIZE n'existe pas et c'est .x() avec les parenthese pour accéder
					et de toutes façon ben ca marche pas.
					Des truc à la con rapides à corriger mais merci de commit des choses qui AU MOINS ne genèrent pas d'exceptions*/
					//$(BC).x($(this).x + MEMORY_SLOT_BORDER_SIZE);
                    
                    $(this).css("background",BC.blockColor);
                    $(this).addClass("customfont");
                    thisSlot.isFree = false;
                    thisSlot.linkBlock(BC);
                    $(this).text(BC.blockSize);
					displayedBlock.addClass("placed");
                    
                    displayedBlock.remove();
				}
			}
		});
	//});
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