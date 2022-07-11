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
		const localData = JSON.parse(localStorage.getItem("reviews"));
		reviewsList.innerHTML = "";
		for ( let i=0; i<localData.length; i++) {
			let starRating = "";
			for ( let j=1; j<6; j++ ) {
				if ( j <= localData[i].rating ) {
					starRating += "<span class='stars starsHovered'>&#9733;</span>"
				} else {
					starRating += "<span class='stars'>&#9733;</span>"
				}
			}
			reviewsList.innerHTML +=
				"<div class='review'>" +
					"<p>" + localData[i]["review"] + "</p>" +
					"<p>" +	localData[i]["rating"] + " / 5" +
					starRating +
					"</p>" +
					"<button type='button' onclick='deleteReview()'>Delete</button>" +
				"</div>"
			;
		}
	} else {
		// localStorage not present
		for ( let i=0; i<initReviews.length; i++) {
			let starRating = "";
			for ( let j=1; j<6; j++ ) {
				if ( j <= initReviews[i].rating ) {
					starRating += "<span class='stars starsHovered'>&#9733;</span>"
				} else {
					starRating += "<span class='stars'>&#9733;</span>"
				}
			}
			reviewsList.innerHTML +=
				"<div class='review'>" +
					"<p>" + initReviews[i]["review"] + "</p>" +
					"<p>" +	initReviews[i]["rating"] + " / 5" +
					starRating +
					"</p>" +
					"<button type='button' onclick='deleteReview()'>Delete</button>" +
				"</div>"
			;
		}
		const jsonData = JSON.stringify(initReviews);
		localStorage.setItem("reviews", jsonData);
	}
}
renderReviewList();





// CALCULATE AVERAGE RATING
function calcAvgRating() {
	let sum = 0;
	const localData = JSON.parse(localStorage.getItem("reviews"));
	for ( let i=0; i<localData.length; i++ ) {
		sum += localData[i].rating;
	}
	const avg = ( sum / localData.length ).toFixed(1);
	avgRating.innerText = "Average rating: " + avg;
}
calcAvgRating();





// POST NEW REVIEW
function postNewReview() {
	const newReview = {
		review: reviewText.value,
		rating: Number(ratingInput.value)
	};
	const reviewsData = JSON.parse(localStorage.getItem("reviews"));
	reviewsData.push(newReview);
	const jsonData = JSON.stringify(reviewsData);
	localStorage.setItem("reviews", jsonData);

	renderReviewList();
	calcAvgRating();
}





// DELETE A REVIEW
function deleteReview() {
	const reviewToDelete = {
		review: event.target.parentElement.children[0].innerText,
		rating: Number(
			event.target.parentElement.children[1].innerText.charAt(0)
		)
	};
	const reviewsData = JSON.parse(localStorage.getItem("reviews"));
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
	const jsonData = JSON.stringify(reviewsData);
	localStorage.setItem("reviews", jsonData);

	renderReviewList();
	calcAvgRating();
}
