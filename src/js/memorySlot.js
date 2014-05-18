function MemorySlot(slotNumber){

	this.slotNumber = slotNumber;
	this.linkedBlock = undefined;
    this.linkedData = undefined; 
    this.isFree = true;	
}

//Permet de lier un block à une case memoire
MemorySlot.prototype.linkBlock = function(block){
	this.linkedBlock = block;
}


function MemorySlotGraph(slotNumber, options){

	var spriteFragment  = $("<div class='memorySlot' style='z-index:" + -slotNumber + "; position: absolute; display: block; overflow: hidden; display : table; text-align : center' />");
	var spriteFragment2  = $("<div class='memorySlot' style='z-index: -1; position: absolute; display: block; overflow: hidden; display : table; text-align : center' />");

	options = $.extend({
		width:          32,
		height:         32,
		color:			"#000000",
		text:			"",
		posx:           0,
		posy:           0
	}, options);

	//Slot Div 
	var newSlot = spriteFragment.clone().attr("id","mem"+slotNumber).css({
		height: options.height,
		width: options.width,
		'background-color': options.color,
		'border' :  BORDER_SIZE + "px solid #FFF",
		left : options.posx,
		top : options.posy
	});

	//Slot Minimap
	var newMiniSlot = spriteFragment2.clone().attr("id","mini"+slotNumber).css({
		height: PLAYGROUND_WIDTH / NB_BLOCKS,
		width: PLAYGROUND_WIDTH / NB_BLOCKS,
		'background-color': options.color,
		'border' :  1 + "px solid #FFF",
		left : slotNumber * ((PLAYGROUND_WIDTH / NB_BLOCKS)+1),
		top : 0
	});

	$("#memory").append(newSlot);
	$("#miniMemory").append(newMiniSlot);
    
    var michelle = document.getElementById("mem"+slotNumber);

    Hammer(michelle).on("swipeup", function (){

        if( memory.GetMemorySlot(slotNumber).slotNumber != undefined){

            var currentMS = memory.GetMemorySlot(slotNumber); 
            var toDisplay = currentMS.linkedData;
            var blockNumber = toDisplay.attr("id");
            var casePosition = $("#memory").position();

            console.log("Blocknumber : " + blockNumber);

            $.gameQuery.scenegraph.append(toDisplay);
           // toDisplay.css({top: (PLAYGROUND_HEIGHT), left: $("#mem"+slotNumber).position().left});
            currentMS.linkedBlock.supposedY = 40;
            currentMS.linkedBlock.supposedX = $("#mem"+slotNumber).position().left;

            $(toDisplay).pep({
                droppable: '.drop-target',
                useCSSTranslation: false,
                constrainTo: 'window',
                stop: function(){ detectAllCollision(toDisplay.attr("id"), ".memorySlot");}
            });
            
            $("#mem"+slotNumber).css("background","#000");
            $("#mem"+slotNumber).text("");
            $("#mem"+slotNumber).css({width : SLOT_WIDTH+BORDER_SIZE});

            globalBlockList[blockNumber].placed = false;

            currentMS.isFree = true;
            currentMS.linkedBlock = undefined;
            currentMS.linkedData = undefined;

            //S'il y a d'autre slot utilisé on les libère aussi
            if(globalBlockList[blockNumber].blockSize > 16){

	            var nextSlot;

	            for(i=1;i<globalBlockList[blockNumber].blockSize;i++){

	            	nextSlot = memory.GetMemorySlot(slotNumber+i);
	            	nextSlot.isFree = true;
	            	nextSlot.linkedBlock = undefined;
	            }
	        }
        }
    });
    
    
}