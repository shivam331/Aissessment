import {QuestionCode} from './Constants.js'

var mcq_versions_question = []
var version_mcq = (json,reset_question) =>{
  if(reset_question){
    mcq_versions_question = []
  }
  if(json.data.length!= 0){
  let data = json.data.data;
 data.forEach((group,index)=>{
    let question_array =[]
    for(let questions of group.questions_list){
      let options = [];
      let count  = 0
      let answerBlacklisted = false;
      for(let option of questions.choices){
        if(option != null && count <6)
        {
            if(json.blacklist)
        {    json.blacklist.Editing.map((edit)=>{
              if(edit.from == option){
                option = edit.to
              }
            })
          }
            if(!json.blacklist || !json.blacklist.Choices.includes(option)){
              options.push({
            "value":option,
            "label":option
          })
        count = count +1
            }


    }
      }
if(json.blacklist)
    {  json.blacklist.Editing.map((edit)=>{
        if(edit.from == questions.answer){
          questions.answer = edit.to
        }
      })}
      var min=0;
      var max=options.length;
      var random =Math.floor(Math.random() * (+max - +min)) + +min;
      if(questions.answer != null &&  (!json.blacklist || !json.blacklist.Choices.includes(questions.answer)))
      {    options.splice(random, 0,{
        "value":questions.answer,
        "label":questions.answer
      })}
      else{
        answerBlacklisted =true
      }
      if(options.length > 3 && !answerBlacklisted)
  {
     let chapter = questions.crumb.split(">")[1];

        question_array.push(
        {
          "response_id": questions._id,
          "type": "mcq",
          "stimulus" : questions.question,
          "options" :options,
          "chapter":chapter,
          "questionType":questions.type,
          "valid_responses" : [
            {"value" : questions.answer, "score": 1}
          ],
          "instant_feedback": true

        }
      )}

    }

    if(question_array.length != 0 ){
    mcq_versions_question.push({"group_name":group._id,
      "question_array":question_array});
    }

  })}
  //  console.log(mcq_versions_question);
  return mcq_versions_question;

}


var savedQuestion = []
var savedQuestionParsing = (json,reset_question) =>{
  if(reset_question){
    savedQuestion = []
  }

  if(json.data.length!= 0){
  let data = json.data.data;
 data.forEach((group)=>{
    let question_array =[]
    for(let questions of group.questions_list){
      let options = [];
      let count  = 0
      for(let option of questions.choices){
        if(option != null)
        {  if(count <6)
          {
            options.push({
          "value":option,
          "label":option
        })
        count = count +1
        }
      }
      }

      var min=0;
      var max=options.length;
      var random =Math.floor(Math.random() * (+max - +min)) + +min;

      if(options.length > 3 )
  {

        question_array.push(
        {
          "response_id": questions.combine_problem_id,
          "type": "mcq",
          "stimulus" : questions.question,
          "options" :options,
          "chapter":questions.chapter,
          "questionType":questions.type,
          "valid_responses" : [
            {"value" : questions.answer, "score": 1}
          ],
          "instant_feedback": true

        }
      )}

    }

    if(question_array.length != 0 ){
    savedQuestion.push({"group_name":group._id,
      "question_array":question_array});
    }

  })}

     return savedQuestion
}
 const options  =  [
    {
        "value": 1,
        "label": "1",
        "tint": "#ff121c",
        "description": "Unsatisfactory"
    }, {
        "value": 2,
        "label": "2",
        "tint": "#ff9104",
        "description": "Satisfactory"
    }, {
        "value": 3,
        "label": "3",
        "tint": "#fdff30",
        "description": "Good"
    }, {
        "value": 4,
        "label": "4",
        "tint": "#cffa2e",
        "description": "Excellent"
    },
    {
        "value": 5,
        "label": "5",
        "tint": "#008000",
        "description": "Perfect"
    }
]
var keyPhraseData = []
var rankingKeyPhrasesParsing = (json,reset_question) =>{
  if(reset_question){
    keyPhraseData = []
  }

json.data.data.map((data)=>{
  var text = ""
  if(data.mentions.length != 0){
  var pos =  data.mentions[0].indexOf(data.phrase)
   text = data.mentions[0].slice(0,pos) + "<b>" + data.mentions[0].slice(pos, pos+data.phrase.length)
  + "</b>" + data.mentions[0].slice(pos+data.phrase.length)
}
  keyPhraseData.push({
  "keyPhrase" : data.phrase,
  "response_id": data._id,
  "type": "rating",
  "stimulus" : text,
   "options" : options,
   "initial_value" : data.rating
})
})

return keyPhraseData
}

var matchingQuestion = []
var matchingQuestionParsing = (json,reset_question) =>{
  if(reset_question){
    matchingQuestion = []
  }
  json.data.data.map((group)=>{
    let question_array =[]
    for(let question of group.questions_list){
      let chapter = question.crumb.split(">")[1]
      question_array.push({
        "stimulus": question.stimulus,
        "instant_feedback" : true,
        "response_id": question.combine_problem_id,
        "type": "association",
        "stimulus_list":question.stimulus_list,
        "validation": {
           "scoring_type": "exactMatch",
           "valid_response": {
               "value": question.valid_responses
           }
       },
      "possible_responses" : question.possible_responses,
      "chapter" : chapter,
      "questionType":question.type

            })
    }
    matchingQuestion.push(
      {"group_name":group._id,
        "question_array":question_array}
    )
  })
  return matchingQuestion

}

var feedbackQuestions = []
var dislikedQuestionParsing = (json,reset_question) =>{
  if(reset_question){
    feedbackQuestions = []
  }
  json.data.data.map((question)=>{
  if(question.question_category == "mcq"){
    var newForm;
     newForm = dislikedMCQQuestion(question)
  }
  else if (question.question_category == "association") {
     newForm = dislikedMatchingQuestion(question)
  }
    feedbackQuestions.push(newForm)

})
  return feedbackQuestions

}

var dislikedMCQQuestion = (question) =>{
console.log(question);

  let options = []
  question.choices.map((choice)=>{
    options.push({
  "value":choice,
  "label":choice
})
  })
  var min=0;
  var max=options.length;
  var random = Math.floor(Math.random() * (+max - +min)) + +min;

     options.splice(random, 0,{
    "value":question.answer,
    "label":question.answer
  })

  let finalQuestionForm =   {
      "response_id": question.question_id,
      "type": "mcq",
      "stimulus" : question.question,
      "options" :options,
      "questionType":question.type,
      "valid_responses" : [
        {"value" : question.answer, "score": 1}
      ],
      "instant_feedback": true,
      "reasons" : question.reasons,
      "comment" : question.comment
    }

    return finalQuestionForm
}

var dislikedMatchingQuestion = (question) =>{

  let finalQuestionForm = {
    "stimulus": question.stimulus,
    "instant_feedback" : true,
    "response_id": question.question_id,
    "type": "association",
    "stimulus_list":question.stimulus_list,
    "validation": {
       "scoring_type": "exactMatch",
       "valid_response": {
           "value": question.valid_responses
       }
   },
  "possible_responses" : question.possible_responses,
  "reasons" : question.reasons,
  "comment" : question.comment
        }

        return finalQuestionForm

}



var sorting_quiestion = [

  {
    "response_id": "demo15",
    "type": "orderlist",
    "stimulus": "In this question, the student needs to order the events, chronologically earliest to latest.",
    "description": "In this question, the student needs to order the events, chronologically earliest to latest.",
    "list": ["Russian Revolution", "Discovery of the Americas", "Storming of the Bastille", "Battle of Plataea", "Founding of Rome", "First Crusade"],
    "ui_style": {
      "type": "list"
    },
    //  "instant_feedback": true,
    "feedback_attempts": 2,
    "validation": {
      "valid_response": [4, 3, 5, 1, 2, 0],
      "valid_score": 1,
      "partial_scoring": true,
      "penalty_score": -1
    }
  },
  {
    "response_id": "demo16",
    "type": "orderlist",
    "stimulus" :  "In this question, the student needs to order the albums, chronologically earliest to latest.",
    "description": "In this question, the student needs to order the albums, chronologically earliest to latest.",
    "list": [
      "<div class=\"album\"><img src=\"//demos.learnosity.com/static/images/questiontypes/beatles_sgt.-peppers-lonely-hearts-club-band.jpg\"><span class=\"caption\"> Sgt. Pepper\'s Lonely Hearts Club Band</span></div>",
      "<div class=\"album\"><img src=\"//demos.learnosity.com/static/images/questiontypes/beatles_abbey-road.jpg\"><span class=\"caption\"> Abbey Road</span></div>",
      "<div class=\"album\"><img src=\"//demos.learnosity.com/static/images/questiontypes/beatles_a-hard-days-night.jpg\"><span class=\"caption\"> A Hard Day\'s Night</span></div>",
      "<div class=\"album\"><img src=\"//demos.learnosity.com/static/images/questiontypes/beatles_the-beatles.jpg\"><span class=\"caption\"> The Beatles</span></div>"
    ],
    "ui_style": {
      "type": "list"
    },
    //  "instant_feedback": true,
    "feedback_attempts": 2,
    "validation": {
      "valid_response": [2, 0, 3, 1],
      "valid_score": 1,
      "partial_scoring": true,
      "penalty_score": -1
    }
  },
  {
    "response_id": "demo17",
    "type": "orderlist",
    "list": ["Un peregrino llega a la cumbre agotado por la sed. El diablo, disfrazado de caminante, se ofrece a indicarle una fuente oculta, a condición de que reniegue de Dios, de la Virgen o de Santiago. Pero el peregrino mantiene su fe a toda costa, aun cuando se encuentra exhausto.", "Es entonces cuando se aparece Santiago vestido de peregrino, recoge al moribundo y le lleva a la escondida fuente, dándole de beber con su vieira.", "<h4>Fuente Reniega</h4>", "La acción tiene lugar en el Alto del Perdón, a pocos kilómetros de Pamplona."],
    "ui_style": {
      "type": "list"
    },
    //  "instant_feedback": true,
    "validation": {
      "valid_response": [2, 3, 0, 1],
      "valid_score": "1",
      "partial_scoring": "true",
      "penalty_score": "0",
      "pairwise": "0"
    }
  },
  {
    "response_id": "demo18",
    "type": "orderlist",
    "list": [ "On the contrary, for a small street in a quiet neighbourhood, it was remarkably animated.",
    "There was a group of shabbily dressed men smoking and laughing in a corner, a scissors-grinder with his wheel, two guardsmen who were flirting with a nurse-girl, and several well-dressed young men who were lounging up and down with cigars in their mouths.",
    "It was a quarter past six when we left Baker Street, and it still wanted ten minutes to the hour when we found ourselves in Serpentine Avenue.",
    "The house was just such as I had pictured it from Sherlock Holmes’ succinct description, but the locality appeared to be less private than I expected.",
    "It was already dusk, and the lamps were just being lighted as we paced up and down in front of Briony Lodge, waiting for the coming of its occupant." ],
    "ui_style": {
      "type": "list"
    },
    //  "instant_feedback": true,
    "validation": {
      "valid_response": [2, 4, 3, 0, 1],
      "valid_score": "1",
      "partial_scoring": "true",
      "penalty_score": "0",
      "pairwise": "0"
    }}

  ]
  var fill_blanks_quetions = [
    {
            "response_id": "demo8",
            "type": "clozedropdown",
            "description" : "The student needs to select the correct response for each blank ",
            "template" : "<p>“It’s all clear,’ he {{response}}. “Have you the chisel and the bags? Great Scott! Jump, Archie, jump, and I’ll swing for it!’</p><p>Sherlock {{response}} had sprung out and seized the {{response}} by the collar. The other dived down the hole, and I heard the sound of {{response}} cloth as Jones clutched at his skirts. The light flashed upon the barrel of a revolver, but Holmes’ {{response}} came down on the man’s wrist, and the pistol {{response}} upon the stone floor.</p>",
            "instant_feedback" : true,
            "possible_responses" : [ ["whispered", "sprinted", "joked"], ["Homes", "holmes", "Holmes"], ["acquaintance", "intruder", "shopkeeper"], ["burning", "departing", "rending", "broken"], ["revolver","hunting crop"], ["rattled", "clinked", "spilt"] ],
            "valid_responses" : [
                [
                    {"value" : "whispered"}
                ], [
                    {"value" : "Holmes"}
                ], [
                    {"value" : "intruder"}
                ], [
                    {"value" : "rending"}
                ], [
                    {"value" : "hunting crop"}
                ], [
                    {"value" : "clinked"}
                ]
            ]
        }

];
const question = (category_id,json,reset_question) => {
console.log(category_id);
  switch (category_id) {
    case QuestionCode.EditingModeSearch + QuestionCode.MultipleChoice:
    case QuestionCode.EditingMode + QuestionCode.MultipleChoice:
   return version_mcq(json,reset_question)
    break;

    case QuestionCode.SavedModeSearch + QuestionCode.Match_The_Following:
    case QuestionCode.EditingModeSearch + QuestionCode.Match_The_Following:
    case QuestionCode.SavedMode + QuestionCode.Match_The_Following:
    case QuestionCode.EditingMode + QuestionCode.Match_The_Following:
    return matchingQuestionParsing(json,reset_question);
    break;

    case 3:
    return sorting_quiestion;
    break;

    case QuestionCode.EditingMode + QuestionCode.Fill_In_The_Blanks:
     let fill = []
     fill.push({"group_name":"aaaa",
      "question_array":fill_blanks_quetions})

    return fill;
    break;

    case QuestionCode.SavedMode + QuestionCode.RankingKeyPhrases:
    case QuestionCode.EditingMode + QuestionCode.RankingKeyPhrases:
    return rankingKeyPhrasesParsing(json, reset_question)

    case QuestionCode.SavedModeSearch + QuestionCode.MultipleChoice:
    case QuestionCode.SavedMode + QuestionCode.MultipleChoice:
    return savedQuestionParsing(json,reset_question)

    case QuestionCode.EditingMode + QuestionCode.FeedbackQuestions:
    case QuestionCode.SavedMode + QuestionCode.FeedbackQuestions:
    return dislikedQuestionParsing(json,reset_question)

    default:
    console.log("Invalid Question Id");

  }
};
export {question}
