/*
 * Contient les méthodes permettant d'ajouter des trucs graphiques sans passer par gQ
 */


//addRectangle prend en paramètre width, height, color et text


function addRectangle (id,options) {
	
    var spriteFragment  = $("<div class='pep "+$.gameQuery.spriteCssClass+"'  style='position: absolute; display: block; overflow: hidden; display : table; text-align : center' />");


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
		'border' :  BORDER_SIZE+"px double #FFF",
		left : options.posx,
		top : options.posy
	});
	
	newSpriteElem.append("<span class='customfont' style='vertical-align : middle; display : table-cell'>"+ options.text +"</span>");
    /*
     * Changement de '$.gameQuery.scenegraph.[...]' par '$.gameQuery.playground.[...]'
     * par rapport au drag, le mouvement est limité au parent & scenegraph fait 0 px de haut.
     */
	$.gameQuery.scenegraph.append(newSpriteElem);
	
    /*
     * Definition des handlers pour ce block
     */
    var tichaut = "#"+id;
    var mitzva = document.getElementById(""+id+"");
   
    $(tichaut).pep({
        droppable: '.drop-target',
        useCSSTranslation: false,
        constrainTo: 'window',
        stop: function(){ detectAllCollision(id, ".memorySlot");},
        drag: function(){ highlightCollision(id, ".memorySlot");}
    });
    
    Hammer(mitzva).on("doubletap",function (){
        // split le bloc dans le seul cas où sa taille est superieure à 16
        if (globalBlockList[id].blockSize>16)
        {
            globalBlockList[id].splitBlock();
            $(tichaut).remove();
        }
    });
}