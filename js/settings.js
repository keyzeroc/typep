/**
 * author: keyzeroc
 * 
 * functions for user to change game settings
 */
/**
 * loads tick delay from localStorage.
 * loads word spawn delay from localStorage.
 * set's tick delay slider value to tick delay value.
 * set's word spawn delay slider value to word spawn delay value.
 * loads words from localStorage and displays them in textarea.
 */
window.onload=function(){
	let wordDelay = getWordDelay();
	let tickDelay = getTickDelay();
	document.querySelector("#wordDelay").value=wordDelay;
	document.querySelector("#tickDelay").value=tickDelay;
	document.querySelector("#tickDelayVal").textContent=tickDelay;
	document.querySelector("#wordDelayVal").textContent=wordDelay;
	document.querySelector("#words").value=loadWords();
}
/**
 * loads words from localStorage .
 * returns formatted string (each word separated by ',').
 */
function loadWords(){
	let currentList = getWordList();
	let result="";
	for(let i=0;i<currentList.length;i++){
		i===currentList.length-1 ? result+=currentList[i] : result+=currentList[i]+",";
	}
	return result;
}
/**
 * called when save button under words is clicked.
 * parses textarea text to array and
 * saves words from textarea to localStorage
 */
function onSaveWords(){
	let array = document.querySelector("#words").value.replace(/\s/g, '').toLowerCase().split(",");
	for(let i=0;i<array.length;i++){
		if(array[i]==""||array[i]==",") array.splice(i,1);
	}
	setWordList(array);
}
/**
 * called when save button under sliders is clicked.
 * gets tick delay slider value and sets tick delay value in localStorage.
 * gets word spawn delay slider value and sets word spawn delay value in localStorage.
 */
function onSaveSliders(){
	let newWordDelay = document.querySelector("#wordDelay").value;
	let newTickDelay = document.querySelector("#tickDelay").value;
	setWordDelay(newWordDelay);
	setTickDelay(newTickDelay);
}
