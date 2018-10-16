import React, { Component } from 'react';
import {connect} from 'react-redux';
import QuestionBox from './QuestionBox'



class QuestionView  extends Component {
  constructor(props){
    super(props)
  }
  render(){
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
  />

    )
  }
}

export default (QuestionView)
