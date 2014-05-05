function Memory(size, options)
{
	this.size = size;

	/*Options : 
		width & height : taille physique des cases (surement à adapter à la taille des blocks)
		posy : position à l'écran...
	*/

	options = $.extend({
		width: BLOCK_WIDTH + (BLOCK_WIDTH + BLOCK_HEIGHT)/20,
		height: BLOCK_WIDTH + (BLOCK_WIDTH + BLOCK_HEIGHT)/20,
		posy : 300,			
	}, options);

	var i;

	for(i=0; i<this.size; i++){

		newSlot = new MemorySlot(i, 
		{	
			width : options.width,
			height : options.height,
			posx : i*options.width,
			posy : options.posy
		});
	}
}