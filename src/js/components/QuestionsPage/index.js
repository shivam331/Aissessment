import React, { Component } from 'react';
import HeaderView from "./Header";
import QuestionView from './Body'
import {connect} from 'react-redux';
import { fetchHeaderData } from "../../Actions/HeaderActions"
import {fetchQuestionData,newChapter,newType,newCategory,newMode} from "../../Actions/QuestionBoxActions"
import {setCurrentBookId} from "../../Actions/BookListAction"
import {userLogOut} from "../../Actions/loginActions"
import {blacklistDistractors,updateDistractors} from "../../Actions/DistractorActions"
import {submitfeedback} from "../../Actions/FeedBackAction"
import {saveQuestion} from "../../Actions/SaveQuestionAction"
import history from '../../utils/history'


const mapStateToProps = state => {
  return {
    userdetails :state.login,
    bookPageState :state.booklist,
    data : state.header,
    questions_meta : state.question,
    distractorState : state.blacklistDistractor,
    feedbackState : state.feedback,
    saveQuestionState : state.saveQuestion
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
  newMode

}

class QuestionPage extends Component{
  componentWillUpdate(nextProps, nextState) {


    // if(!nextProps.book_id){
    //   history.push('/books')
    //   // history.replace('/books')
    // }
  }
  componentWillUnmount() {
       this.props.newMode(true)
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
        />}
        </div>
      );
    }}
    export default connect(mapStateToProps,mapDispatchToProps)(QuestionPage)
