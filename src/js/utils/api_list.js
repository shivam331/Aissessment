// export const BASE_URL = "http://localhost:80/api/"
// export const BASE_URL = "https://dry-garden-43793.herokuapp.com/api/"
export const BASE_URL = "http://aissessment.paperscorer.com/api/"

import {QuestionCode} from './Constants'

export const API = {
"BOOK_NAME" : "bookname/",
"QUESTION_SEARCH" : "search/",
"CHAPTER_LIST" : "chapter/",
"QUESTION_TYPES_LIST" : "questiontypes/",
"QUESTIONS" : "version/",
"SEARCH" : "search/",
"LOGIN" : "login",
"BOOKS" :"books",
"BLACKLIST_DISTRACTORS" : "addBlacklist/",
"UPDATE_DISTRACTORS" : "updateDistractors/",
"SUBMIT_FEEDBACK" : "submitfeedback",
"SAVE_QUESTION" : "saveQuestion",
"SAVED_QUESTION_LIST": "savedQuestion/",
"SEARCH_SAVED_QUESTION" :"searchSaved/",
"KEYPHRASES_LIST" : "keyphrases/",
"SAVE_KEYPHRASES_RATING" : "saveRating",
"SEARCH_KEYPHRASES" : "searchKeyPhrases/",
"CONTEXT" : "pageContext/",
"DATA_COUNT" : "summaryCount/",
"RATED_KEYPHRASES" : "ratedKeyphrases/",
"MATCH_THE_FOLLOWING_QUESTIONS" : "matchSentence/"

}


export var myURL = (details) =>{

  switch (details.current_category) {
    case  QuestionCode.EditingMode + QuestionCode.MultipleChoice:
    return API.QUESTIONS + details.book_id + "/" + details.currentChapter +
          "/" + details.currentQuestiontype + "/" + details.page_no + "?sortBy=" + details.sortBy
      break;

    case  QuestionCode.EditingMode + QuestionCode.Match_The_Following:
    return API.MATCH_THE_FOLLOWING_QUESTIONS + details.book_id + "/"
           + details.currentChapter + "/" + details.page_no
     break;


    case  QuestionCode.EditingMode + QuestionCode.RankingKeyPhrases:
    return API.KEYPHRASES_LIST + details.book_id + "/" + details.page_no
      break;


    case  QuestionCode.SavedMode + QuestionCode.Match_The_Following:
    case  QuestionCode.SavedMode + QuestionCode.MultipleChoice:
    return API.SAVED_QUESTION_LIST + details.book_id + "/" +
          details.currentChapter + "/" + details.currentQuestiontype + "/" +
          details.page_no + "?sortBy=" + details.sortBy
      break;

    case QuestionCode.SavedMode + QuestionCode.RankingKeyPhrases:
    return API.RATED_KEYPHRASES + details.book_id + "/" + details.page_no
    break
    default:
    return ""

  }
}
