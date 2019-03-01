/**
 * author: keyzeroc
 * 
 * functions to work with word list array in localStorage
 */
var wordListStorageName="wordList";
var defaultArray=["cat","dog","book","computer","internet","laptop","android","headphones"];
/**
 * gets word list from localStorage and returns it.
 * if it's not present, saves default word list array to localStorage and returns it.
 */
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
 * sets word list array in localStorage.
 * @param {Array} newList 
 */
function setWordList(newList){
	localStorage.setItem(wordListStorageName, JSON.stringify(newList));
}
