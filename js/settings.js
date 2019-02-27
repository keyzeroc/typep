/**
load values from localStorage and set it **/
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
load words from localStorage with good look **/
function loadWords(){
	let currentList = getWordList();
	let result="";
	for(let i=0;i<currentList.length;i++){
		if(i===currentList.length-1){
			result+=currentList[i];
		}else{
			result+=currentList[i]+",";
		}	
	}
	return result;
}
/**
called when save button under words clicked
save words to localStorage with @wordList key **/
function onSaveWords(){
	let array = document.querySelector("#words").value.replace(/\s/g, '').toLowerCase().split(",");
	for(let i=0;i<array.length;i++){
		if(array[i]==""||array[i]==",") array.splice(i,1);
	}
	setWordList(array);
}
/**
called when save button under sliders clicked
update @wordDelay and @tickDelay from slider values **/
function onSaveSliders(){
	let newWordDelay = document.querySelector("#wordDelay").value;
	let newTickDelay = document.querySelector("#tickDelay").value;
	setWordDelay(newWordDelay);
	setTickDelay(newTickDelay);
}