export const BASE_URL = "http://localhost:80/api/"
// export const BASE_URL = "https://dry-garden-43793.herokuapp.com/api/"
// export const BASE_URL = "http://aissessment.paperscorer.com/api/"

import {QuestionCode} from './Constants'

export const API = {
"BOOK_NAME" : "bookname/",
"QUESTION_SEARCH" : "search/",
"CHAPTER_LIST" : "chapter/",
"QUESTION_TYPES_LIST" : "questiontypes/",
"QUESTIONS" : "version/",
"SEARCH" : "searchEditingMcq/",
"LOGIN" : "login",
"BOOKS" :"books",
"BOOKS_METADATA" : "booksummary",
"BLACKLIST_DISTRACTORS" : "addBlacklist/",
"UPDATE_DISTRACTORS" : "updateDistractors/",
"SUBMIT_FEEDBACK" : "submitfeedback",
"SAVE_QUESTION" : "saveQuestion", // For MCQ Type Question
"SAVED_QUESTION_LIST": "savedQuestion/",
"SEARCH_SAVED_QUESTION" :"searchSavedMcq/",
"KEYPHRASES_LIST" : "keyphrases/",
"SAVE_KEYPHRASES_RATING" : "saveRating",
"SEARCH_KEYPHRASES" : "searchKeyPhrases/",
"CONTEXT" : "pageContext/",
"DATA_COUNT" : "summaryCount/",
"RATED_KEYPHRASES" : "ratedKeyphrases/",
"MATCH_THE_FOLLOWING_QUESTIONS" : "matchSentence/",
"SAVE_MATCH_THE_FOLLOWING_QUESTION": "saveMatchingQuestion",
"SAVED_MATCH_THE_FOLLOWING_QUESTIONS" : "savedMatchingQuestion/",
"SEARCH_MATCHING_QUESTION" : "searchEditingMatching/",
"SEARCH_SAVED_MATCHING_QUESTION" : "searchSavedMatching/",
"FEEDBACK_QUESTION_LIST" : "showfeedback/",
"DELETE_FEEDBACK" : "deletefeedback",
"RERANKQUESTIONS" : "rankQuestion/",
"IMAGE_MATCHING_QUESTIONS" : "imageMatching/",
"SAVE_IMAGE_MATCHING_QUESTION" : "saveImageMatchingQuestion",
"SAVED_IMAGE_MATCHING_QUESTION" : "savedImageMatchingQuestion/",
"SEARCH_IMAGE_MATCHING_QUESTIONS" : "searchEditingImageMatching/",
"SEARCH_SAVED_IMAGE_MATCHING_QUESTIONS" : "searchSavedImageMatching/",
"FILL_In_The_BLANKS_QUESTIONS" : "fillInBlanks/",
"SAVE_FILL_IN_THE_BLANKS_QUESTION" : "saveFillInTheBlanksQuestion",
"SAVED_FILL_IN_THE_BLANKS_QUESTIONS" : "savedFillInTheBlanksQuestions/",
"SEARCH_FILL_IN_THE_BLANKS_QUESTIONS" : "searchEditingFillInTheBlanks/",
"SEARCH_SAVED_FILL_IN_THE_BLANKS_QUESTIONS" : "searchSavedFillInTheBlanks/"
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
    return API.SAVED_MATCH_THE_FOLLOWING_QUESTIONS + details.book_id + "/" +
           details.currentChapter + "/" + details.currentQuestiontype  + "/" + details.page_no
       break;

    case  QuestionCode.SavedMode + QuestionCode.MultipleChoice:
    return API.SAVED_QUESTION_LIST + details.book_id + "/" +
          details.currentChapter + "/" + details.currentQuestiontype + "/" +
          details.page_no + "?sortBy=" + details.sortBy
      break;

    case QuestionCode.SavedMode + QuestionCode.RankingKeyPhrases:
    return API.RATED_KEYPHRASES + details.book_id + "/" + details.page_no
    break

    case QuestionCode.EditingModeSearch + QuestionCode.MultipleChoice:
    return API.SEARCH + details.book_id + "/" + details.searchKey
     break

    case QuestionCode.SavedModeSearch + QuestionCode.MultipleChoice:
    return API.SEARCH_SAVED_QUESTION + details.book_id + "/" + details.searchKey
    break

    case QuestionCode.EditingModeSearch + QuestionCode.Match_The_Following:
    return API.SEARCH_MATCHING_QUESTION + details.book_id + "/" + details.searchKey
    break

    case QuestionCode.SavedModeSearch + QuestionCode.Match_The_Following:
    return API.SEARCH_SAVED_MATCHING_QUESTION + details.book_id + "/" + details.searchKey
    break

    case QuestionCode.EditingMode + QuestionCode.FeedbackQuestions:
    case QuestionCode.SavedMode + QuestionCode.FeedbackQuestions:
    return API.FEEDBACK_QUESTION_LIST + details.book_id + "/" + details.page_no

    case QuestionCode.EditingMode + QuestionCode.Image_Matching:
    return API.IMAGE_MATCHING_QUESTIONS + details.book_id + "/" + details.currentChapter
           + "/" + details.page_no

    case QuestionCode.SavedMode + QuestionCode.Image_Matching:
    return API.SAVED_IMAGE_MATCHING_QUESTION + details.book_id + "/"
          + details.currentChapter + "/" + details.page_no
       break;

    case QuestionCode.EditingModeSearch + QuestionCode.Image_Matching:
    return API.SEARCH_IMAGE_MATCHING_QUESTIONS + details.book_id + "/" + details.searchKey

    case QuestionCode.SavedModeSearch + QuestionCode.Image_Matching:
    return API.SEARCH_SAVED_IMAGE_MATCHING_QUESTIONS + details.book_id + "/" + details.searchKey

    case QuestionCode.EditingMode + QuestionCode.Fill_In_The_Blanks:
    return API.FILL_In_The_BLANKS_QUESTIONS + details.book_id + "/" +
           details.currentChapter + "/"  +  details.page_no

    case QuestionCode.SavedMode + QuestionCode.Fill_In_The_Blanks:
    return API.SAVED_FILL_IN_THE_BLANKS_QUESTIONS + details.book_id + "/" + details.currentChapter
           + "/" + details.page_no

    case QuestionCode.EditingModeSearch + QuestionCode.Fill_In_The_Blanks:
    return API.SEARCH_FILL_IN_THE_BLANKS_QUESTIONS + details.book_id + "/" + details.searchKey

    case QuestionCode.SavedModeSearch + QuestionCode.Fill_In_The_Blanks:
    return API.SEARCH_SAVED_FILL_IN_THE_BLANKS_QUESTIONS + details.book_id + "/" + details.searchKey

    default:
    return ""

  }
}
