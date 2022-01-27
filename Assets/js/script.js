var sectionSelectors = document.querySelectorAll("section");
var startQuizBtn = document.querySelector("#startQuiz");
var timerElement = document.querySelector("#timerCount");
var questionElement = document.querySelector("#question");
var optionsElement = document.querySelector("#options");
var finalScoreElement = document.querySelector("#finalScore");
var initialsSubmitBtn = document.querySelector("#initialsSubmit");
var highScoresListElement = document.querySelector("#list");
var goBackBtn = document.querySelector("#goBack");
var clearScoresBtn = document.querySelector("#clearScores");
var highScoresLink = document.querySelector("#HighScoresLink");
var initailsElement = document.querySelector("#initials");

var timerCount;
var correct = "Correct!";
var wrong = "Wrong!";
var score = 0;
var scoreList = [];
var userScore = {
    initials:"",
    score:0
};
var questions = [
    {
        "Question":"Commonly used data types DO NOT include:",
        "Options":["strings","booleans","alerts","numbers"],
        "AnswerIndex":2
    },
    {
        "Question":"The condition in an if/else statement is enclosed within _____",
        "Options":["quotes","curly brackets","parenthesis","square brackets"],
        "AnswerIndex":2
    },
    {
        "Question":"Arrays in Javascript can be used to store ____",
        "Options":["numbers and strings","other arrays","booleans","all of the above"],
        "AnswerIndex":3
    },
    {
        "Question":"String values must be enclosed within _____ when being assigned to variables.",
        "Options":["commas","curly brackets","quotes","parenthesis"],
        "AnswerIndex":2
    },
    
    {
        "Question":"A very useful tool used during development and debugging for printing content to the debugger is:",
        "Options":["JavaScript","terminal/bash","for loops","console.log"],
        "AnswerIndex":3
    }
]

function init(){
    timerElement.textContent = 100;
    score = 0;
    initailsElement.value = "";
    scoreList = [];
    userScore = {
        initials:"",
        score:0
    };

    sectionSelectors.forEach(element => {
        if(element.id == "start"){
            element.setAttribute("class","show")
        }
        else{
            element.setAttribute("class","hide")
        }
    });
}

function startQuiz(){
    timerCount = 100;

    var resultElement = document.querySelector("#result");
    resultElement.textContent = '';

    startTimer();
    loadQuestion(0);
}

function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      // Tests if time has run out
      if (timerCount === 0) {
        // Clears interval
        clearInterval(timer);
        timeOutAlert();
      }
    }, 1000);
  }

  function loadQuestion(index){
    optionsElement.innerHTML = '';

    sectionSelectors.forEach(element => {
        if(element.id == "quiz"){
            element.setAttribute("class","show")
        }
        else{
            element.setAttribute("class","hide")
        }
    });

    if(index < questions.length){
        questionElement.textContent = questions[index].Question;
        questionElement.dataset.index = index;
        questions[index].Options.forEach(option =>{
        var optionLi = document.createElement('li');
        var btnElement = document.createElement('button');
        btnElement.dataset.optionIndex = questions[index].Options.indexOf(option);
        btnElement.textContent = (questions[index].Options.indexOf(option) + 1)+'. ' + option;
        optionLi.appendChild(btnElement);
        btnElement.setAttribute("class","btn");
        optionsElement.appendChild(optionLi);
    });
    optionsElement.dataset.index = index;
    }
    else{
        //loadScoreboard();
    }
    
  }

function validateResult(questionIndex, selectedOption){
    var resultElement = document.querySelector("#result");

    if(questions[questionIndex].AnswerIndex == selectedOption){
        score = score + 11;
        console.log("Q"+questionIndex+"\n Score"+score);
        return correct;
    }
    else{
        timerCount = timerCount - 10;
        return wrong;
    }
}

function loadScoreboard(result){
    sectionSelectors.forEach(element => {
        if(element.id == "score"){
            element.setAttribute("class","show");
        }
        else{
            element.setAttribute("class","hide");
        }
    });
    finalScoreElement.textContent = score;
    document.querySelector("#finalQuesresult").textContent = result;
}

function addScoreToList(){
    clearInterval(timer);
    userScore.initials = initailsElement.value;
    userScore.score = parseInt(document.querySelector("#finalScore").textContent);
    scoreList.push(userScore);
    localStorage.setItem("scorelist",JSON.stringify(scoreList));
    loadHighScores();
}

function loadHighScores(){
    scoreList = JSON.parse(localStorage.getItem("scorelist"));
    scoreList.sort(function(x,y){return parseInt(y.score) - parseInt(x.score)});
    sectionSelectors.forEach(element => {
        if(element.id == "viewHighScores"){
            element.setAttribute("class","show")
        }
        else{
            element.setAttribute("class","hide")
        }
    });

    scoreList.forEach(element => {
        var liEl = document.createElement('li');
        liEl.textContent = element.initials + " - "+element.score;
        highScoresListElement.appendChild(liEl);
    });
}

function timeOutAlert(){
    window.alert("Oops!! Time up!\nPlease start the test again.");
    init();
}

init();

startQuizBtn.addEventListener("click",startQuiz);

optionsElement.addEventListener("click",function(event){

    var selectedOptionIndex = parseInt(event.target.dataset.optionIndex);
    var currentQuestionIndex = parseInt(questionElement.dataset.index);

    var result = validateResult(currentQuestionIndex, selectedOptionIndex);
    if(currentQuestionIndex <4){
        loadQuestion(currentQuestionIndex + 1);
    }
    else{
        loadScoreboard(result);
    }
    document.querySelector("#result").textContent = result;
});

initialsSubmitBtn.addEventListener("click",addScoreToList);

goBackBtn.addEventListener("click",init);

clearScores.addEventListener("click",function(){
    localStorage.setItem("scorelist","");
    highScoresListElement.innerHTML = '';
    scoreList = [];
});

initailsElement.addEventListener("input",function(){
    document.querySelector("#finalQuesresult").textContent = "";
});

highScoresLink.addEventListener("click",loadHighScores);
