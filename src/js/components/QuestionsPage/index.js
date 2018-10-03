import React, { Component } from 'react';
import HeaderView from "./Header";
import QuestionView from './Body'
import {connect} from 'react-redux';
import { fetchHeaderData } from "../../Actions/HeaderActions"
import {fetchQuestionData,newChapter,newType,newCategory} from "../../Actions/QuestionBoxActions"
import {setCurrentBookId} from "../../Actions/BookListAction"
import {userLogOut} from "../../Actions/loginActions"
import {blacklistDistractors,updateDistractors} from "../../Actions/DistractorActions"
import history from '../../utils/history'
// var book_id =15;
const mapStateToProps = state => {
  return {
    userdetails :state.login,
    book_id :state.booklist.currentBookId,
    data : state.header,
    questions_meta : state.question,
    distractorState : state.blacklistDistractor,

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
  updateDistractors

}

class QuestionPage extends Component{
  componentWillUpdate(nextProps, nextState) {


    // if(!nextProps.book_id){
    //   history.push('/books')
    //   // history.replace('/books')
    // }
  }

  componentWillReceiveProps(nextProps){
    if(!nextProps.userdetails.user){
      history.replace('/')
    }
  }
  componentWillMount(){
    if(!this.props.userdetails.user){
      history.replace('/')
    //  history.push('/')
    }
    if(!this.props.book_id)
    {
      history.push('/books')
    }
  }


  render()
  {
    // console.log("this is question");
    // console.log(this.props);
    return (
      <div>
      <HeaderView
      book_id = {this.props.book_id}
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
      />

      { this.props.book_id && <QuestionView
        book_id = {this.props.book_id}
        questionfetch = {this.props.fetchQuestionData}
        blacklistDistractors = {this.props.blacklistDistractors}
        distractorState = {this.props.distractorState}
        updateDistractors = {this.props.updateDistractors}
        data = {this.props.questions_meta}
        />}
        </div>
      );
    }}
    export default connect(mapStateToProps,mapDispatchToProps)(QuestionPage)
