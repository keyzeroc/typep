var wordDelayName="wordDelay";
var tickDelayName="tickDelay";
var tickDefault=700, wordDefault=1000;

function setWordDelay(value){
	localStorage.setItem(wordDelayName, value);	
}
function setTickDelay(value){
	localStorage.setItem(tickDelayName, value);	
}
function getWordDelay(){
	if(localStorage.getItem(wordDelayName)!=null){
		return localStorage.getItem(wordDelayName);
	}else{
		setWordDelay(wordDefault);
		getWordDelay();
	}
}
function getTickDelay(){
	if(localStorage.getItem(tickDelayName)!=null){
		return localStorage.getItem(tickDelayName);
	}else{
		setTickDelay(tickDefault);
		getTickDelay();
	}
}