// Global variables
const time_el = document.querySelector('.watch .time');
const start_btn = document.getElementById('start');
const stop_btn = document.getElementById("stop");
const reset_btn = document.getElementById("reset");
const submit_btn = document.getElementById("submit");

let seconds = 0;
let interval = null;
//audio signals
var stackAudio = new Audio('maybeStack.mp3');
var checkMidAudio = new Audio('checkMid.mp3');
var sixMinRune = new Audio('sixMinRune.mp3');
var midAudioCount = 0;

// Event listeners
start_btn.addEventListener('click', start);
stop_btn.addEventListener("click", stop);
reset_btn.addEventListener("click", reset);
submit_btn.addEventListener('click', submit);

// Update the timer
function timer () {
	seconds++;

	// Format our time
	let hrs = Math.floor(seconds / 3600);
	let mins = Math.floor((seconds - (hrs * 3600)) / 60);
	let secs = seconds % 60;

	if (secs < 10) secs = '0' + secs;
	if (mins < 10) mins = "0" + mins;
	if (hrs < 10) hrs = "0" + hrs;


	//Stack
	if (secs == 43) {
		if (document.getElementById('check1').checked) stackAudio.play();
	}
	//Check on mid
	if (midAudioCount < 8) {
		if (secs == 30) {
			if (document.getElementById('check2').checked) {
				checkMidAudio.play();
				midAudioCount++;
			}
		}
	}

	//6 min Rune
	if (mins == 5 && secs == 35) {
		if (document.getElementById('check3').checked) {
			sixMinRune.play();
		}
	}

	time_el.innerText = `${hrs}:${mins}:${secs}`;
}

function submit() {
	var thrs = parseInt(document.getElementById('hrsInput').value);
	var tmins = parseInt(document.getElementById('minsInput').value);
	var tsecs = parseInt(document.getElementById('secsInput').value);
	if (!tsecs) tsecs = 0;
	if (!tmins) tmins = 0;
	if (!thrs) thrs = 0;
	seconds = (thrs*3600)+(tmins*60)+(tsecs);
	if (tsecs < 10) tsecs = '0' + tsecs;
	if (tmins < 10) tmins = "0" + tmins;
	if (thrs < 10) thrs = "0" + thrs;
	time_el.innerText = `${thrs}:${tmins}:${tsecs}`;
}

function start () {
	if (interval) {
		return
	}

	interval = setInterval(timer, 1000);
}

function stop () {
	clearInterval(interval);
	interval = null;
}

function reset () {
	stop();
	seconds = 0;
	midAudioCount = 0;
	time_el.innerText = '00:00:00';
}
