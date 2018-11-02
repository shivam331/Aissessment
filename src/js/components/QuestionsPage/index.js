import React, { Component } from 'react';
import HeaderView from "./Header";
import QuestionView from './Body'
import {connect} from 'react-redux';
import { fetchHeaderData } from "../../Actions/HeaderActions"
import {fetchQuestionData,newChapter,newType,newCategory,newMode,pagesContext} from "../../Actions/QuestionBoxActions"
import {setCurrentBookId} from "../../Actions/BookListAction"
import {userLogOut} from "../../Actions/loginActions"
import {blacklistDistractors,updateDistractors} from "../../Actions/DistractorActions"
import {submitfeedback} from "../../Actions/FeedBackAction"
import {saveQuestion} from "../../Actions/SaveQuestionAction"
import {fetchKeyPhrases,saveKeyphraseRating,resetKeyphrasesState} from "../../Actions/KeyPhrasesAction"
import history from '../../utils/history'
import Notifications from 'react-notify-toast';

const mapStateToProps = state => {
  return {
    userdetails :state.login,
    bookPageState :state.booklist,
    data : state.header,
    questions_meta : state.question,
    distractorState : state.blacklistDistractor,
    feedbackState : state.feedback,
    saveQuestionState : state.saveQuestion,
    keyPhrasesState : state.keyPhrase
  }
}

const mapDispatchToProps = {
  fetchHeaderData,
  fetchQuestionData,
  newChapter,
  newType,
  newCategory,
  setCurrentBookId,
  userLogOut,
  blacklistDistractors,
  updateDistractors,
  submitfeedback,
  saveQuestion,
  newMode,
  fetchKeyPhrases,
  saveKeyphraseRating,
  resetKeyphrasesState

}

class QuestionPage extends Component{


  componentWillUnmount() {
       this.props.newMode(true)
       this.props.newChapter("All Chapters");
       this.props.newType("Example")
       this.props.resetKeyphrasesState()
    }
  componentWillReceiveProps(nextProps){
    if(!nextProps.userdetails.user){
      history.replace('/')
    }
  }
  componentWillMount(){
    if(!this.props.userdetails.user){
      history.replace('/')
    }
    if(!this.props.bookPageState.currentBookId)
    {
      history.push('/books')
    }
  }


  render()
  {

    return (
      <div>
       <Notifications />
      <HeaderView
      book_id = {this.props.bookPageState.currentBookId}
      headerFetch = {this.props.fetchHeaderData}
      setCurrentBookId = {this.props.setCurrentBookId}
      userLogOut ={this.props.userLogOut}
      data ={this.props.data}
      questionfetch = {this.props.fetchQuestionData}
      questions_meta = {this.props.questions_meta}
      newChapter = {this.props.newChapter}
      newType ={this.props.newType}
      newCategory = {this.props.newCategory}
      oncatchange = {this.props.oncatchange}
      showQuestions={this.props.bookPageState.showQuestions}
      user = {this.props.userdetails.user}
      newMode = {this.props.newMode}
      fetchKeyPhrases = {this.props.fetchKeyPhrases}
      pagesContext = {pagesContext}
      />

      { this.props.bookPageState.currentBookId && <QuestionView
        book_id = {this.props.bookPageState.currentBookId}
        questionfetch = {this.props.fetchQuestionData}
        blacklistDistractors = {this.props.blacklistDistractors}
        distractorState = {this.props.distractorState}
        updateDistractors = {this.props.updateDistractors}
        data = {this.props.questions_meta}
        submitfeedback = {this.props.submitfeedback}
        feedbackState = {this.props.feedbackState}
        showQuestions={this.props.bookPageState.showQuestions}
        saveQuestion = {this.props.saveQuestion}
        saveQuestionState = {this.props.saveQuestionState}
        fetchKeyPhrases = {this.props.fetchKeyPhrases}
        keyPhrasesState = {this.props.keyPhrasesState}
        saveKeyphraseRating  = {this.props.saveKeyphraseRating}
        pagesContext = {pagesContext}
        />}
        </div>
      );
    }}
    export default connect(mapStateToProps,mapDispatchToProps)(QuestionPage)
