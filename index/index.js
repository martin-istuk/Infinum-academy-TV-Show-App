"use strict";

// INIT

const avgRating = document.getElementById("avgRating");

const reviewText = document.getElementById("reviewText");

const star1 = document.getElementById("star1");
const star2 = document.getElementById("star2");
const star3 = document.getElementById("star3");
const star4 = document.getElementById("star4");
const star5 = document.getElementById("star5");

const stars = [ star1, star2, star3, star4, star5 ];

const ratingInput = document.getElementById("ratingInput");

const initReviews = [
	{ review: "Not great, not terrible.", rating: 3	},
	{ review: "Great, not terrible.", rating: 5 },
	{ review: "Not great, terrible.", rating: 1	}
];

const reviewsList = document.getElementById("reviewsList");





// ADD EVENT LISTENERS FOR HOVER AND NEW REVIEW
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
function renderReviewList() {
	if ( localStorage["reviews"] ) {
		// localStorage present
		let localData = JSON.parse(localStorage.getItem("reviews"));
		reviewsList.innerHTML = "";
		for ( let i=0; i<localData.length; i++) {
			reviewsList.innerHTML +=
				"<div class='review'>" +
					"<p>" + localData[i]["review"] + "</p>" +
					"<p>" +	localData[i]["rating"] + " / 5</p>" +
					"<button type='button' onclick='deleteReview()'>Delete</button>" +
				"</div>"
			;
		}
	} else {
		// localStorage not present
		for ( let i=0; i<initReviews.length; i++) {
			reviewsList.innerHTML +=
				"<div class='review'>" +
					"<p>" + initReviews[i]["review"] + "</p>" +
					"<p>" +	initReviews[i]["rating"] + " / 5</p>" +
					"<button type='button' onclick='deleteReview(event)'>Delete</button>" +
				"</div>"
			;
		}
		let jsonData = JSON.stringify(initReviews);
		localStorage.setItem("reviews", jsonData);
	}
}
renderReviewList();





// CALCULATE AVERAGE RATING
function calcAvgRating() {
	let sum = 0;
	let localData = JSON.parse(localStorage.getItem("reviews"));
	for ( let i=0; i<localData.length; i++ ) {
		sum += localData[i].rating;
	}
	let avg = ( sum / localData.length ).toFixed(1);
	avgRating.innerText = "Average rating: " + avg;
}
calcAvgRating();





// POST NEW REVIEW
function postNewReview() {
	let newReview = {
		review: reviewText.value,
		rating: Number(ratingInput.value)
	};
	let reviewsData = JSON.parse(localStorage.getItem("reviews"));
	reviewsData.push(newReview);
	let jsonData = JSON.stringify(reviewsData);
	localStorage.setItem("reviews", jsonData);

	renderReviewList();
	calcAvgRating();
}





// DELETE A REVIEW
function deleteReview() {
	let reviewToDelete = {
		review: event.target.parentElement.children[0].innerText,
		rating: Number(
			event.target.parentElement.children[1].innerText.charAt(0)
		)
	};
	let reviewsData = JSON.parse(localStorage.getItem("reviews"));
	let index;
	for ( let i=0; i<reviewsData.length; i++ ) {
		if (
			reviewToDelete.review === reviewsData[i].review &&
			reviewToDelete.rating === reviewsData[i].rating
		) {
			index = i;
		}
	}
	reviewsData.splice(index, 1);
	let jsonData = JSON.stringify(reviewsData);
	localStorage.setItem("reviews", jsonData);

	renderReviewList();
	calcAvgRating();
}
