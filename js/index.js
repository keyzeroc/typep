var wordList, allWords, currentWords=new Array();
var timerWord, wordDelay;
var timerTick, tickDelay;
var timerSecond, secondDelay=1000;
var lost=false, typed="";
var lives=5, seconds=0, keys=0, words=0;

window.onload=function(){
    wordList = document.querySelector("#wordList");
    window.onkeyup = function(e){ keyPress(e); }
    console.log("tick loaded: "+getTickDelay());
    console.log("word loaded: "+getWordDelay());
    wordDelay=getWordDelay();
    tickDelay=getTickDelay();
    allWords=getWordList();
    unpause();
}    
function keyPress(e){
    if(lost) return;
    keys+=1;
    document.querySelector("#KPS").textContent="KPS: "+Math.round(keys/seconds*100)/100;
    typed+=String.fromCharCode(e.keyCode).toLowerCase();
    wordComplete();
}
function wordComplete(){
    if(lost) return;
    for(let i = 0; i < currentWords.length; i++){
        if(typed.includes(currentWords[i].textContent)){
            wordList.removeChild(wordList.childNodes[i]);
            currentWords.splice(i,1);
            typed="";
            words++;
            document.querySelector("#WPS").textContent="WPS: "+Math.round(words/seconds*100)/100;
        }
    }
}
function tick(){
    for(let i=0;i<currentWords.length;i++){
        if(lost) {
            break;
        }
        if(parseInt(currentWords[i].style.top)>=600){
            wordList.removeChild(wordList.childNodes[i]);
            currentWords.splice(i,1);
            lives--;
            document.querySelector("#lives").textContent="lives: "+lives;
            if(lives===0){ 
                lost=true;
            }
        }else{
            currentWords[i].style.top=(parseInt(currentWords[i].style.top,10)+20)+"px";    
        }
    }
}
function spawnWord(){
    let wordElem = document.createElement("li");
    wordElem.textContent = allWords[Math.floor(Math.random() * allWords.length)];
    wordElem.style.position="fixed";
    wordElem.style.top="65px";
    wordElem.style.marginLeft = (Math.floor(Math.random() * (window.innerWidth-200))+20)+"px";
    wordList.appendChild(wordElem);
    currentWords.push(wordElem);               
}
function onGameOver(){
    // 0.pause game and notify about out of lives
    pause();
    alert("out of lives, words: "+words+". restart page to start again");
    // 1.save highscore
    addNewScore(createScoreObject(
        words,
        document.querySelector("#KPS").textContent,
        document.querySelector("#WPS").textContent,
        tickDelay,
        wordDelay      
    ));
}
function pause(){
    clearTimeout(timerSecond);
    clearTimeout(timerWord);
    clearTimeout(timerTick);
}
function unpause(){
    timerSecond = setTimeout(function tickTimer() {
        seconds++;
        if(lost){
            onGameOver();
            return;
        }
        timerSecond = setTimeout(tickTimer, secondDelay);    
    }, secondDelay);
    timerWord = setTimeout(function tickTimer() {
        spawnWord();
        timerWord = setTimeout(tickTimer, wordDelay);    
    }, wordDelay);
    timerTick = setTimeout(function tickTimer() {
        tick();
        timerTick = setTimeout(tickTimer, tickDelay);    
    }, tickDelay);
}