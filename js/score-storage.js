var scoreStorageName="highscores";
// store top 5 scores only
function scoreObj(words,kps,wps,tickDelay,wordDelay){
	this.words=words;
	this.kps=kps;
	this.wps=wps;
	this.tickDelay=tickDelay;
	this.wordDelay=wordDelay;
}
function createScoreObject(words,kps,wps,tickDelay,wordDelay) {
	return new scoreObj(words,kps,wps,tickDelay,wordDelay);
}
function compareScores(a, b) {
  return b.words - a.words;
}
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
function setScoreArray(newArray){
	localStorage.setItem(scoreStorageName, JSON.stringify(newArray));
}
function clearAllScores(){
	localStorage.removeItem(scoreStorageName);
}