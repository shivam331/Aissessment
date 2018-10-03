import React, { Component } from 'react';
import {connect} from 'react-redux';
import QuestionBox from './QuestionBox'



class QuestionView  extends Component {
  render(){
    // console.log("Body");
    return (
<QuestionBox
data ={this.props.data}
  book_id = {this.props.book_id}
  questionfetch = {this.props.questionfetch}
  blacklistDistractors = {this.props.blacklistDistractors}
  distractorState = {this.props.distractorState}
  updateDistractors = {this.props.updateDistractors}
/>

    )
  }
}

export default (QuestionView)
