export const SortingOptions = ["Default","KeyPhrases Ranking"]

export const QuestionCode = {
  "MultipleChoice" : "1",
  "Match_The_Following" : "2",
  "Fill_In_The_Blanks" : "4",
  "RankingKeyPhrases" : "5",
  "FeedbackQuestions" : "6",
  "EditingMode" : "EM",
  "SavedMode" : "SM",
  "EditingModeSearch" : "EMS",
  "SavedModeSearch" : "SMS"
}

export const QuestionTypes =  [
  {"id" : QuestionCode.MultipleChoice,"category":"mcq","category_name":"Multiple Choice"},
  {"id" : QuestionCode.Match_The_Following,"category":"association","category_name":"Matching"}]

export const MenuBarDropdowns = [{name :"Chapters",header : "Chapters",id: 1},
                                 {name:"Content Types",header: "Content Type",id : 2},
                                 {name : "Question Types", header: "Problem Type",id :3}]

 export const FeedbackReasons = ["The question did not make sense",
                                 "The distractors were inappropriate for the question stem",
                                 "There was a formatting issue in the question stem or distractors",
                                 "The distractors weren't similar enough to each other",
                                 "Distractors weren't mutually exclusive",
                                 "Answer was too obvious",
                                 "Correct answer did not cover key concept"
                                 ];
export const DefaultDropDownValues = {
  chapter : "All Chapters",
  contentType : "Content Type",
  questionType : "Problem Type"
}
