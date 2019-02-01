import React, { Component } from 'react';
import {connect} from 'react-redux';
import QuestionBox from './QuestionBox'
import RankKeyPhrases from './rankKeyPhrases'



class QuestionView  extends Component {
  render(){

    if(!this.props.showQuestions){

    return(
      <RankKeyPhrases
        keyPhrasesState ={this.props.keyPhrasesState}
        book_id = {this.props.book_id}
        fetchKeyPhrases = {this.props.fetchKeyPhrases}
        saveKeyphraseRating  = {this.props.saveKeyphraseRating}
        questions_meta = {this.props.questionsState}
         headerState ={this.props.headerState}
      />
    )}
    else{
    return (
 <QuestionBox
 questionsState ={this.props.questionsState}
  book_id = {this.props.book_id}
  questionfetch = {this.props.questionfetch}
  blacklistDistractors = {this.props.blacklistDistractors}
  distractorState = {this.props.distractorState}
  updateDistractors = {this.props.updateDistractors}
  submitfeedback = {this.props.submitfeedback}
  feedbackState = {this.props.feedbackState}
  saveQuestion = {this.props.saveQuestion}
  saveQuestionState = {this.props.saveQuestionState}
  pagesContext = {this.props.pagesContext}
  newSorting = {this.props.newSorting}
 headerState ={this.props.headerState}
 feedbackQuestionFetch = {this.props.feedbackQuestionFetch}
 deleteFeedback = {this.props.deleteFeedback}
 updateQuestion = {this.props.updateQuestion}

/>

    )
  }
  }
}

export default (QuestionView)
