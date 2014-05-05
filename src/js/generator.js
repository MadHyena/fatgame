var currentFallingBlocks = [0,0,0,0];

//bon il faudrait le régler sur autre chose que ça mais je sais pas pourquoi il prend pas PLAYGROUND_WIDTH/4
var OFFSET_FALLING_BLOCKS = 200;


function Generator()
{
	this.numberOfBlocks = (NB_BLOCKS/2)*(LEVEL+LEVEL-1);
	
	this.files = new Array(4+LEVEL);
	
	this.currentBlockId = 0;
	
	this.generateFilesList();	
}

Generator.prototype.generateFilesList = function()
{
	//la taille maximale de la liste de fichiers est fixée dans file.js
	//on initialie notre liste en leur donnant chacun un id et donc une couleur associée
	for(i = 0; i < 4+LEVEL && i < MAXFILES; i++)
		{
			this.files[i] = new File(i);
		}
}

Generator.prototype.getAvailableColumn = function()
{
	var min = 0;
	for(i = 1; i < 4; i++)
	{
		if(currentFallingBlocks[i] < currentFallingBlocks[min])
		{
			min = i;
		}
	}
	
	return min;
}

Generator.prototype.createBlock = function()
{
	console.log("generation du block "+this.currentBlockId);
	//on détermine la taille du bloc au pif
	var size = CLUSTER_SIZE	* (Math.floor(Math.random*8)+1);
	
	this.currentBlockId++;	
	
	var file = this.files[Math.floor(Math.random()*this.files.length)];	//on prend un élément au pif de la liste de fichiers
	
	var column = generator.getAvailableColumn();
	currentFallingBlocks[column]++;
	
	//une fois qu'on a tous les paramètres requis on crée notre bloc
	newBlock = new Block(this.currentBlockId, file, size, column*OFFSET_FALLING_BLOCKS,0 );
	
}