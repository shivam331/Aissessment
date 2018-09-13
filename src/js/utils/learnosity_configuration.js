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
    loadingInfo: "Loading page...",
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
export {initOptions,callbacks};
