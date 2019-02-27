window.onload=function(){
	//get scores array from localstorage
	let scoreArray = getScoreArray();
	//if no scores then nothing to display
	if(scoreArray.length===0){
		alert("No scores yet!");
	//if scores exist then display them on page
	}else{
		//get parent element
		let scoresList = document.querySelector("#highscores");
		//append each children to parent element
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