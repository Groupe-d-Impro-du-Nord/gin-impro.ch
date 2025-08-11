var main = document.getElementById("home");

var tableDecoupe = [];

var counter = 0;
var nbrImg = 62;
var nbrImgMax = 20;

var memory = [0];

var exist = false;

var timeOut;

var nbrColumn = 7;

var player;

function myFunction(x) {
	if (x.matches) {
		// si sur mobile
		nbrImgMax = 11;
		nbrStickers = 32;
		nbrColumn = 4;

		maxX = 7;
		maxY = 30;
	}
}

// Create a MediaQueryList object
var x = window.matchMedia("(max-width: 700px)");

// Call listener function at run time
myFunction(x);

// Attach listener function on state changes
x.addEventListener("change", function () {
	myFunction(x);
});

function generateHome() {
	var imagesAffichees = document.querySelectorAll(".imgDecoupee");
	var randomG = Math.floor(Math.random() * nbrColumn + 1);
	var randomI = Math.floor(Math.random() * nbrColumn + 1);
	var randomN = Math.floor(Math.random() * nbrColumn + 1);
	var randomGinC = Math.floor(Math.random() * nbrColumn + 1);
	var randomGinR = Math.floor(Math.random() * 3 + 1);

	document.querySelector(".lettreGin").style.gridColumnStart = randomGinC;
	document.querySelector(".lettreGin").style.gridRowStart = randomGinR;

	for (var img of tableDecoupe) {
		img.classList.remove("out");
		img.classList.add("in");
	}
	var letterAffichees = document.querySelectorAll(".lettreGin");
	for (var letters of letterAffichees) {
		letters.classList.remove("out");
		letters.classList.add("in");
	}
	for (var img of imagesAffichees) {
		img.remove();
	}

	var imageList = document.querySelectorAll(".imgDecoupee");

	while (imageList.length < nbrImgMax) {
		var rando1 = Math.floor(Math.random() * nbrImg + 1);
		main.prepend(tableDecoupe[rando1]);
		imageList = document.querySelectorAll(".imgDecoupee");
	}

	imagesAffichees = document.querySelectorAll(".imgDecoupee");
	for (img of imagesAffichees) {
		img.style.zIndex = Math.floor(Math.random() * 4 + 1);
	}
}

if (main) {
	for (o = 0; o < nbrImg + 1; o++) {
		tableDecoupe[o] = new Image();
		tableDecoupe[o].src = "images/home/" + o + ".png";
		tableDecoupe[o].classList.add("imgDecoupee");
	}
	generateHome();

	setInterval(function () {
		var imagesAffichees = document.querySelectorAll(".imgDecoupee");
		for (var imgs of imagesAffichees) {
			imgs.classList.add("out");
		}
		var letterAffichees = document.querySelectorAll(".letterHome");
		for (var letters of letterAffichees) {
			letters.classList.add("out");
		}

		timeOut = setTimeout(generateHome, 400);
	}, 6500);

	document.getElementById("home").addEventListener("click", function () {
		generateHome();
		clearTimeout(timeOut);
	});
}

// ------------------------------------------------------------

var nbrAnime = 6;

var animeCounter = 1;
var animeTable = [];
var loadCounter = 1;

var colorTable = [
	[0.749, 0.706, 0.604, 1],
	[0.604, 0.729, 0.749, 1],
	[0.604, 0.639, 0.749, 1],
	// [1, 1, 1, 1]
];

for (var u = 1; u < nbrAnime + 1; u++) {
	$.getJSON("animes/anime" + u + ".json", function (json) {
		animeTable[loadCounter] = json;
		loadCounter++;
		if (loadCounter == nbrAnime) {
			if (player) randomAnime();
		}
	});
}

player = document.querySelector("#anime1");
if (player) player.addEventListener("complete", randomAnime);

var randomC = 0;

function randomAnime() {
	if (animeTable.length == 0) return;

	setTimeout(function () {
		var oldC = randomC;
		while (oldC == randomC) {
			randomC = Math.floor(Math.random() * colorTable.length + 0);
			console.log(oldC, randomC);
		}
		animeTable[animeCounter].layers[0].shapes[0].it[1].c.k =
			colorTable[randomC];

		player.load(JSON.stringify(animeTable[animeCounter]));
	}, 1500);

	animeCounter++;
	if (animeCounter > nbrAnime) animeCounter = 2;
}

$("#menuButton").on("click", function () {
	$("nav").toggleClass("open");
});

var wrapper = document.getElementById("logoWrapper");
var banner = document.getElementById("heroBannerCours");

function generateLogo() {
	var nbrStickers = 21;
	var maxX = 20;
	var maxY = 10;

	for (var e = 1; e < nbrStickers; e++) {
		var sticker = document.createElement("img");
		sticker.classList.add("sticker");

		var num = Math.floor(Math.random() * 135) + 1;
		var randX = Math.floor(Math.random() * maxX) - maxX / 2;
		var randY = Math.floor(Math.random() * maxY) - maxY / 2;
		var randDeg = Math.floor(Math.random() * 100) - 50;

		if (num <= 9) num = "00" + num;
		else if (num <= 99) num = "0" + num;
		sticker.src = "images/stickers/stickerGin-" + num + ".png";
		sticker.style.transform =
			"translate(" +
			randX.toString() +
			"vw, " +
			randY.toString() +
			"vh) rotate(" +
			randDeg.toString() +
			"deg)";
		sticker.style.animationDelay = e / 5 + "s";
		banner.append(sticker);
	}

	for (var i = 0; i < 4; i++) {
		var rando1 = Math.floor(Math.random() * 4) + 1;
		var rando2 = Math.floor(Math.random() * 3) + 1;
		var randX = Math.floor(Math.random() * 30) - 15;
		var randY = Math.floor(Math.random() * 30) - 15;
		var randDeg = Math.floor(Math.random() * 40) - 20;

		console.log(randX, randY);

		var letter = document.createElement("img");
		letter.classList.add("letter");
		letter.style.transform =
			"translate(" +
			randX.toString() +
			"px, " +
			randY.toString() +
			"px) rotate(" +
			randDeg.toString() +
			"deg)";
		letter.style.animationDelay = i / 3 + "s";
		letter.src =
			"images/stickers/logo/" +
			i.toString() +
			rando1.toString() +
			"_" +
			rando2.toString() +
			".png";

		wrapper.append(letter);
	}
}

if (document.getElementById("logoWrapper")) {
	generateLogo();
}
