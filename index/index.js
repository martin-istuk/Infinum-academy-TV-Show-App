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
	stars[i].addEventListener("click", (event) => {
		// SET RATING IN HIDDEN INPUT
		rating.value = i+1;
		// REMOVE CSS CLASS FOR COLOR FOR ALL STARS GREATER THAN RATING
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
