var scoreStorageName="highscores";
/**
scoreObj constructor **/
function scoreObj(words,kps,wps,tickDelay,wordDelay){
	this.words=words;
	this.kps=kps;
	this.wps=wps;
	this.tickDelay=tickDelay;
	this.wordDelay=wordDelay;
}
/**
create score object by given attributes **/
function createScoreObject(words,kps,wps,tickDelay,wordDelay) {
	return new scoreObj(words,kps,wps,tickDelay,wordDelay);
}
/**
compare function (decr order) **/
function compareScores(a, b) {
  return b.words - a.words;
}
/**
add new score to all scores (score top5 scores only)
if score is not better then any of 5 top scores then it's not added
if score is better then add it to array, sort array, and then remove 6th score from array, so only 5 top remains
**/
function addNewScore(newScoreObj){
	let scoresArray = getScoreArray();
	if(scoresArray.length<5){
		scoresArray.push(newScoreObj);
		scoresArray.sort(compareScores);
		localStorage.setItem(scoreStorageName, JSON.stringify(scoresArray));
	}else{
		if(scoresArray[4].words>newScoreObj.words){
			//ignore if our score isn't good enough
		}else{
			scoresArray.push(newScoreObj); // add new score to all score array
			scoresArray.sort(compareScores); // sort scores in descending order using our function
			scoresArray.splice(5,1); // remove 6th score (worst)
			localStorage.setItem(scoreStorageName, JSON.stringify(scoresArray));
		}
	}
}
/**
get scores array from localStorage **/
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
set scores array in localStorage **/
function setScoreArray(newArray){
	localStorage.setItem(scoreStorageName, JSON.stringify(newArray));
}
/**
clear scores array from localStorage **/
function clearAllScores(){
	localStorage.removeItem(scoreStorageName);
}