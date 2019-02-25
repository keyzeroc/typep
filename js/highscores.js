window.onload=function(){
	let scoreArray = getScoreArray();
	if(scoreArray.length===0){
		alert("No scores yet!");
	}else{
		let scoresList = document.querySelector("#highscores");
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