var wordListStorageName="wordList";
var defaultArray=["cat","dog","book","computer","internet","laptop","android","headphones"];
// store top 5 scores only
function getWordList() {
	let itemsArray = localStorage.getItem(wordListStorageName);
	if (itemsArray == null || itemsArray == "") {
		itemsArray = defaultArray;
	}
	else {
		itemsArray = JSON.parse(itemsArray);
	}
	return itemsArray;
}
function setWordList(newList){
	localStorage.setItem(wordListStorageName, JSON.stringify(newList));
}
