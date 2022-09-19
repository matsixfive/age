export function findDivisions(ms) {
	// console.log(ms)
	let years = ms / 1000 / 60 / 60 / 24 / 365.25;
	let yearsRound = Math.floor(years);
	let remainder = (years - yearsRound) * 1000 * 60 * 60 * 24 * 365.25;

	let days = remainder / 1000 / 60 / 60 / 24;
	let daysRound = Math.floor(days);
	remainder = (days - daysRound) * 1000 * 60 * 60 * 24;

	let hours = remainder / 1000 / 60 / 60;
	let hoursRound = Math.floor(hours);
	remainder = (hours - hoursRound) * 1000 * 60 * 60;

	let minutes = remainder / 1000 / 60;
	let minutesRound = Math.floor(minutes);
	remainder = (minutes - minutesRound) * 1000 * 60;

	let seconds = remainder / 1000;
	let secondsRound = Math.floor(seconds);
	remainder = (seconds - secondsRound) * 1000;

	let milliseconds = remainder;
	let millisecondsRound = Math.floor(milliseconds);
	remainder = milliseconds - millisecondsRound;

	return {
		years: yearsRound,
		days: daysRound,
		hours: hoursRound,
		minutes: minutesRound,
		seconds: secondsRound,
		milliseconds: millisecondsRound,
	};
};