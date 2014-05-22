//bon il faudrait le régler sur autre chose que ça mais je sais pas pourquoi il prend pas PLAYGROUND_WIDTH/4
var globalBlockList = new Array();


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
	var size = CLUSTER_SIZE	* (Math.floor(Math.random()*BLOCK_MAX_SIZE/CLUSTER_SIZE)+1);
	
	this.currentBlockId++;	
	
	var file = this.files[Math.floor(Math.random()*this.files.length)];	//on prend un élément au pif de la liste de fichiers
	
	//une fois qu'on a tous les paramètres requis on crée notre bloc
	newBlock = new Block(this.currentBlockId, file, size, PLAYGROUND_WIDTH/16,0 );
	globalBlockList[this.currentBlockId] = newBlock;
}

function makeBlocksFall()
{
	for (var i= 0; i<globalBlockList.length;i++){
        if(globalBlockList[i] != undefined && $("#"+i).hasClass("falling") && !$("#"+i).hasClass("pep-active") ){
            //console.info(globalBlockList);
            var fallingBlock = globalBlockList[i];
            fallingBlock.supposedY++;
            $("#"+i).offset({top : fallingBlock.supposedY});
            if (fallingBlock.supposedY > PLAYGROUND_HEIGHT - 30) 
            	{
            	changeScreen("gameover");
            	}
        }
    }	
	
}
