function Generator(level, maxBlockSize, partSize, clusterSize)
{
	
	this.level = level;
	this.maxBlockSize = maxBlockSize;
	this.partSize = partSize;
	
	this.memorySlotsNumber = partSize/clusterSize;
	
	this.numberOfBlocks = (memorySlotsNumber/2)*(level+level-1);
	
	this.files = new Array();
	
	this.currentBlockId = 0;
	
	
	
}

Generator.prototype.generateFilesList = function()
{
	//la taille maximale de la liste de fichiers est fixée dans file.js
	//on initialie notre liste en leur donnant chacun un id et donc une couleur associée
	for(i = 0; i < 4+level && i < MAXFILES; i++)
		{
			files[i] = new File(i);
		}
}

Generator.prototype.createBlock = function()
{
	var size = 0;
	this.currentBlockId++;	
	
	var file = files[Math.floor(Math.random()*files.length-1)];	//on prend un élément au pif de la liste de fichiers
	
	
	//on détermine la taille du bloc au hasard
	for(i = 0; i < 100; i++)
	{
		if(Math.random() > 0.8)
		{
			number = 256;
		}
		else
		{
			if(Math.random() > 0.5)
			{
				number= 128;
			}
			if(Math.random() > 0.5)
			{
				number += 64;
			}
			if((Math.random() >0.5) || (number == 0))
			{
				number += 32;
			}
		}
		
	}
	
	//une fois qu'on a tous les paramètres requis on crée notre bloc
	newBlock = new Block();
	
}