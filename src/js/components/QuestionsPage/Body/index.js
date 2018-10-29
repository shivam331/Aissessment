import React, { Component } from 'react';
import {connect} from 'react-redux';
import QuestionBox from './QuestionBox'
import RankKeyPhrases from './rankKeyPhrases'



class QuestionView  extends Component {
  render(){

    if(!this.props.showQuestions){

    return(
      <RankKeyPhrases
        data ={this.props.keyPhrasesState}
        book_id = {this.props.book_id}
        fetchKeyPhrases = {this.props.fetchKeyPhrases}
        saveKeyphraseRating  = {this.props.saveKeyphraseRating}
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
  saveQuestion = {this.props.saveQuestion}
  saveQuestionState = {this.props.saveQuestionState}
  fetchBlacklistedDistractors = {this.props.fetchBlacklistedDistractors}

/>

    )
  }
  }
}

export default (QuestionView)
