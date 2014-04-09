/*
	DragNDrop, DragBar : A appeler dans la main loop avec l'id ou la class du div à deplacer
*/
function DragNDrop(id){

	var clickedDiv;

	$(id).mousedown(function() {
	    clickedDiv = $(this);
	});

	$("#playground").mouseup(function() {
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

	$("#playground").mouseup(function() {
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