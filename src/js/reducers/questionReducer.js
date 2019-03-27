import {
  FETCH_QUESTION_BEGIN,
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_FAILURE,
  LOAD_MORE_QUESTION,
  CHANGE_SORTING,
  UPDATE_QUESTION
} from '../Actions/QuestionBoxActions';

const initialState = {
  questions: [],
  loading: false,
  error: null,
  page_no : 0,
  total : 0,
  sorting : "KeyPhrases Ranking"
};


export default function questionBoxReducer(state = initialState, action) {
  switch(action.type) {

    case FETCH_QUESTION_BEGIN:
    return Object.assign({}, state, {
      loading: true,
      error: null,
      questions: [],
    });

    case FETCH_QUESTION_SUCCESS:
    return Object.assign({}, state, {
      loading: false,
      questions: action.payload.data,
      page_no: action.new_page_no,
      total : action.total
    });


    case FETCH_QUESTION_FAILURE:
    return Object.assign({}, state, {
      loading: false,
      error: action.payload.error,
      questions: []
    });

    case LOAD_MORE_QUESTION:
      // return Object.assign({},state)
    return Object.assign({},state,{
      loading : false,
      questions:  action.payload.data,
      page_no: action.new_page_no
    })

    case CHANGE_SORTING:
    return Object.assign({}, state, {
      sorting : action.sortingBy,
    })

    case UPDATE_QUESTION:
      console.log("in the update");
    return  Object.assign({},state,{
      questions : updatedQuestions(state.questions,action.newQuestion)
      })





    default:
    return state;
  }
}

var updatedQuestions = (oldQuestionList, newQuestion) =>{
if(newQuestion.question_category == "mcq"){
  return updateMCQQuestions(oldQuestionList,newQuestion)
}
else if(newQuestion.question_category == "association"){
return updateMatchingQuestion(oldQuestionList, newQuestion)
}

else if(newQuestion.question_category == "imageclozeassociationV2"){
  return updateImageMatchingQuestion(oldQuestionList,newQuestion)
}

}

var updateMCQQuestions = (oldQuestionList, newQuestion) =>{
  let updatedQuestionList =
  oldQuestionList.map(group=>{
return    ({group_name : group.group_name,
  question_array :group.question_array.map((question)=>{
    if(question.response_id == newQuestion.combine_problem_id){
      let options = [];
      for(let option of newQuestion.choices){
        if(option != null)
        {
            options.push({
          "value":option,
          "label":option
        })

      }
      }
      return Object.assign({},question,{
        options : options,
        stimulus : newQuestion.question,
        valid_responses : [
          {"value" : newQuestion.answer, "score": 1}
        ],
      })
    }
    return question
  })}

  )
  })
   return updatedQuestionList;
}

var updateMatchingQuestion = (oldQuestionList, newQuestion) =>{
  let updatedQuestionList =
  oldQuestionList.map(group =>{
    return ({
      group_name : group.group_name,
      question_array : group.question_array.map(question =>{
        if(question.response_id == newQuestion.combine_problem_id){
          return Object.assign({},question,{
            possible_responses : newQuestion.possible_responses,
            stimulus : newQuestion.stimulus,
            stimulus_list : newQuestion.stimulus_list,
            valid_responses : newQuestion.valid_responses
          })
}
return question
      })
    })
  })
return updatedQuestionList;

}

var updateImageMatchingQuestion = (oldQuestionList,newQuestion) =>{
  console.log(oldQuestionList);
  console.log(newQuestion);
   let updatedQuestionList =
   oldQuestionList.map(group =>{
     return({
       group_name : group.group_name,
       question_array : group.question_array.map(question =>{
         if(question.response_id == newQuestion.image_problem_id){
           return Object.assign({},question,{
             possible_responses : newQuestion.possible_responses,
             response_containers : newQuestion.response_containers,
             stimulus : newQuestion.stimulus,
             url : newQuestion.url,
             valid_responses : newQuestion.valid_responses
           })
         }
         return question
       })
     })
   })
  return updatedQuestionList
}
