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
    "questions":  "",
      "renderSaveButton" : true,
       "renderSubmitButton" : true,
  }
);

const callbacks = {
  errorListener: function(e) {
    // Adds a listener to all error codes.
    console.log("Error Code ", e.code);
    console.log("Error Message ", e.msg);
    console.log("Error Detail ", e.detail);
  },


  readyListener: function() {
   // console.log("Learnosity Questions API is ready");
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



var initOptionsEditor = {
    "assetRequest": function(mediaRequested, returnType, callback, attributes) {
        // Do something.
    },
    "configuration" : {
        "consumer_key": "twRp5spenrCfVAa6",
    },
   "widget_json" : "",

};



var hook = ".learnosity_questioneditor";

var callbacksEditor = {
    "readyListener": function () {
return true
        // Question Editor API sucessfully loaded according to pased init options
        // we can now reliably start calling public methods and listen to events
        // questionEditorApp.on("widget:ready", function () {
            // widget has changed, probably as a result of calling setWidget()
        // });
    },
    "errorListener": function (e) {
        //callback to occur on error
        console.log("Error code ", e.code);
        console.log("Error message ", e.message);
        console.log("Error name ", e.name);
        console.log("Error name ", e.title);
    }
};


export {initOptions,callbacks,initOptionsEditor,callbacksEditor,hook};
