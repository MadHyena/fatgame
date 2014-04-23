function Block(id, file, blockSize, x, y)
{
	this.blockColor = file.color;
	this.blockNumber = file.blockList.length +1;
	this.blockSize = blockSize;
	this.x = x;
	this.y = y;
	this.id = id;
	this.ownerFile = file;
	
	this.ownerFile.addBlock(this);
}