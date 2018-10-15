var Learnosity = require('learnosity-sdk-nodejs');
var learnositySdk = new Learnosity();
  // "domain":       "aissessment.paperscorer.com",

var initOptions = learnositySdk.init(
  "questions",
  {
    "consumer_key": "twRp5spenrCfVAa6",
    "domain":       "localhost",
    "user_id":      "demo_student"
  },
  "4QxI9yDD15X65SLyOnnUgd8TVL90Wj7aA4tJ37W5",
  {
    "type":       "local_practice",
    "state":      "initial",
    "questions":  ""
  }
);

var initEditorOption = {
                "configuration": {
                    "consumer_key": 'twRp5spenrCfVAa6'
        },
        "label_bundle": {
       // question attributes
       "stimulus": "Compose question",
       "options": "Options",
       "validation.alt_responses.score": "Points",
   },
   "question_type_templates": {
       "mcq": [{
           "name": "MCQ - Custom Style",
           "reference": "customMCQ",
           "group_reference": "mcq",
           "description": "Multiple Choice question with block style and predefined options.",
           "defaults": {
               "options": [{
                   "label": "Dublin",
                   "value": "1"
               }, {
                   "label": "Bristol",
                   "value": "2"
               }, {
                   "label": "Liverpool",
                   "value": "3"
               }, {
                   "label": "London",
                   "value": "4"
               }],
               // A newly added option will have the default label "New Label"
               "options[]": "New Label",
               "ui_style": {
                   "type": "block",
                   "columns": 1,
                   "choice_label": "upper-alpha"
               }
           }
       }]
   },
   "ui": {
       "layout": {
           "global_template": "edit_preview",
           "responsive_edit_mode": {
               "enabled": true,  // Not necessary as it is enabled by default
               "breakpoint": 800 // If the container width becomes less than 800px then switch to edit layout
           }
       }
   },
   "widget_type": "response"
      }
const callbacks = {
  errorListener: function(e) {
    // Adds a listener to all error codes.
    console.log("Error Code ", e.code);
    console.log("Error Message ", e.msg);
    console.log("Error Detail ", e.detail);
  },


  readyListener: function() {
  //  console.log("Learnosity Questions API is ready");
  },

  labelBundle: {
    loadingInfo: "Loading Question...",
    play: "play"
  },

  saveSuccess: function(response_ids) {
    for(let i = 0; i < response_ids.length; i++) {
      console.log("Responses saved : ", response_ids[i]);
    }
  },

  saveError: function(e) {
    console.log("Save failed - error ", e);
  },

  saveProgress: function(progress) {
    console.log("Save progress - ", progress);
  }
};
export {initOptions,callbacks,initEditorOption};
