"use strict";

// RATINGS
const star1 = document.getElementById("star1");
const star2 = document.getElementById("star2");
const star3 = document.getElementById("star3");
const star4 = document.getElementById("star4");
const star5 = document.getElementById("star5");

const stars = [ star1, star2, star3, star4, star5 ];

const rating = document.getElementById("hiddenRating");

for ( let i=0; i<5; i++ ) {
	// SET RATING IN HIDDEN INPUT
	stars[i].addEventListener("click", (event) => {
		rating.value = i+1;
		for ( let k=rating.value; k<5; k++ ) {
			stars[k].classList.remove("starsHovered");
		}
	});

	// ADD CSS CLASS FOR HOVER COLOR
	stars[i].addEventListener("mouseenter", () => {
		for ( let j=0; j<=i; j++ ) {
			stars[j].classList.add("starsHovered");
		}
	});

	// REMOVE CSS CLASS FOR HOVER COLOR
	stars[i].addEventListener("mouseleave", () => {
		for ( let k=rating.value; k<5; k++ ) {
			stars[k].classList.remove("starsHovered");
		}
	});
}
