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
		posy : 300,			
	}, options);

	var i;

	for(i=0; i<this.size; i++){

		//On commence les id à 100 pour ne pas interférer avec les blocks
		newSlot = new MemorySlot(i+100, 
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
Etant donné qu'il n'y a que des classe 
il faut detecter les collision au cas par cas avec des each imbriqués
*/
function detectAllCollision(blockClass, memorySlotClass){

	//$(blockClass).each(function(index){

		notPlaced = true;
		BC = blockClass;

		$(memorySlotClass).each(function(index){

			//Si les div existent et qu'on "depose" le block
			if(BC.length && $(this).length){

				console.log("test collision");

				if(collision(BC, $(this)) && !BC.hasClass("placed")){
					
					//On fait adopté le block par le memorySlot physiquement et dans la classe
					$(this).append(BC);
					BC.addClass("placed");
					BC.css({left : 0, top : 0});
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