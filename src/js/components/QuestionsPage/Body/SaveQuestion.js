import React, { Component } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter,Table,Input,CustomInput,Alert ,Label  } from 'reactstrap'
import {FETCH_QUESTION_SUCCESS } from "../../../Actions/QuestionBoxActions"
import {API} from "../../../utils/api_list";
import {initOptionsEditor,callbacksEditor,hook} from "../../../utils/learnosity_configuration";
import Notifications, {notify} from 'react-notify-toast';


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
    var finalQuestion = editor.getWidget()
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
      chapter : this.props.question.chapter,
      questType : this.props.question.questionType,
      book_id :this.props.book_id
    }

    this.props.saveQuestion(finalData)
     .then(status =>
       this.toggle()
     )

  }

  render(){
    return(
      <div className = "col-2-md px-2">
      <Button color="primary" size="sm"  onClick={this.toggle}>Save</Button>
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

  export default SaveQuestion
