window.onload=function(){
	let wordDelay = getWordDelay();
	let tickDelay = getTickDelay();
	document.querySelector("#wordDelay").value=wordDelay;
	document.querySelector("#tickDelay").value=tickDelay;
	document.querySelector("#tickDelayVal").textContent=tickDelay;
	document.querySelector("#wordDelayVal").textContent=wordDelay;
	document.querySelector("#words").value=loadWords();
}
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
function onSaveWords(){
	let array = document.querySelector("#words").value.replace(/\s/g, '').toLowerCase().split(",");
	for(let i=0;i<array.length;i++){
		if(array[i]==""||array[i]==",") array.splice(i,1);
	}
	setWordList(array);
}
function onSaveSliders(){
	let newWordDelay = document.querySelector("#wordDelay").value;
	let newTickDelay = document.querySelector("#tickDelay").value;
	setWordDelay(newWordDelay);
	setTickDelay(newTickDelay);
}