function PlaySFX(chemin){

	var sfx = document.getElementById("sfx");

	sfx.src = chemin;
	sfx.play();
}

function PlayMusic(chemin){

	var music = document.getElementById("music");

	music.addEventListener('ended', function() {
	    this.currentTime = 0;
	    this.play();
	}, false);

	music.src = chemin;
	music.play();
}