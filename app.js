const key_path = './keys.json';
const fs = require('fs');

let {keysConfig, lastSelected} = JSON.parse(fs.readFileSync(key_path).toString());
let main = document.getElementById('main');
let last = document.getElementById('last');
last.innerHTML = lastSelected;

for(let key in keysConfig){
	main.innerHTML += `<div id=${key} class="card">${key}</div>`;
}

const update = (key, color) => {
	// console.log('--', key, '--', color, document.getElementById(key));
	document.getElementById(key).style.backgroundColor = color;
};

fs.watch(key_path, (curr, event) => {
	// console.log(fs.readFileSync(key_path).toJSON())
	let { keysConfig, lastSelected } = JSON.parse(fs.readFileSync(key_path).toString());
	console.log(keysConfig, lastSelected, curr, event);
	let selecteds = false;
	for(let keyName in keysConfig){
		let color = '';
		// console.log(keysConfig[keyName])
		if(keysConfig[keyName]){
			color = 'red';
			selecteds = true;
		}
		update(keyName, color);
	}
	
	if(lastSelected != last.innerHTML){
		last.innerHTML = lastSelected;
	}

	console.log(`=======>${selecteds}`)
	if(!selecteds){
		update('last', 'red');
		// return;
	}
	else{
		update('last', '')
	}
});