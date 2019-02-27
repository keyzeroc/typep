var wordList, allWords, currentWords=new Array();
var timerWord, wordDelay;
var timerTick, tickDelay;
var timerSecond, secondDelay=1000;
var lost=false, typed="";
var lives=5, seconds=0, keys=0, words=0;
/**
set @wordList, setup key listener, load delays, load @allWords, start game **/
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
/**
adds pressed key to @typed and calls function to chec if any word is complete **/
function keyPress(e){
    if(lost) return;
    keys+=1;
    document.querySelector("#KPS").textContent="KPS: "+Math.round(keys/seconds*100)/100;
    typed+=String.fromCharCode(e.keyCode).toLowerCase();
    wordComplete();
}
/**
if var @typed contains any word from @currentWords array 
then delete this word from currentWords and reset @typed **/
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
/**
move each word 20px down
if any word is lower than 600px from top then decrease @lives by 1 **/
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
/**
create word and setup it **/
function spawnWord(){
    let wordElem = document.createElement("li");
    wordElem.textContent = allWords[Math.floor(Math.random() * allWords.length)];
    wordElem.style.position="fixed";
    wordElem.style.top="65px";
    wordElem.style.marginLeft = (Math.floor(Math.random() * (window.innerWidth-200))+20)+"px";
    wordList.appendChild(wordElem);
    currentWords.push(wordElem);               
}
/**
ends game
calls @pause to pause everything
alert about game over
save new score to all highscores
**/
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
/**
pause all timeout loops **/
function pause(){
    clearTimeout(timerSecond);
    clearTimeout(timerWord);
    clearTimeout(timerTick);
}
/**
unpause all timeout loops **/
function unpause(){
    /**
    counts seconds and checks if game is over to call @onGameOver **/
    timerSecond = setTimeout(function tickTimer() {
        seconds++;
        if(lost){
            onGameOver();
            return;
        }
        timerSecond = setTimeout(tickTimer, secondDelay);    
    }, secondDelay);
    /**
    calls @spawnWord each @wordDelay **/
    timerWord = setTimeout(function tickTimer() {
        spawnWord();
        timerWord = setTimeout(tickTimer, wordDelay);    
    }, wordDelay);
    /**
    calls @tick each @tickDelay **/
    timerTick = setTimeout(function tickTimer() {
        tick();
        timerTick = setTimeout(tickTimer, tickDelay);    
    }, tickDelay);
}