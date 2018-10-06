class App {
    constructor(params) {
        
    }
    //     this.difficulty = params.difficulty;
    //     this.showHost = 1;
    //     this.questionKey = 0;
    //     this.questions = [
    //         {
    //             question: "What is pusheen's gender?",
    //             choices: {
    //                 1: "Male",
    //                 2: "Female"
    //             },
    //             correctChoice: 2,
    //             alreadyAsked: 0
    //         },            
    //     ];
    // }

    // get backgrounds() {
    //     return this.backgroundsList();
    // }
    
    // get questionList() {
    //     return this.questions();
    // }

    // get questionSeconds() {
    //     if(this.difficulty === 1) {
    //         return 10;
    //     } else if(this.difficulty === 2) {
    //         return 7;
    //     } else if(this.difficulty === 3) { 
    //         return 4;
    //     }
    //     return 0;
    // }

    htmlCard(productObj) {
        var htmlString = '<div class="card text-center">'
                            + '<div class="card-body">'
                                + '<h1 class="card-title">' + productObj.name + '</h1>';
        
        if(productObj.hasOwnProperty('pricingData')) {
            htmlString = htmlString + '<h5 class="card-text">Price: ' + productObj.pricingData.pricePlusTax + '</h5>';
        }

        if(productObj.hasOwnProperty('strain')) {
            htmlString = htmlString + '<h5 class="card-text">Strain: ' + productObj.strain + '</h5>';
        }

        htmlString = htmlString + '<p class="card-text"><small class="text-muted">In Stock</small></p>'                    
                            + '</div>'
                        + '</div>';

        return htmlString;
    }

    // productCardHtml() {
    //     <div class="card text-center">
    //       <div class="card-body">
    //         <h5 class="card-title">Card title</h5>
    //         <p class="card-text">This card has a regular title and short paragraphy of text below it.</p>
    //         <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    //       </div>
    //     </div>

    //     // var x = 0;
    //     // for(var i = 0; i < this.questions.length; i++) {
    //     //     if(this.questions[i].alreadyAsked !== 1) {
    //     //         x = x + 1;
    //     //     }
    //     // }
    //     // return x;
    // }

    // clearQuestion() {
    //     $("#question-text").text("");
    // }

    // nextQuestionKey() {
    //     for(var i = 0; i < this.questions.length; i++) {
    //         if(this.questions[i].alreadyAsked !== 1) {
    //             this.questions[i].alreadyAsked = 1;
    //             return i;
    //         }
    //     }
    // }

    // newQuestion() {
    //     var nextQuestionKey = this.nextQuestionKey();
    //     this.questionKey = nextQuestionKey;
    //     this.writeQuestion(nextQuestionKey);
    //     this.writeChoices(nextQuestionKey);
    // }

    // writeChoices(questionKey) {
    //     var question = this.questions[questionKey];
    //     $(".question-card-choices").empty();
    //     for(var i = 0; i < this.players.length; i++) {
    //         $.each(this.questions[questionKey].choices, function(key, value) {
    //             var btnId = "choice-btn-" + key;
    //             var buttonHtml = '<div class="row p-1"><div class="col-sm"><button id="' + btnId + '" class="btn-sm btn-block game-choice-button" data-player-id="' + i + '" data-question-idx="' + questionKey + '" data-choice="' + key + '">' + value + '</button></div></div>';
    //             $("#question-card-choices-" + i).append(buttonHtml);
    //         });
    //     }
    // }

    // writeQuestion(questionKey) {
    //     var question = this.questions[questionKey].question;
    //     var questionBuild = "";
    //     var secondCount = 200;
        
    //     for(var i = 0; i <= question.length; i++) {
    //         questionBuild = questionBuild + question.charAt(i);
    //         setTimeout(function(questionTextArg) {
    //             $(".question-text").text(questionTextArg);
    //         }, secondCount, questionBuild);
    //         secondCount += 20;
    //     }
    // }

    // backgroundsList() {
    //     return [
    //         'assets/images/Background/bright-countryside-dawn-302804.jpg',
    //         'assets/images/Background/forces-of-nature-lightning-amazing-storm.jpg',
    //         'assets/images/Background/1368568.jpg',
    //         'assets/images/Background/1368591.jpg',
    //         'assets/images/Background/1368585.jpg',
    //         'assets/images/Background/1368606.jpg',
    //         'assets/images/Background/1368626.jpg',
    //         'assets/images/Background/1368636.jpg',
    //         'assets/images/Background/1368640.jpg',
    //         'assets/images/Background/1368654.jpg',
    //         'assets/images/Background/1368673.jpg',
    //         'assets/images/Background/1368681.jpg',
    //         'assets/images/Background/1368734.jpg',
    //         'assets/images/Background/1368764.jpg',
    //         'assets/images/Background/1368769.jpg'
    //     ];
    // }
}