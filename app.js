const fs = require('fs');

document.addEventListener('keydown', ({ code }) => {
	console.log(code);

	let currentKey = code.trim().toLowerCase().replace('arrow', '');

	let keyDocument = document.getElementById(currentKey);

	if(keyDocument != undefined){
		document.getElementById(currentKey).style.backgroundColor = 'red';
	}
});

document.addEventListener('keyup', ({ code }) => {
	console.log(code);

	let currentKey = code.trim().toLowerCase().replace('arrow', '');

	let keyDocument = document.getElementById(currentKey);

	if(keyDocument != undefined){
		document.getElementById(currentKey).style.backgroundColor = '';
	}
});

let keys = JSON.parse(fs.readFileSync('./keys.json').toString());
let main = document.getElementById('main');

for(let key in keys){
	main.innerHTML += `<div id=${key} class="card">${key}</div>`;
}

const update = (key, color) => {
	console.log(key, color, document.getElementById(key));
	document.getElementById(key).style.backgroundColor = color;
};

var keysEvent = fs.createReadStream('./keys.json');

keysEvent.on('end', () => {
	let keys = JSON.parse(fs.readFileSync('./keys.json').toString());
	console.log(keys);
	for(let keyName in keys){
		let color = '';
		console.log(keys[keyName])
		if(keys[keyName]){
			color = 'red';
		}
		update(keyName, color);
	}
});

update('enter', 'blue');