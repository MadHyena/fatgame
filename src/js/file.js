var fileColors = ["#15B",	// 1- bleu
                  "#FF001A",	// 2- rouge
                  "#18A100",	// 3- vert
				  "#FF8000",	// 4- orange
                  "#FEEE00",	// 5- jaune
				  "#19EEFF",	// 6- cyan
                  "#800087",	// 7- violay
                  "#CC40DB",	// 8- rose
                  "#AF0",		// 9- vert anis
                  "#738BFF"];	//10- bleu clair

var maxBlocksInFile = 10;

function File(fileNumber)
{
	this.fileID = fileNumber;
	this.color = fileColors[fileID];

	this.blockList[maxBlocksInFile];

}


File.prototype.addBlock = function(block)
{
	blockList.push(block);
}

File.prototype.addBlockAfter = function(blockToAdd, blockIndex)
{
	blockList.splice($.inArray(blockIndex, blockList),0,blockToAdd);
}

File.prototype.removeBlock = function(block)
{	
	blockList.splice($.inArray(bloc, blockList),1);
}

File.prototype.splitBlock = function(block)
{	
	block.blockSize;
}
