 const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonElement = document.getElementById('answer-buttons');

startButton.addEventListener('click',startGame);
nextButton.addEventListener("click",()=>{
    currentQuestionIndex++;
    setNextQuestion();
})
let shuffledQuestions , currentQuestionIndex;

function startGame(){
    startButton.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() -0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove("hide");
    setNextQuestion();

}

function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}
function showQuestion(question){
    questionElement.innerText = question.question;
    question.answers.foreach((answer)=>{
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click",selectAnswer);
        answerButtonElement.appendchild(button);

})

}
function resetState(){
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    while(answerButtonElement.firstChild){
        answerButtonElement.removeChild(answerButtonElement.firstChild);
    }
}

function selectAnswer(e){
   
    const selectedButton = e.target;
    const corect = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonElement.children).foreach((button)=> {
        setStatusClass(button,button.dataset.correct);
    })
    if(shuffledQuestions.length > currentQuestionIndex+1){
        nextButton.classList.remove("hide");
    }
    else{
        startButton.innerText = "Restart game";
        startButton.classList.remove("hide");
    }
    

}



function setStatusClass(element,correct)
{
    clearStatusClass(element);
    if(correct){
        element.classList.add("correct");
    }
    else{
        element.classList.add("wrong");
    }
}

function clearStatusClass(element){
    element.classList.remove('wrong');
    element.classList.remove("correct");
}
const questions =[
    {
        question : "what is frontend ?",
        answers:[
            {text:"web",correct:false},
            {text:"design",correct:false},
            {text:"web interface",correct:true}
            
        ],
    },
    {
        question: "is react is a framework?",
        answers:[
            {text:"yes", correct:false},
            {text:"no", correct:true}
        ],
    },
];