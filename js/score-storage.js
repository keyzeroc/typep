/**
 * author: keyzeroc
 * 
 * functions to work with highscores array in localStorage
 */
const scoreStorageName = "highscores";
/**
 * represents score
 * @constructor
 * @param {int} words - total words user typed.
 * @param {double} kps - user's keys per second.
 * @param {double} wps - users words per second.
 * @param {int} tickDelay - user's tick delay.
 * @param {int} wordDelay - user's word spawn delay.
 */
function scoreObj(words,kps,wps,tickDelay,wordDelay){
	this.words=words;
	this.kps=kps;
	this.wps=wps;
	this.tickDelay=tickDelay;
	this.wordDelay=wordDelay;
}
/**
 * constructs new scoreObj object from given params and returns it.
 * @param {int} words - total words user typed.
 * @param {double} kps - user's keys per second.
 * @param {double} wps - users words per second.
 * @param {int} tickDelay - user's tick delay.
 * @param {int} wordDelay - user's word spawn delay.
 */
function createScoreObject(words,kps,wps,tickDelay,wordDelay) {
	return new scoreObj(words,kps,wps,tickDelay,wordDelay);
}
/**
 * compare function that's used to sort in decreasing order.
 * @param {int} a - first number.
 * @param {int} b - second number.
 */
function compareScores(a, b) {
  return b.words - a.words;
}
/**
 * adds new score to all scores if score is good enough.
 * @param {scoreObj} newScoreObj - score object to store.
 */
function addNewScore(newScoreObj){
	let scoresArray = getScoreArray();
	if(scoresArray.length<5){
		scoresArray.push(newScoreObj);
		scoresArray.sort(compareScores);
		localStorage.setItem(scoreStorageName, JSON.stringify(scoresArray));
	}else{
		if(scoresArray[4].words>newScoreObj.words){
			//ignore if our score isn't good enough.
		}else{
			scoresArray.push(newScoreObj); // add new score to all score array.
			scoresArray.sort(compareScores); // sort scores in descending order using our function.
			scoresArray.splice(5,1); // remove 6th score (worst).
			localStorage.setItem(scoreStorageName, JSON.stringify(scoresArray));
		}
	}
}
/**
 * gets highscores array from localStorage and returns it.
 * if it's not present - creates empty array and returns it.
 */
function getScoreArray() {
	let itemsArray = localStorage.getItem(scoreStorageName);
	if (itemsArray == null || itemsArray =="") {
		itemsArray = new Array();
	}
	else {
		itemsArray = JSON.parse(itemsArray);
	}
	return itemsArray;
}
/**
 * sets highscores array in localStorage.
 * @param {Array} newArray 
 */
function setScoreArray(newArray){
	localStorage.setItem(scoreStorageName, JSON.stringify(newArray));
}
/**
 * clears all highscores in localStorage.
 */
function clearAllScores(){
	localStorage.removeItem(scoreStorageName);
}
