/*
 * Contient les méthodes permettant d'ajouter des trucs graphiques sans passer par gQ
 */


//addRectangle prend en paramètre width, height, color et text


function addRectangle (id,options) {
	
    var spriteFragment  = $("<div class='"+$.gameQuery.spriteCssClass+"'  style='position: absolute; display: block; overflow: hidden; display : table; text-align : center' />");


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

	var newSpriteElem = spriteFragment.clone().attr("id",id).css({
		height: options.height,
		width: options.width,
		'background-color': options.color,
		'border' :  (options.width + options.height)/20 + "px double #FFF",
		left : options.posx,
		top : options.posy
	});
	
	newSpriteElem.append("<span class='customfont' style='vertical-align : middle; display : table-cell'>"+ options.text +"</span>");

	$.gameQuery.scenegraph.append(newSpriteElem);
	
}