/**
 * author: keyzeroc
 * 
 * functions to work with settings in localStorage
 */
var wordDelayName="wordDelay";
var tickDelayName="tickDelay";
var tickDefault=700, wordDefault=1000;
/**
 * sets word spawn delay value in localStorage.
 * @param {int} value 
 */
function setWordDelay(value){
	localStorage.setItem(wordDelayName, value);	
}
/**
 * sets tick delay value in localStorage.
 * @param {int} value 
 */
function setTickDelay(value){
	localStorage.setItem(tickDelayName, value);	
}
/**
 * gets word spawn delay value from localStorage and returns it.
 * if it's not present, saves default word spawn delay value to localStorage and returns it.
 */
function getWordDelay(){
	if(localStorage.getItem(wordDelayName)!=null){
		return localStorage.getItem(wordDelayName);
	}else{
		setWordDelay(wordDefault);
		getWordDelay();
	}
}
/**
 * gets tick delay value from localStorage and returns it.
 * if it's not present, saves default tick delay value to localStorage and returns it.
 */
function getTickDelay(){
	if(localStorage.getItem(tickDelayName)!=null){
		return localStorage.getItem(tickDelayName);
	}else{
		setTickDelay(tickDefault);
		getTickDelay();
	}
}