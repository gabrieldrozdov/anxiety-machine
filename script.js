let body = document.querySelector('body');
function changeColors() {
	if (Math.random() < .5) {
		body.style.setProperty('--primary', `oklch(100% 0.25 ${Math.random()*360})`);
		body.style.setProperty('--secondary', `oklch(50% 0.25 ${Math.random()*360})`);
	} else {
		body.style.setProperty('--primary', `oklch(50% 0.25 ${Math.random()*360})`);
		body.style.setProperty('--secondary', `oklch(100% 0.25 ${Math.random()*360})`);
	}
}
changeColors();

let content = document.querySelector('.content-text');
let inputText = document.querySelector('.input-text');
let sourceText = "I’m not sure.";
let currentIndex = 0;
let loop;

let notes = ['C','D','E','F','G','A','B'];
let accidentals = ["", "#", "b"];
let activeNotes = [];
let synth = new Tone.PolySynth(Tone.Synth).set({
	oscillator: { type: "triangle" },
	envelope: { 
		attack: 0.01,
		decay: 0.01,
		sustain: 0.01,
		release: 0.01
	},
	volume: -5
}).toDestination();

function init() {
	clearTimeout(loop);
	activeNotes = [];
	for (let i=0; i<Math.random()*5+1; i++) {
		let randomAccidental = accidentals[Math.floor(Math.random()*accidentals.length)];
		let randomNote = notes[Math.floor(Math.random()*notes.length)];
		activeNotes.push(randomNote+randomAccidental);
	}
	changeColors();
	content.innerHTML = "";
	currentIndex = 0;
	sourceText = inputText.value;
	addText();
}

function addText() {
	if (content.offsetHeight > window.innerHeight-60) {
		content.innerHTML = '';
	}

	let note = activeNotes[Math.floor(Math.random()*activeNotes.length)];
	if (Math.random() < 0.7) {
		let currentLetter = sourceText[currentIndex];
		content.innerHTML += `<span class="letter" data-type="0">${currentLetter}</span>`;
		synth.triggerAttackRelease(note+"6", 0.05);
	} else {
		let currentLetter = sourceText[Math.floor(Math.random()*sourceText.length)];
		content.innerHTML += `<span class="letter" data-type="1">${currentLetter}</span>`;
		synth.triggerAttackRelease(note+"2", 0.05);
	}

	currentIndex++;
	if (currentIndex >= sourceText.length) {
		currentIndex = 0;
	}

	let delay = Math.random()*600;
	if (Math.random() < .9) {
		delay = Math.random()*150
	}
	loop = setTimeout(addText, delay);
}

inputText.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		init();
	}
});