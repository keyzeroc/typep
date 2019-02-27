var wordDelayName="wordDelay";
var tickDelayName="tickDelay";
var tickDefault=700, wordDefault=1000;
/**
set @wordDelay value in localStorage  **/
function setWordDelay(value){
	localStorage.setItem(wordDelayName, value);	
}
/**
set @tickDelay value in localStorage  **/
function setTickDelay(value){
	localStorage.setItem(tickDelayName, value);	
}
/**
get @wordDelay value from localStorage  
if it's not in localStorage yet, then set @wordDelay value to default, and save it to localStorage **/
function getWordDelay(){
	if(localStorage.getItem(wordDelayName)!=null){
		return localStorage.getItem(wordDelayName);
	}else{
		setWordDelay(wordDefault);
		getWordDelay();
	}
}
/**
get @tickDelay value from localStorage  
if it's not in localStorage yet, then set @tickDelay value to default, and save it to localStorage **/
function getTickDelay(){
	if(localStorage.getItem(tickDelayName)!=null){
		return localStorage.getItem(tickDelayName);
	}else{
		setTickDelay(tickDefault);
		getTickDelay();
	}
}