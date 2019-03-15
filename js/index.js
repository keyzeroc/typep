/**
 * author: keyzeroc
 * 
 * Game Loop, Game Logics
 */
var gameObj;
var timerObj;
/**
 * calls initGame() when page is fully loaded
 */
window.onload=function(){
    initGame();
}    
/**
 * function is called when any key pressed.
 * counts keystrokes and calculates KPS (Keys Per Second),
 * displays KPS on page.
 * adds pressed key character to all pressed characters string (@gameObj.typed).
 * calls function wordComplete() to check if any word is complete.
 * 
 * @param {KeyboardEvent} e - used to get keycode then convert keycode to character.
 */
function keyPress(e){
    if(gameObj.lost) return;
    gameObj.keys+=1;
    gameObj.kpsElem.textContent="KPS: "+Math.round(gameObj.keys/gameObj.seconds*100)/100;
    gameObj.typed+=String.fromCharCode(e.keyCode).toLowerCase();
    wordComplete();
}
/**
 * interates through @gameObj.currentWords array.
 * if @gameObj.typed includes any words from @gameObj.currentWords -
 * removes those words from @gameObj.wordListElem and @gameObj.currentWords array,
 * clears @gameObj.typed string,
 * counts completed words and calculates WPS (Words Per Second),
 * displays WPS on page.
 */
function wordComplete(){
    if(gameObj.lost) return;
    for(let i = 0; i < gameObj.currentWords.length; i++){
        if(gameObj.typed.includes(gameObj.currentWords[i].textContent)){
            gameObj.wordListElem.removeChild(gameObj.wordListElem.childNodes[i]);
            gameObj.currentWords.splice(i,1);
            gameObj.typed="";
            gameObj.words++;
            gameObj.wpsElem.textContent="WPS: "+Math.round(gameObj.words/gameObj.seconds*100)/100;
        }
    }
}
/**
 * moves each word 20px down from top.
 * if any words .top property is more than 600px -
 * removes those words from @gameObj.wordListElem and @gameObj.currentWords array
 * decreases @gameObj.lives by 1 for each word,
 * displays @gameObj.lives value on page.
 * if @gameObj.lives === 0 - sets @gameObj.lost to true.
 */
function tick(){
    for(let i=0;i<gameObj.currentWords.length;i++){
        if(gameObj.lost) {
            break;
        }
        if(parseInt(gameObj.currentWords[i].style.top)>=600){
            gameObj.wordListElem.removeChild(wordList.childNodes[i]);
            gameObj.currentWords.splice(i,1);
            gameObj.lives--;
            gameObj.livesElem.textContent="lives: "+gameObj.lives;
            if(gameObj.lives===0){ 
                gameObj.lost=true;
            }
        }else{
            gameObj.currentWords[i].style.top=(parseInt(gameObj.currentWords[i].style.top,10)+20)+"px";    
        }
    }
}
/**
 * creates li element, which represents word.
 * sets li text content to random word from @gameObj.allWords array.
 * sets starting position of li.
 * appends li to @gameObj.wordListElem and adds li to @gameObj.currentWords array.
 */
function spawnWord(){
    let wordElem = document.createElement("li");
    wordElem.textContent = gameObj.allWords[Math.floor(Math.random() * gameObj.allWords.length)];
    wordElem.style.position="fixed";
    wordElem.style.top="65px";
    wordElem.style.marginLeft = (Math.floor(Math.random() * (window.innerWidth-200))+20)+"px";
    gameObj.wordListElem.appendChild(wordElem);
    gameObj.currentWords.push(wordElem);               
}
/**
 * ends game.
 * calls function timerObj.pause() to clear timeouts on all timers ('game loops').
 * alerts that the game is over.
 * saves new highscore.
 */
function onGameOver(){
    timerObj.pause();
    alert("out of lives, words: "+gameObj.words+". restart page to start again");
    addNewScore(createScoreObject(
        gameObj.words,
        gameObj.kpsElem.textContent,
        gameObj.wpsElem.textContent,
        gameObj.tickDelay,
        gameObj.wordDelay      
    ));
}
/** 
 * calls function initGameObj() to initialize gameObj.
 * calls function initTimerObj() to initialize timerObj.
 * adds key listener to the page.
 */
function initGame(){
    initGameObj();
    initTimerObj();
    window.onkeyup = function(e){ keyPress(e); }
}
/**
 * initializes gameObj.
 * declares and initializes all the game variables as gameObj properties.
 * loads delays for the timers.
 * loads word list.
 */
function initGameObj(){
    gameObj = {
        wordListElem :  document.querySelector("#wordList"),
        kpsElem      :  document.querySelector("#KPS"),
        wpsElem      :  document.querySelector("#WPS"),
        livesElem    :  document.querySelector("#lives"),
        allWords     :  getWordList(),
        currentWords :  new Array(),
        lost         :  false,
        typed        :  "",
        lives        :  5,
        seconds      :  0,
        keys         :  0,
        words        :  0,
        secondDelay  :  1000,
        wordDelay    :  getWordDelay(),
        tickDelay    :  getTickDelay()
    };
}
/**
 * initializes all game timers (loops)
 */
function initTimerObj(){
    timerObj = {
        /**
        * counts seconds.
        * if game is over (lost === true) - calls function onGameOver.
        */
        timerSecond : (setTimeout(function tickTimer() {
            gameObj.seconds++;
            if(gameObj.lost){
                onGameOver();
                return;
            }
            timerSecond = setTimeout(tickTimer, gameObj.secondDelay);    
        }, gameObj.secondDelay)),
        /**
        * calls function @spawnWord each @wordDelay ms.
        */
        timerWord : (setTimeout(function tickTimer() {
            spawnWord();
            timerWord = setTimeout(tickTimer, gameObj.wordDelay);    
        }, gameObj.wordDelay)),
        /**
        * calls function @tick each @tickDelay ms.
        */
        timerTick : (setTimeout(function tickTimer() {
            tick();
            timerTick = setTimeout(tickTimer, gameObj.tickDelay);    
        }, gameObj.tickDelay)),
        /**
        * clears timeouts on all timers ('game loops').
        */
        pause : function(){
            clearTimeout(timerObj.timerSecond);
            clearTimeout(timerObj.timerWord);
            clearTimeout(timerObj.timerTick);
        }
    }; 
}
