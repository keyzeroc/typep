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
 * calls function isCharTyped() to highlight any characters that's pressed in order.
 * @param {KeyboardEvent} e - used to get keycode of pressed key, then convert keycode to character.
 */
function keyPress(e){
    if(gameObj.lost) return;
    gameObj.keys+=1;
    gameObj.kpsElem.textContent="KPS: "+Math.round(gameObj.keys/gameObj.seconds*100)/100;
    gameObj.typed+=String.fromCharCode(e.keyCode).toLowerCase();
    isCharTyped();
    wordComplete();
}
/**
 * interates through gameObj.currentWords array,
 * splits currently iterated element(gameObj.currentWords[i]) title attribute into array.
 * arr[0] is a number of arr[1] characters pressed in order.
 * arr[1] is a string - a word(value is set in spawnWord()). 
 * if gameObj.typed last character is equal to (parseInt(arr[0])+1) then:
 * update title increment arr[0] by 1,
 * and change current interated element's(gameObj.currentWords[i]) innerHTML.
 */
function isCharTyped(){
    for(let i = 0;i < gameObj.currentWords.length;i++){
        let arr = gameObj.currentWords[i].getAttribute("title").split(":"); 
        if(gameObj.typed.charAt(gameObj.typed.length-1)==arr[1].charAt(parseInt(arr[0])+1)){
            let newTitle="";
            newTitle=(parseInt(arr[0])+1)+":"+arr[1];
            gameObj.currentWords[i].setAttribute("title",newTitle);
            gameObj.currentWords[i].innerHTML = addSpan(newTitle.split(":"));
        }else{
            gameObj.currentWords[i].setAttribute("title","-1:"+arr[1]);
            gameObj.currentWords[i].innerHTML=arr[1];
            continue;
        }   
    }
}
/**
 * gets splitted title and wraps in span only first arr[0] characters in arr[1],
 * returns wrapped string.
 * example: arr = ["3","headphones"],
 * that means we need to wrap with <span class='typed'></span>
 * only first arr[0] characters (which is 4(0,1,2,3)) in arr[1] ('headphones'),
 * result will look like: "<span class='typed'>head</span>phones" 
 * @param {Array} - array, result of title.split(":").
 */
function addSpan(arr){
    if(arr[0]=="-1") return arr[1];
    return "<span class='typed'>"+arr[1].substring(0,(parseInt(arr[0])+1))+"</span>"+
    arr[1].substring((parseInt(arr[0])+1),arr[1].length);
}
/**
 * interates through gameObj.currentWords array,
 * if gameObj.typed includes any words from gameObj.currentWords -
 * removes those words from gameObj.wordListElem and gameObj.currentWords array,
 * clears gameObj.typed string,
 * counts completed words and calculates WPS (Words Per Second),
 * displays WPS on page.
 * calls resetInnerHTMLAndTitleAttribute() to clear spans on other words (reset highlighted chars).
 */
function wordComplete(){
    if(gameObj.lost) return;
    for(let i = 0; i < gameObj.currentWords.length; i++){
        //if(gameObj.typed.includes(gameObj.currentWords[i].title.split(":")[1])){ //old
        let arr = gameObj.currentWords[i].getAttribute("title").split(":");
        if(arr[0]==arr[1].length-1){ //new
            gameObj.wordListElem.removeChild(gameObj.wordListElem.childNodes[i]);
            gameObj.currentWords.splice(i,1);
            gameObj.typed="";
            gameObj.words++;
            gameObj.wpsElem.textContent="WPS: "+Math.round(gameObj.words/gameObj.seconds*100)/100;
            resetInnerHTMLAndTitleAttribute();
            break; // to complete only 1 word per loop
        }     
    }
}
/**
 * interates through gameObj.currentWords array,
 * sets currently iterated element(gameObj.currentWords[i]) title attribute to "-1:"+arr[1]
 * and sets currently iterated element innerHTML to arr[1].
 */
function resetInnerHTMLAndTitleAttribute(){
    for(let i = 0; i < gameObj.currentWords.length; i++){
        let arr = gameObj.currentWords[i].getAttribute("title").split(":");
        let newTitle="-1:"+arr[1];
        gameObj.currentWords[i].setAttribute("title",newTitle);
        arr = gameObj.currentWords[i].getAttribute("title").split(":");
        gameObj.currentWords[i].innerHTML = addSpan(newTitle.split(":"));
    }
}
/**
 * moves each word 20px down from top.
 * if any words .top property is more than 600px -
 * removes those words from gameObj.wordListElem and gameObj.currentWords array
 * decreases gameObj.lives by 1 for each word,
 * displays gameObj.lives value on page.
 * if gameObj.lives === 0 - sets gameObj.lost to true.
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
 * sets li text content to random word from gameObj.allWords array.
 * sets starting position of li.
 * appends li to gameObj.wordListElem and adds li to gameObj.currentWords array.
 */
function spawnWord(){
    let wordElem = document.createElement("li");
    let text = gameObj.allWords[Math.floor(Math.random() * gameObj.allWords.length)];
    wordElem.innerHTML = text;
    wordElem.setAttribute("title","-1:"+text); // -1 means no char is typed yet
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
        * calls function spawnWord each wordDelay ms.
        */
        timerWord : (setTimeout(function tickTimer() {
            if(gameObj.lost) return;
            spawnWord();
            timerWord = setTimeout(tickTimer, gameObj.wordDelay);    
        }, gameObj.wordDelay)),
        /**
        * calls function tick each tickDelay ms.
        */
        timerTick : (setTimeout(function tickTimer() {
            if(gameObj.lost) return;
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
