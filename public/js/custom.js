// shared variables start
var currPlayerName;
var pastQuesArr=[];
var currQuestionNumber;
var currScore;
// shared variables end

// Q/A list
var QAs = [
    {
        question : 'Internet is an example of ...',
        options:{
            option1 :'LAN',
            option2 :'MAN',
            option3 :'WAN',
            option4 :'WLAN'
        },
        answer:'WAN'
    },
    {
        question : 'Cell D5 is in the',
        options:{
            option1 :'Fourth row and the fifth column',
            option2 :'Fourth row and the fourth column',
            option3 :'Fifth row and the fifth column',
            option4 :'Fifth row and the fourth column'
        },
        answer:'Fifth row and the fourth column'
    },
    {
        question : 'WAN stands for ...',
        options:{
            option1 :'Wide Area Network',
            option2 :'Wide Arieal Network',
            option3 :'Wide Arieal Net',
            option4 :'Wide Area Net'
        },
        answer:'Wide Area Network'
    },
    {
        question : '... is a form of electronic commerce which allows consumers to directly buy goods or services from a seller over the Internet using a web browser.',
        options:{
            option1 :'Net Banking',
            option2 :'E-Mail',
            option3 :'Online Shopping',
            option4 :'Mobile'
        },
        answer:'Online Shopping'
    },
    {
        question : '... cell is the cell in which we are currently working.',
        options:{
            option1 :'Dead',
            option2 :'Active',
            option3 :'Working',
            option4 :'None of the above'
        },
        answer:'Active'
    },
    {
        question : '... is a presentation program.',
        options:{
            option1 :'PowerPoint',
            option2 :'Excel',
            option3 :'Word',
            option4 :'Paint'
        },
        answer:'PowerPoint'
    },
    {
        question : 'LAN stands for...',
        options:{
            option1 :'Local Area Network',
            option2 :'Local Arieal Net',
            option3 :'Local Area Net',
            option4 :'Large Area Network'
        },
        answer:'Local Area Network'
    },
    {
        question : '... means to move from place to place (one website to another website) on the Internet to search for the topics of interest.',
        options:{
            option1 :'Web Searching',
            option2 :'Downloading',
            option3 :'Web Surfing',
            option4 :'All of these'
        },
        answer:'Web Searching'
    },
    {
        question : 'MAN  stands for...',
        options:{
            option1 :'Metropolitan Area Number',
            option2 :'Metro Area Network',
            option3 :'Metropolitan Area Network',
            option4 :'Metro Arieal Network'
        },
        answer:'Metropolitan Area Network'
    },  
    {
        question : 'ROM stands for ...',
        options:{
            option1 :'Read Only Memory',
            option2 :'Random Only Memory',
            option3 :'Read Open Memory',
            option4 :'None of these'
        },
        answer:'Read Only Memory'
    },  
]

$(document).on('click','#submit-player-name', function(e){
    e.preventDefault();
    currPlayerName = $('#player-name').val().trim();
    if(currPlayerName!=''){
        $('.quiz-ask-name-panel').addClass('d-none');
    $('.quiz-qa-panel').removeClass('d-none');
    $('.quiz-controls').removeClass('d-none');
    $('#curr-player').text(currPlayerName);
    $('#curr-score').text(0);
    currQuestionNumber = randomQuestionGenerator();
    pastQuesArr.push(currQuestionNumber);
    addQuestionAnswerToDOM(QAs[currQuestionNumber]);
    }else{
        $("#empty-field-alert").removeClass('d-none');
    }
});

$(document).on('click','#next-question',function(e){
    let correctAns= QAs[currQuestionNumber].answer;
    // console.log('correctAns',correctAns);
    let answer = $("input[name='quizOptions']:checked").next().text().trim();
    // console.log('answer',answer);
    if(answer!=''){
        if(answer==correctAns){
            currScore = parseInt($('#curr-score').text().trim());
            // console.log('currScore',currScore);
            currScore+=1;
            // console.log('currScoreChanges',currScore);
            $('#curr-score').text(currScore);
            checkQuestionLimit();
        }else{
            $('#wrong-ans-alert-message').html(`<strong>Wrong Answer!</strong> Correct Answer is ${correctAns}. (Please close alert to see next question)`);
            $("#wrong-answer-alert").removeClass('d-none');
            $("input[name='quizOptions']").attr('disabled',true);
            $('#next-question').attr('disabled',true);
        }
    }else{
        $('#blank-ans-alert-message').html(`<strong>No option selected!</strong> Please select one`);
        $("#blank-answer-alert").removeClass('d-none');
        $('#next-question').attr('disabled',true);
    }
});

function addQuestionAnswerToDOM(QAset){
    // console.log('asdas',QAset);
    $('.quiz-question').text(QAset.question);
    $('#option1').next().text(QAset.options.option1);
    $('#option2').next().text(QAset.options.option2);
    $('#option3').next().text(QAset.options.option3);
    $('#option4').next().text(QAset.options.option4);
    $("input[name='quizOptions']").prop('checked',false);
    if(pastQuesArr.length==10){
        $("#next-question").text('Submit');
    }
}

function randomQuestionGenerator(){
    let quesNum;
    do{
        quesNum = Math.floor(Math.random() * 10);
    }while(pastQuesArr.includes(quesNum));
    // console.log('quesNum',quesNum);
    return quesNum;
}

$(document).on('click','#alert-close-btn',function(e){
    e.preventDefault();
    $('#empty-field-alert').addClass('d-none');
});

$(document).on('click','#wrong-ans-alert-close-btn',function(e){
    e.preventDefault();
    $('#wrong-answer-alert').addClass('d-none');
    checkQuestionLimit();
});

$(document).on('click','#blank-ans-alert-close-btn',function(e){
    e.preventDefault();
    $('#blank-answer-alert').addClass('d-none');
});

$(document).on('click','#open-quiz-ask-name-panel',function(e){
    e.preventDefault();
    window.location.reload();
});

$(document).on('click','#open-about-us',function(e){
    e.preventDefault();
    $('.quiz-main-div').addClass('d-none');
    $('.quiz-contact-us').addClass('d-none');
    $('.quiz-about-us').removeClass('d-none');
});

$(document).on('click','#open-contact-us',function(e){
    e.preventDefault();
    $('.quiz-main-div').addClass('d-none');
    $('.quiz-about-us').addClass('d-none');
    $('.quiz-contact-us').removeClass('d-none');
});

function moveToNextQuestion(){
    currQuestionNumber = randomQuestionGenerator();
    pastQuesArr.push(currQuestionNumber);
    addQuestionAnswerToDOM(QAs[currQuestionNumber]);
    $("input[name='quizOptions']").attr('disabled',false);
    $('#next-question').attr('disabled',false);
}

function checkQuestionLimit(){
    if(pastQuesArr.length!=10){
        moveToNextQuestion();
    }else{
        $('.quiz-controls').addClass('d-none');
        $('.quiz-qa-panel').addClass('d-none');
        $('.quiz-ask-name-panel').addClass('d-none');
        $('.quiz-final-score').removeClass('d-none');
        $('#final-score').html(currScore);
    }
}