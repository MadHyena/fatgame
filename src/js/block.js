var BLOCK_HEIGHT = 100;
var BLOCK_WIDTH = 100;

var BORDER_SIZE = 8;


function Block(id, file, blockSize, x, y)
{
	//la couleur du bloc
	this.blockColor = file.color;
	
	//sa taille, pourra éventuellement être modifée par un split
	this.blockSize = blockSize;
	
	this.supposedY = y;
	this.supposedX = x;
	
	//son numéro, chaque bloc aura un id différent, recommence à 0 à chaque niveau
	this.id = id;
	
	//chaque bloc est une partie d'un fichier
	this.ownerFile = file;
	
	//on rajoute notre bloc au fichier auquel il doit appartenir
	this.ownerFile.addBlock(this);
	
	//on crée sa représentation graphique
	addRectangle(id, 
			{
				text 	: 	blockSize,
				posx	:	x,
				posy	:	y,
				color	:	this.blockColor,
				width	:	BLOCK_WIDTH*this.blockSize/CLUSTER_SIZE,
				height	:	BLOCK_HEIGHT
			});
	$("#"+id).addClass("falling");
	
}

Block.prototype.splitBlock = function()
{	
	//on calcule la taille de chaque bloc à partir de la taille du premier
	var block1Size = this.blockSize;
	var block2Size = 0;
	
	//Si on a un reste de 0 sur le modulo c'est qu'on peut diviser le bloc en 2 parts égales
	//sinon on le divise en 2 parts inégales
	if(block1Size % CLUSTER_SIZE != 0)
	{
		block2Size = block1Size % CLUSTER_SIZE;
		block1Size -= block2Size;
        /*
         *  permet de limiter le nombre de blocks avec blockSize < 16 
         *  en repartissant le poids.
         *  arrive quand le blockSize est un multiple impair de 16.  
         */
        if ((block1Size/CLUSTER_SIZE)%2 != 0 && block1Size != 16){
            block1Size -= 16;
            block2Size += 16;
        }
	}
	else
	{
		block2Size = block1Size/2;
		block1Size /= 2;
	}
	//on retire ce bloc de la liste des blocs du fichier
	this.ownerFile.removeBlock(this);
	//on en crée un nouveau qu'on ajoute à toutes les listes de blocs auxquelles il doit appartenir
    generator.currentBlockId++;
	newBlock = new Block(generator.currentBlockId, this.ownerFile, block1Size, this.x, this.y);
	this.ownerFile.addBlock(newBlock);
	globalBlockList[generator.currentBlockId] = newBlock;
	
	//on en crée un nouveau avec les mêmes caractéristiques que le premier
	//on incrémente le blockID du générateur pour pas tout foirer
	generator.currentBlockId++;
	newBlock2 = new Block(generator.currentBlockId, this.ownerFile, block2Size, this.x + $("#"+this.id).width, this.y);
	globalBlockList[generator.currentBlockId] = newBlock2;
}

