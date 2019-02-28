/**
 * author: keyzeroc
 * 
 * Game Loop, Logics
 */
var wordList, allWords, currentWords=new Array();
var timerWord, wordDelay;
var timerTick, tickDelay;
var timerSecond, secondDelay=1000;
var lost=false, typed="";
var lives=5, seconds=0, keys=0, words=0;
/** 
 * function is called when the page is fully loaded.
 * adds key listener.
 * loads word list form localStorage.
 * loads tick delay from localStorage.
 * loads word spawn delay from localStorage.
 * unpauses (starts the 'game loop').
 */
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
 * function is called when any key pressed.
 * counts keystrokes and calculates KPS (Keys Per Second).
 * adds pressed key character to all pressed characters string (typed).
 * calls function wordComplete to check if any word is complete.
 * 
 * @param {KeyboardEvent} e - used to get keycode then convert keycode to character.
 */
function keyPress(e){
    if(lost) return;
    keys+=1;
    document.querySelector("#KPS").textContent="KPS: "+Math.round(keys/seconds*100)/100;
    typed+=String.fromCharCode(e.keyCode).toLowerCase();
    wordComplete();
}
/**
 * loops through all currentWords array.
 * if @typed includes any words from @currentWords -
 * removes those words from @wordList and @currentWords array
 * resets @typed string
 * counts completed words and calculates WPS (Words Per Second).
 */
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
 * moves each word 20px down from top.
 * if any words .top property is more than 600px -
 * removes those words from @wordList and @currentWords array
 * decreases @lives by 1 for each word, and shows @lives on page
 * if @lives === 0 - sets @lost to true.
 */
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
 * creates li element, which represents word.
 * sets text content of li.
 * sets starting position of li.
 * appends li to @wordList and adds it to @currentWords array.
 */
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
 * ends game.
 * calls function pause to pause all timers ('game loops').
 * alerts that the game is over.
 * saves new highscore.
 */
function onGameOver(){
    pause();
    alert("out of lives, words: "+words+". restart page to start again");
    addNewScore(createScoreObject(
        words,
        document.querySelector("#KPS").textContent,
        document.querySelector("#WPS").textContent,
        tickDelay,
        wordDelay      
    ));
}
/**
 * clears timeouts on all timers ('game loops').
 */
function pause(){
    clearTimeout(timerSecond);
    clearTimeout(timerWord);
    clearTimeout(timerTick);
}
/**
 * unpauses all timers.
 */
function unpause(){
    /**
    * counts seconds.
    * if game is over (lost === true) - calls function onGameOver.
    */
    timerSecond = setTimeout(function tickTimer() {
        seconds++;
        if(lost){
            onGameOver();
            return;
        }
        timerSecond = setTimeout(tickTimer, secondDelay);    
    }, secondDelay);
    /**
    * calls function @spawnWord each @wordDelay ms.
    */
    timerWord = setTimeout(function tickTimer() {
        spawnWord();
        timerWord = setTimeout(tickTimer, wordDelay);    
    }, wordDelay);
    /**
    * calls function @tick each @tickDelay ms.
    */
    timerTick = setTimeout(function tickTimer() {
        tick();
        timerTick = setTimeout(tickTimer, tickDelay);    
    }, tickDelay);
}
