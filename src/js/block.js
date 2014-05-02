var BLOCK_HEIGHT = 100;
var BLOCK_WIDTH = 100;

function Block(id, file, blockSize, x, y)
{
	//la couleur du bloc
	this.blockColor = file.color;
	
	//sa taille, pourra éventuellement être modifée par un split
	this.blockSize = blockSize;
	
	//sa position en x et y
	this.x = x;
	this.y = y;
	
	//son numéro, chaque bloc aura un id différent, recommence à 0 à chaque niveau
	this.id = id;
	
	//chaque bloc est une partie d'un fichier
	this.ownerFile = file;
	
	/*	falling : 	le bloc tombe vers la ligne mémoire
	 * 	dragged	:	le bloc est en train d'être déplacé par le joueur
	 * 	stored	:	le bloc est actuellement stocké dans une case mémoire
	 * 	...
	 */
	this.blockState = "falling";
	
	//on rajoute notre bloc au fichier auquel il doit appartenir
	this.ownerFile.addBlock(this);
	
	//on crée sa représentation graphique
	addRectangle(id, 
			{
				text 	: 	blockSize,
				posx	:	x,
				posy	:	y,
				color	:	this.blockColor,
				width	:	BLOCK_WIDTH,
				height	:	BLOCK_HEIGHT
			});
	
}

Block.prototype.splitBlock = function()
{	
	var block1Size = this.blockSize;
	var block2Size = 0;
	
	if(block1Size % CLUSTER_SIZE != 0)
	{
		block2Size = (block1Size -CLUSTER_SIZE)/2;
		block1Size = block2Size + CLUSTER_SIZE;
	}
	else
	{
		block2Size = block1Size/2;
		block1Size /= 2;
	}
	
	this.ownerFile.removeBlock(this);
	newBlock = new Block(this.id, this.file, block1Size, this.x, this.y);
	this.ownerFile.addBlock(newBlock);
	
	var column = generator.getAvailableColumn();
	newBlock2 = new Block(generator.currentBlockId+1, this.file, block2size, column*OFFSET_FALLING_BLOCKS, this.y);
	
}