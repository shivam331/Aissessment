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
          "instant_feedback": true,
          "metadata" :{
            "distractor_rationale" : ""
          }

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
          "instant_feedback": true,
          "metadata" :{
            "distractor_rationale" : ""
          }

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
      "questionType":question.type,
      "metadata" :{
        "distractor_rationale" : ""
      }

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
    var newForm;
  if(!question.question_category || question.question_category == "mcq"){
     newForm = dislikedMCQQuestion(question)
  }
  else if (question.question_category == "association") {
     newForm = dislikedMatchingQuestion(question)
  }
  else if(question.question_category == "imageclozeassociationV2"){
    newForm = disLikedImageMatchingQuestion(question)
  }

    feedbackQuestions.push(newForm)

})
  return feedbackQuestions

}

var dislikedMCQQuestion = (question) =>{
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

var disLikedImageMatchingQuestion = (question) =>{
  let finalQuestionForm =
    {
        "response_id" : question.question_id,
        "stimulus" : "Drag the terms below to the appropriate place on the image.",
        "type": "imageclozeassociationV2",
        "img_src" : question.url,
        "instant_feedback": false,
        "possible_responses": ["Placeholder Response1"],
        "response_container": {
            "width": "105px"
        },
        "response_containers": [{
            // "x": 0,"y": 0,
            "pointer": "top"
        }],
        "response_positions": [{
            "x": 0,
            "y": 0
        }],
        "validation": {
            "scoring_type": "partialMatch",
            "valid_response":
          {  "value" : ["Placeholder Response1"]}
        },
        "reasons" : question.reasons,
        "comment" : question.comment

    }

      return finalQuestionForm
}



let imageDragDropQuestions = []
var imageMatchingQuestionsParsing =(json,reset_question) => {
  if(reset_question){
    imageDragDropQuestions = []
  }

json.data.data.forEach(group=>{
  let question_array =[]
  for(let question of group.questions_list){
    let chapter = question.crumb.split(">")[1]
    question_array.push({
        "response_id" : question.image_problem_id,
        "stimulus" : "Drag the terms below to the appropriate place on the image.",
        "type": "imageclozeassociationV2",
        "img_src" : question.imageUrl,
        "instant_feedback": false,
        "possible_responses": ["Placeholder Response1"],
        "response_container": {
            "width": "105px"
        },
        "response_containers": [{
            // "x": 0,"y": 0,
            "pointer": "top"
        }],
        "response_positions": [{
            "x": 0,
            "y": 0
        }],
        "validation": {
            "scoring_type": "partialMatch",
            "valid_response":
          {  "value" : ["Placeholder Response1"]}
        },
        "chapter":chapter,
        "metadata" :{
          "distractor_rationale" : ""
        },

    })
  }
  imageDragDropQuestions.push(
    {"group_name":group._id,
      "question_array":question_array}
  )

})
return imageDragDropQuestions
}


var savedImageMatchingQuestion = []
var savedImageMatchingQuestionParsing = (json,reset_question) =>{
  if(reset_question){
    savedImageMatchingQuestion = []
  }

 json.data.data.forEach(group=>{
   let question_array = []

   for(let question of group.questions_list){
     let chapter = question.crumb.split(">")[1]
     question_array.push({
         "response_id" : question.image_problem_id,
         "stimulus" : question.stimulus,
         "type": "imageclozeassociationV2",
         "img_src" : question.imageUrl,
         "instant_feedback": true,
         "possible_responses": question.possible_responses,
         "response_container": {
             "width": "105px"
         },
         "response_containers": question.response_containers,
         "response_positions": question.response_containers,
         "validation": {
             "scoring_type": "partialMatch",
             "valid_response": {
               "value" : question.valid_responses}
         },
         "chapter":chapter,
         "metadata" :{
           "distractor_rationale" : ""
         },
     })
   }
   savedImageMatchingQuestion.push(
     {"group_name":group._id,
       "question_array":question_array}
   )
 })


  return savedImageMatchingQuestion
}


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



    case QuestionCode.SavedMode + QuestionCode.RankingKeyPhrases:
    case QuestionCode.EditingMode + QuestionCode.RankingKeyPhrases:
    return rankingKeyPhrasesParsing(json, reset_question)
    // return imageDropDown

    case QuestionCode.SavedModeSearch + QuestionCode.MultipleChoice:
    case QuestionCode.SavedMode + QuestionCode.MultipleChoice:
    return savedQuestionParsing(json,reset_question)

   case QuestionCode.EditingModeSearch + QuestionCode.Image_Matching:
   case QuestionCode.EditingMode + QuestionCode.Image_Matching:
   return imageMatchingQuestionsParsing(json,reset_question)


    case QuestionCode.SavedModeSearch + QuestionCode.Image_Matching:
    case QuestionCode.SavedMode + QuestionCode.Image_Matching:
    return savedImageMatchingQuestionParsing(json,reset_question)


    case QuestionCode.EditingMode + QuestionCode.FeedbackQuestions:
    case QuestionCode.SavedMode + QuestionCode.FeedbackQuestions:
    return dislikedQuestionParsing(json,reset_question)

    default:
    console.log("Invalid Question Id");

  }
};
export {question}
