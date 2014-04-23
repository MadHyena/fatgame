/*
 * A voir: stopper les handlers pendant la pause pour eviter
 * de pouvoir bouger les éléments alors que c'est la pause
 */


/*
	DragNDrop, DragBar : A appeler dans la main loop avec l'id ou la class du div à deplacer
*/
function DragNDrop(id){

	var clickedDiv;

	$(id).mousedown(function() {
	    clickedDiv = $(this);
	});

	$("#minimap").mouseup(function() {
		console.log("mouseup");
	    clickedDiv = false;
	});

	$.playground().mousemove(function() {

	    if(clickedDiv){

	    	//Pour avoir le curseur au centre du sprite pendant le drag n drop
	    	var halfWidth = parseInt($(clickedDiv).css("width").replace(/[^-\d\.]/g, '')) / 2;
	    	var halfHeight = parseInt($(clickedDiv).css("height").replace(/[^-\d\.]/g, '')) / 2;

	    	$(clickedDiv).xy($.gQ.mouseTracker.x - halfWidth, $.gQ.mouseTracker.y - halfHeight);
	    	console.log($(clickedDiv).css("width"));
	    }
	});
}

function DragBar(id){

	console.log("lawl");

	var delta = 0;
	var clickedMemoryBar = false;

	$(id).mousedown(function() {

	    if(delta == 0){
	    	clickedMemoryBar = $(this);
		    delta = $.gQ.mouseTracker.x - $(clickedMemoryBar).x();

		    console.log($(clickedMemoryBar).x());

		   	if(delta < 0){
	    		delta *= -1;
	    	}
	    }
	});

	$("#miniMap").mouseup(function() {
		console.log("mouseup");
	    clickedMemoryBar = false;
	    delta = 0;
	});

	$.playground().mousemove(function() {

	    if(clickedMemoryBar){
	    	$(clickedMemoryBar).x($.gQ.mouseTracker.x - delta, false);
	    }
	});
}

/*
	DragMinimap
	cursor : id du div a déplacer le long de la minimap
	bar : div à déplacer selon la minimap (barre memoire)
*/
function DragMinimap(cursor, bar){

	var delta = 0;
	var clickedCursor = false;
	var limit1 = 0;
	var limit2 = 732;

	$(cursor).mousedown(function() {

	    if(delta == 0){
	    	clickedCursor = $(this);
		    delta = $.gQ.mouseTracker.x - $(clickedCursor).x();

		   	if(delta < 0){
	    		delta *= -1;
	    	}
	    }
	});

	$("#playground").mouseup(function() {
	    clickedCursor = false;
	    delta = 0;
	});

	$.playground().mousemove(function() {

	    if(clickedCursor){
	    	$(clickedCursor).x($.gQ.mouseTracker.x - delta, false);

	    	if($(clickedCursor).x() > limit1 && $(clickedCursor).x() + $(clickedCursor).w() < limit2)
	    		$(bar).x((0 - $(clickedCursor).x()) / (1/3.2), false);

	    	if($(clickedCursor).x() < limit1)
				$(clickedCursor).x(limit1, false);

			if($(clickedCursor).x() + $(clickedCursor).w() > limit2)
				$(clickedCursor).x(limit2 - $(clickedCursor).w(), false);
	    }
	});
}