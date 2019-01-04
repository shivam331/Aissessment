import React, { Component } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter,Table,Input,CustomInput,Alert ,Label  } from 'reactstrap'
import {FETCH_QUESTION_SUCCESS } from "../../../Actions/QuestionBoxActions"
import {API} from "../../../utils/api_list";
import {initOptionsEditor,callbacksEditor,hook} from "../../../utils/learnosity_configuration";
import  {notify} from 'react-notify-toast';
import {QuestionCode} from "../../../utils/Constants";


var editor;
class SaveQuestion extends Component{
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
    this.done = this.done.bind(this)
  }
  toggle() {

    this.setState((prevState)=>({
      modal: !prevState.modal
    }),() => {
      if(this.state.modal){
      this.initialisation()}
    });
  }
  componentDidMount() {
// console.log(this.props.question);
}

  initialisation(){

    initOptionsEditor.widget_json = this.props.question
  editor =    LearnosityQuestionEditor.init(initOptionsEditor,hook, callbacksEditor);
  }

  done(){
        // e.preventDefault()
        let category  = this.props.headerState.current_category
        let api;
        switch (category) {
          case QuestionCode.MultipleChoice:
        var finalData =   mcqQuestionFormat(editor.getWidget(),this.props.book_id)
        api = API.SAVE_QUESTION

            break;

          case QuestionCode.Match_The_Following:
          var finalData = matchingQuestionFormat(editor.getWidget(),this.props.book_id)
          api = API.SAVE_MATCH_THE_FOLLOWING_QUESTION
          console.log(finalData);
          console.log("match following");
          break
          default:

        }

        this.props.saveQuestion(finalData,api)
         .then(status =>
          {
            let myColor = { background: '#228B22', text: "#FFFFFF" };

            if(status == "success"){
              console.log(finalData);
              this.props.saveQuestionSucces(this.props.index)
              notify.show("Question Saved successfully!", "custom", 5000, myColor);
            }
            else {
              notify.show("Question Not Saved, Please Try Again!", "custom", 5000, myColor);
            }
           this.toggle()}
         )





  }

  render(){
    return(
      <div className = "col-2-md px-2">
      <Button color="primary" size="sm"  onClick={this.toggle}>Edit And Save</Button>
      {this.state.modal && <Modal isOpen={this.state.modal} toggle={this.toggle} size ={"lg"} className={this.props.className}>

      <ModalHeader toggle={this.toggle}>Customize Questions</ModalHeader>
      <ModalBody>
<div className =  "learnosity-question-editor"></div>
      </ModalBody>
      <ModalFooter>
       <Button color="danger" onClick={this.toggle}>Cancel</Button>
      <Button color="secondary" onClick={this.done}>Save</Button>
      </ModalFooter>

      </Modal>}
      </div>
    )

  }
}

  var mcqQuestionFormat = (finalQuestion,book_id) =>{
      let choices = []
      finalQuestion.options.map((option)=>{
        choices.push(option.label)
      })
      let answer = ""
    if(finalQuestion.validation.valid_response.value.length != 0){
      answer = finalQuestion.validation.valid_response.value[0]
    }
    else{
      answer = finalQuestion.valid_responses[0].value
    }

      let finalData = {
        combine_problem_id : finalQuestion.response_id,
        question:finalQuestion.stimulus,
        choices:choices,
        answer:answer,
        chapter : finalQuestion.chapter,
        questType : finalQuestion.questionType,
        book_id :book_id,
        question_category : "mcq"
      }

      return finalData


  }

  var matchingQuestionFormat = (finalQuestion,book_id) =>{
   let finalData = {
     combine_problem_id : finalQuestion.response_id,
     stimulus : finalQuestion.stimulus,
     stimulus_list : finalQuestion.stimulus_list,
     possible_responses : finalQuestion.possible_responses,
     valid_responses : finalQuestion.validation.valid_response.value,
     book_id : book_id,
     question_category : "association",
     chapter : finalQuestion.chapter,
     questionType : finalQuestion.questionType
   }
return finalData

  }
  export default SaveQuestion
