/**
 * author: keyzeroc
 * 
 * functions to work with settings in localStorage
 */
const wordDelayStorageName = "wordDelay";
const tickDelayStorageName = "tickDelay";
const tickDefault = 700;
const wordDefault = 1000;
/**
 * sets word spawn delay value in localStorage.
 * @param {int} value 
 */
function setWordDelay(value){
	localStorage.setItem(wordDelayStorageName, value);	
}
/**
 * sets tick delay value in localStorage.
 * @param {int} value 
 */
function setTickDelay(value){
	localStorage.setItem(tickDelayStorageName, value);	
}
/**
 * gets word spawn delay value from localStorage and returns it.
 * if it's not present, saves default word spawn delay value to localStorage and returns it.
 */
function getWordDelay(){
	if(localStorage.getItem(wordDelayStorageName)!=null){
		return localStorage.getItem(wordDelayStorageName);
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
	if(localStorage.getItem(tickDelayStorageName)!=null){
		return localStorage.getItem(tickDelayStorageName);
	}else{
		setTickDelay(tickDefault);
		getTickDelay();
	}
}