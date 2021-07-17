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