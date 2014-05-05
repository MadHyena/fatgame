function MemorySlot(slotNumber, options)
{

	var spriteFragment  = $("<div style='position: absolute; display: block; overflow: hidden; display : table; text-align : center' />");

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
		'border' :  (options.width + options.height)/30 + "px solid #FFF",
		left : options.posx,
		top : options.posy
	});

	$("#memory").append(newSlot);
}