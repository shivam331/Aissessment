var  mcq_questions = []
var old_category_id = 1;
var mcq = (json,new_category_id,reset_question) =>{
  if(reset_question){
    mcq_questions = []
  }
  if(mcq_questions.length !== 0 && (old_category_id !== new_category_id)){
    //  return mcq_questions;
  }
  old_category_id = new_category_id;
  let data = json.data;

  for(let questions of data){
    let options = [];
      let count  = 0
    for(let option of questions.choices){
      if(option != null)
      {
if(count <6){
        options.push({
        "value":option,
        "label":option
      })
    }
    count = count +1;
    }
    }
    var min=0;
    var max=options.length;
    var random =Math.floor(Math.random() * (+max - +min)) + +min;
    if(questions.answer != null)
    {    options.splice(random, 0,{
      "value":questions.answer,
      "label":questions.answer
    })}
    mcq_questions.push(
      {
        "response_id": questions._id,
        "type": "mcq",
        "stimulus" : questions.question,
        "options" :options,
        "valid_responses" : [
          {"value" : questions.answer, "score": 1}
        ],

      }
    )
  }


  return mcq_questions;
}
var mcq_versions_question = []
var version_mcq = (json,new_category_id,reset_question) =>{
  if(reset_question){
    mcq_versions_question = []
  }
  let data = json.data;
  data.forEach((group)=>{
    let question_array =[]
    for(let questions of group.questions_list){
      let options = [];
      let count  = 0
      for(let option of questions.choices){
        if(option != null)
        {  if(count <6)
          {
            json.blacklist.Editing.map((edit)=>{
              if(edit.from == option){
                option = edit.to
              }
            })
            if(!json.blacklist.Choices.includes(option)){
              options.push({
            "value":option,
            "label":option
          })
        count = count +1
            }
        }
      }
      }
      var min=0;
      var max=options.length;
      var random =Math.floor(Math.random() * (+max - +min)) + +min;
      if(questions.answer != null)
      {    options.splice(random, 0,{
        "value":questions.answer,
        "label":questions.answer
      })}
      if(options.length > 3)
  {    question_array.push(
        {
          "response_id": questions._id,
          "type": "mcq",
          "stimulus" : questions.question,
          "options" :options,
          "valid_responses" : [
            {"value" : questions.answer, "score": 1}
          ],
          "instant_feedback": true

        }
      )}
    }
    if(question_array.length != 0){
    mcq_versions_question.push({"group_name":group._id,
      "question_array":question_array});
    }

  })
  //  console.log(mcq_versions_question);
  return mcq_versions_question;

}

var matching_questions = [
  {
    "stimulus": "Match the cities to the parent nation.",
    //  "instant_feedback": true,
    "possible_responses": ["United States", "Australia", "France", "Ireland", "England"],
    "response_id": "60005",
    "stimulus_list": ["London", "Dublin", "Paris", "Boston", "Sydney"],
    "type": "association",
    "validation": {
      "scoring_type": "partialMatch",
      "valid_response": {
        "value": ["England", "Ireland", "France", "United States", "Australia"]
      }
    }
  }
]

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
    {             "response_id": "demo7",
    "stimulus" : "The student needs to fill in the blanks ",
    "type": "clozetext",
    "description" : "The student needs to fill in the blanks ",
    "template" : "<table class=\"table table-bordered\"><thead><tr><th><strong>Multiply</strong></th><th><strong>_ x 1</strong></th><th><strong>_ x 2</strong></th><th><strong>_ x 3</strong></th><th><strong>_ x 4</strong></th><th><strong>_ x 5</strong></th></tr></thead><tbody><tr><td><strong>1 x _</strong></td><td>{{response}}</td><td>2</td><td>3</td><td>4</td><td>5</td></tr><tr><td><strong>2 x _</strong></td><td>2</td><td>{{response}}</td><td>6</td><td>8</td><td>10</td></tr><tr><td><strong>3 x _</strong></td><td>3</td><td>6</td><td>{{response}}</td><td>12</td><td>15</td></tr><tr><td><strong>4 x _</strong></td><td>4</td><td>8</td><td>12</td><td>{{response}}</td><td>20</td></tr><tr><td><strong>5 x _</strong></td><td>5</td><td>10</td><td>15</td><td>20</td><td>{{response}}</td></tr></tbody></table>",
    //  "instant_feedback" : true,
    "case_sensitive" : false,
    "max_length" : 2,
    "valid_responses" : [
      [
        {"value" : "1"}
      ], [
        {"value" : "4"}
      ], [
        {"value" : "9"}
      ], [
        {"value" : "16"}
      ], [
        {"value" : "25"}
      ], [
        {"value" : "36"}
      ]
    ]
  },
  {
    "response_id": "demo8",
    "type": "clozedropdown",
    "stimulus" : "The student needs to select the correct response for each blank ",
    "template" : "<p>“It’s all clear,’ he {{response}}. “Have you the chisel and the bags? Great Scott! Jump, Archie, jump, and I’ll swing for it!’</p><p>Sherlock {{response}} had sprung out and seized the {{response}} by the collar. The other dived down the hole, and I heard the sound of {{response}} cloth as Jones clutched at his skirts. The light flashed upon the barrel of a revolver, but Holmes’ {{response}} came down on the man’s wrist, and the pistol {{response}} upon the stone floor.</p>",
    // "instant_feedback" : true,
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

  switch (category_id) {
    case 1:
 return version_mcq(json,category_id,reset_question)
//    return mcq(json,category_id,reset_question);

    break;

    case 2:

    return matching_questions;
    break;

    case 3:
    return sorting_quiestion;
    break;

    case 4:
    return fill_blanks_quetions;
    break;
    default:
    console.log("Invalid Question Id");

  }
};
export {mcq_questions,matching_questions,question,mcq}
