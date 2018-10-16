import React, { Component } from 'react';
import {connect} from 'react-redux';
import QuestionBox from './QuestionBox'
import RankKeyPhrases from './rankKeyPhrases'



class QuestionView  extends Component {
  constructor(props){
    super(props)
  }
  render(){

    if(!this.props.showQuestions){

    return(
      <RankKeyPhrases
        data ={this.props.data}
        book_id = {this.props.book_id}
        questionfetch = {this.props.questionfetch}
      />
    )}
    else{
    return (
<QuestionBox
data ={this.props.data}
  book_id = {this.props.book_id}
  questionfetch = {this.props.questionfetch}
  blacklistDistractors = {this.props.blacklistDistractors}
  distractorState = {this.props.distractorState}
  updateDistractors = {this.props.updateDistractors}
  submitfeedback = {this.props.submitfeedback}
  feedbackState = {this.props.feedbackState}
<<<<<<< HEAD
  />
=======
  saveQuestion = {this.props.saveQuestion}
  saveQuestionState = {this.props.saveQuestionState}

/>
>>>>>>> aa77b2c429f473caf3208fe6e4ec62e4a28dc9fe

    )
  }
  }
}

export default (QuestionView)
