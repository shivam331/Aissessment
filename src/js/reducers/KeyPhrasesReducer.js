 import {
   FETCH_KEYPHRASES_BEGIN,
   FETCH_KEYPHRASES_SUCCESS,
   FETCH_KEYPHRASES_FAILURE,
   LOAD_MORE_KEYPHRASES,
   RESET_KEYPHRASES_STATE,
   RERANK_QUESTIONS_BEGIN,
   RERANK_QUESTIONS_SUCCESS,
   RERANK_QUESTION_FAILURE,
   SAVE_KEYPHRASES_RATING_BEGIN,
SAVE_KEYPHRASES_RATING_SUCCESS,
SAVE_KEYPHRASES_RATING_FAILURE,
 } from "../Actions/KeyPhrasesAction"


 const initialState = {
   keyPhrases: [],
   loading: false,
   error: null,
   page_no : 0,
   total : 0,
   message : ""
 };


 export const keyPhraseReducer = (state = initialState, action) => {

   switch(action.type) {

     case FETCH_KEYPHRASES_BEGIN:
     return Object.assign({}, state, {
       loading: true,
       error: null,
       keyPhrases: [],
       total : 0
     });

     case FETCH_KEYPHRASES_SUCCESS:
     return Object.assign({}, state, {
       loading: false,
       keyPhrases: action.payload.data,
       page_no: action.new_page_no,
       total : action.total
     });


     case FETCH_KEYPHRASES_FAILURE:
     return Object.assign({}, state, {
       loading: false,
       error: action.payload.error,
       keyPhrases: []
     });

     case LOAD_MORE_KEYPHRASES:
     return Object.assign({},state,{
       loading : false,
       keyPhrases:  action.payload.data,
       page_no: action.new_page_no,
       total : action.total
     })

    case RESET_KEYPHRASES_STATE:
    return Object.assign({}, state, {
      page_no : 0,
      total : 0,
    });


    case SAVE_KEYPHRASES_RATING_BEGIN:
        console.log("begin");
        return Object.assign({}, state, {
          loading: true,
          error: null,
          saveStatus : "failure"
        });

        case SAVE_KEYPHRASES_RATING_SUCCESS:
        return Object.assign({}, state, {
          loading: false,
          saveStatus : action.payload.status
        });

       case SAVE_KEYPHRASES_RATING_FAILURE:
       return Object.assign({}, state, {
         loading: false,
         error: action.payload.error
       });


    case RERANK_QUESTIONS_BEGIN :
    return Object.assign({},state,{
      loading : true,
      error : null
    })

    case RERANK_QUESTIONS_SUCCESS :
    return Object.assign({},state,{
      loading : false,
      message : action.message
    })

    case RERANK_QUESTION_FAILURE :
    return Object.assign({},state,{
      loading : false,
      error : error
    })


     default:
     return state;
   }
 }
