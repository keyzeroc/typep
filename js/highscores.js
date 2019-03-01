/**
 * author: keyzeroc
 * 
 * Loads all highscores if present, and displays them on page
 */
window.onload=function(){
	// get highscores array form localStorage.
	let scoreArray = getScoreArray();
	// check if scores present.
	if(scoreArray.length===0){ alert("No scores yet!"); }
	// if scores present then display them on page.
	else{
		let scoresList = document.querySelector("#highscores");
		//append each child elem to parent elem.
		for(let i=0;i<scoreArray.length;i++){
			let scoreElem = document.createElement("li");
			scoreElem.textContent=
			" Words = "+scoreArray[i].words+
			"; KPS = "+scoreArray[i].kps+
			"; WPS = "+scoreArray[i].wps+
			"; with tick delay = "+scoreArray[i].tickDelay+"ms"+
			" and word spawn delay = "+scoreArray[i].wordDelay+"ms";
			scoresList.appendChild(scoreElem);
		}
	}
}