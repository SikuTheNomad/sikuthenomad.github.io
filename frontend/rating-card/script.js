var cardRating = document.getElementById("card-rating");
var cardThankYou = document.getElementById("card-thank-you");

var btnSumbit = document.getElementById("btn-submit");

btnSumbit.addEventListener('click', submitRating);

function submitRating() {
  cardRating.style.display = 'none';
  cardThankYou.style.display = 'grid';
}