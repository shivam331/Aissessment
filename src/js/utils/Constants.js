export const SortingOptions = ["Default","KeyPhrases Ranking"]

export const QuestionCode = {
  "MultipleChoice" : "1",
  "Match_The_Following" : "2",
  "Fill_In_The_Blanks" : "4",
  "RankingKeyPhrases" : "5",
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
                                 {name : "Question Types", header: "Question Type",id :3}]