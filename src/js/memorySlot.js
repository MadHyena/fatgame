function MemorySlot(slotNumber, options){

	this.slotNumber = slotNumber;
	this.linkedBlock;
    this.linkedData; 
    this.isFree = true;
	MemorySlotGraph(this.slotNumber, options);	
}

//Permet de lier un block à une case memoire
MemorySlot.prototype.linkBlock = function(block){
	this.linkedBlock = block;
}


function MemorySlotGraph(slotNumber, options){

	var spriteFragment  = $("<div class='memorySlot' style='position: absolute; display: block; overflow: hidden; display : table; text-align : center' />");

	options = $.extend({
		width:          32,
		height:         32,
		color:			"#000000",
		text:			"",
		
		posx:           0,
		posy:           0,
		posz:           0,
		posOffsetX:     0,
		posOffsetY:     0,
		idleCounter:    0,
		currentFrame:   0,
		frameIncrement: 1,
		geometry:       $.gameQuery.GEOMETRY_RECTANGLE,
		angle:          0,
		factor:         1,
		playing:        true,
		factorh:        1,
		factorv:        1
	}, options);

	var newSlot = spriteFragment.clone().attr("id","mem"+slotNumber).css({
		height: options.height,
		width: options.width,
		'background-color': options.color,
		'border' :  BORDER_SIZE + "px solid #FFF",
		left : options.posx,
		top : options.posy
	});

	$("#memory").append(newSlot);
}