"use strict";

// ADDING NEW REVIEWS
const reviewText = document.getElementById("reviewText");

const star1 = document.getElementById("star1");
const star2 = document.getElementById("star2");
const star3 = document.getElementById("star3");
const star4 = document.getElementById("star4");
const star5 = document.getElementById("star5");

const stars = [ star1, star2, star3, star4, star5 ];

const ratingInput = document.getElementById("ratingInput");

const reviewsList = document.getElementById("reviewsList");

// SET RATING AND CHANGE COLOR OF THE STARS
for ( let i=0; i<5; i++ ) {
	stars[i].addEventListener("click", (event) => {
		// SET RATING IN HIDDEN INPUT
		ratingInput.value = Number(i+1);
		// REMOVE GOLD COLOR FOR VALUES GREATER THAN RATING VALUE
		for ( let k=ratingInput.value; k<5; k++ ) {
			stars[k].classList.remove("starsHovered");
		}
	});

	// ADD GOLD COLOR FOR HOVER EFFECT
	stars[i].addEventListener("mouseenter", () => {
		for ( let j=0; j<=i; j++ ) {
			stars[j].classList.add("starsHovered");
		}
	});

	// REMOVE GOLD COLOR FOR HOVER EFFECT
	stars[i].addEventListener("mouseleave", () => {
		for ( let k=ratingInput.value; k<5; k++ ) {
			stars[k].classList.remove("starsHovered");
		}
	});
}



// ALL REVIEWS LIST
const initReviews = [
	{
		review: "Not great, not terrible.",
		rating: 3
	},
	{
		review: "Great, not terrible.",
		rating: 5
	},
	{
		review: "Not great, terrible.",
		rating: 1
	}
];

function renderReviewList() {
	if ( localStorage["reviews"] ) {
		console.log("ima localStorage");
		let localData = JSON.parse(localStorage.getItem("reviews"));
		reviewsList.innerHTML = "";
		for ( let i=0; i<localData.length; i++) {
			reviewsList.innerHTML +=
				"<div class='review'><p>" +
				localData[i]["review"] +
				"</p><p>" +
				localData[i]["rating"] +
				" / 5" +
				"</p><button type='button' onclick='deleteReview()'>Delete</button></div>"
			;
		}
	} else {
		console.log("nema localStorage");
		let jsonData = JSON.stringify(initReviews);
		localStorage.setItem("reviews", jsonData);
	}
}

renderReviewList();



// POST NEW REVIEW
function postReview() {
	let newPost = {
		review: reviewText.value,
		rating: Number(ratingInput.value)
	};
	let localData = JSON.parse(localStorage.getItem("reviews"));
	localData.push(newPost);
	let jsonData = JSON.stringify(localData);
	localStorage.setItem("reviews", jsonData);

	renderReviewList();
}
