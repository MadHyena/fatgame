function Generator(level, maxBlockSize, partSize, clusterSize)
{
	
	this.level = level;
	this.maxBlockSize = maxBlockSize;
	this.partSize = partSize;
	
	this.memorySlotsNumber = partSize/clusterSize;
	
	this.numberOfBlocks = (memorySlotsNumber/2)*(level+level-1);
	
	this.files[4+level];
	
	
	
}

Generator.prototype.generateFilesList = function()
{
	for(i = 0; i < files.length; i++)
		{
			
		}
}

Generator.prototype.createBlock = function()
{
	
}