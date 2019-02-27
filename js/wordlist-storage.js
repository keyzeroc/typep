var wordListStorageName="wordList";
var defaultArray=["cat","dog","book","computer","internet","laptop","android","headphones"];
/**
get @wordList from localStorage 
if it's not in localStorage yet, then set @wordList array to default, and save it to localStorage **/
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
/**
set @wordList to localStorage **/
function setWordList(newList){
	localStorage.setItem(wordListStorageName, JSON.stringify(newList));
}
