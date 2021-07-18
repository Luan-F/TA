const key_path = './keys.json';
const fs = require('fs');

document.addEventListener('keydown', ({ code }) => {
	console.log(code);

	let currentKey = code.trim().toLowerCase().replace(/arrow|key|digit/, '');

	let keyDocument = document.getElementById(currentKey);

	if(keyDocument != undefined){
		document.getElementById(currentKey).style.backgroundColor = 'red';
	}
});

document.addEventListener('keyup', ({ code }) => {
	console.log(code);
	
	let currentKey = code.trim().toLowerCase().replace(/arrow|key|digit/, '');

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

fs.watchFile(key_path, (filename, event) => {
	let keys = JSON.parse(fs.readFileSync('./keys.json').toString());
	console.log(keys, filename, event);
	for(let keyName in keys){
		let color = '';
		console.log(keys[keyName])
		if(keys[keyName]){
			color = 'red';
		}
		update(keyName, color);
	}
});