const homeScoreEl = document.getElementById("home-score");
const guestScoreEl = document.getElementById("guest-score");

const homeScoreStyle = document.getElementById("home-scorecard");
const guestScoreStyle = document.getElementById("guest-scorecard");

const homeFoulsEl = document.getElementById("home-fouls");
const guestFoulsEl = document.getElementById("guest-fouls");

const timerEl = document.getElementById("timer");
const periodEl = document.getElementById("period");

const gameLength = 12//mins
let timeLeft = 0;

let active = false;
let paused = true;

let timerId;

reset();

function reset() {

	clearInterval(timerId)
	active = false
	homeScoreEl.textContent = 0;
	guestScoreEl.textContent = 0;
	homeFoulsEl.textContent = 0;
	guestFoulsEl.textContent = 0;
	playing = false;
	paused = true;
	timerEl.textContent = "00:00";
	periodEl.textContent = 0;
	timeLeft = 0;
	highlightLeader();

}

function add(points, teamId) {
	const team = document.getElementById(teamId);
	let score = parseInt(team.textContent);
	score += points;
	team.textContent = score;
	highlightLeader();
}

function highlightLeader() {
	let homeScore = parseInt(homeScoreEl.textContent);
	let guestScore = parseInt(guestScoreEl.textContent);
	let scoreDiff = homeScore - guestScore;
	let leaderCheck = Math.sign(scoreDiff);

	console.log(leaderCheck);

	switch (leaderCheck) {
		case 0:
			if (homeScore > 0 || (guestScore > 0 && (scoreDiff = 0))) {
				homeScoreStyle.style.borderColor = "#41D2FA";
				homeScoreStyle.style.boxShadow = "0 0 1rem 0 cyan";
				guestScoreStyle.style.borderColor = "#41D2FA";
				guestScoreStyle.style.boxShadow = "0 0 1rem 0 cyan";
			} else {
				homeScoreStyle.style.borderColor = "#212121";
				homeScoreStyle.style.boxShadow = "0 0 1rem 0 #212121";
				guestScoreStyle.style.borderColor = "#212121";
				guestScoreStyle.style.boxShadow = "0 0 1rem 0 #212121";
				guestScoreStyle;
			}
			break;
		case -1:
			guestScoreStyle.style.borderColor = "#50FA6E";
			guestScoreStyle.style.boxShadow = "0 0 1rem 0 #50FA6E";
			homeScoreStyle.style.borderColor = "#F94F6D";
			homeScoreStyle.style.boxShadow = "0 0 2rem 0 red";
			break;
		case 1:
			homeScoreStyle.style.borderColor = "#50FA6E";
			homeScoreStyle.style.boxShadow = "0 0 1rem 0 #50FA6E";
			guestScoreStyle.style.borderColor = "#F94F6D";
			guestScoreStyle.style.boxShadow = "0 0 2rem 0 red";
	}
}

function displayTime(time) {
	let minutes = Math.floor(time / 1000 / 60);
	let seconds = (time / 1000) % 60;

	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if (seconds < 10) {
		seconds = "0" + seconds;
	}

	timerEl.textContent = minutes + ":" + seconds;
}

function startTimer() {
	if (!paused) {
		return
	} else if (!active && paused) {
		active = true
		paused = false
		timeLeft = gameLength * 60000
		displayTime(timeLeft)
		timerId = setInterval(decTime, 1000)
	} else if (active && paused) {
		clearInterval(timerId)
		timerId = setInterval(decTime, 1000)
	}
}

function pauseTimer() {
	if (active && !paused){
		paused = true
	clearInterval(timerId)
	}
}

function decTime() {
	if (timeLeft === 0) {
		reset()
	} else {
		timeLeft -= 1000
		displayTime(timeLeft)
	}
}