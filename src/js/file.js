var fileColors = ["#15B",	// 1- bleu
                  "#FF001A",	// 2- rouge
                  "#18A100",	// 3- vert
				  "#FF8000",	// 4- orange
                  "#ebdd00",	// 5- jaune
				  "#19EEFF",	// 6- cyan
                  "#800087",	// 7- violay
                  "#CC40DB",	// 8- rose
                  "#AF0",		// 9- vert anis
                  "#738BFF"];	//10- bleu clair

var MAXFILES = 10;

function File(fileNumber)
{
	this.fileID = fileNumber;
	this.color = fileColors[this.fileID];

	this.blockList = new Array(10);

}


File.prototype.addBlock = function(id)
{
	this.blockList.push(id);
}

File.prototype.removeBlock = function(id)
{	
	this.blockList.splice($.inArray(id, this.blockList),1);
}


