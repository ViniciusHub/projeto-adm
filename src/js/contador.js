/*
 Countdown Timer
*/
function updateTimer(e) {
	var t = parseInt(e.dataset.time, 10);

	var r = setInterval(function () {
		// Só atualiza o contador se <main> NÃO tiver a classe 'esconder'
		if (document.querySelector('main').classList.contains('esconder')) return;
		if (t <= 0) {
			clearInterval(r);
			e.innerHTML = "00:00";
			return;
		}
		var n = Math.floor(t / 60),
			o = t % 60,
			i = ("0" + n).slice(-2) + ":" + ("0" + o).slice(-2);
		e.innerHTML = i;
		t--;
	}, 1000);
}
var timerElements = document.querySelectorAll(".timer");
for (var i = 0; i < timerElements.length; i++) {
	updateTimer(timerElements[i]);
}