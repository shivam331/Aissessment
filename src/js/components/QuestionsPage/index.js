import React, { Component } from 'react';
import HeaderView from "./Header";
import QuestionView from './Body'
import {connect} from 'react-redux';
import {
  Redirect
} from 'react-router-dom'
import history from '../../utils/history'
// var book_id =15;
const mapStateToProps = state => {
  return {
    data :state.login,
    book_id :state.booklist.currentBookId
  }
}


class QuestionPage extends Component{
  componentWillMount(){

  }

  componentWillReceiveProps(newProps){
    if(!newProps.data.user){
  history.replace('/')
  }
if(!newProps.book_id){

  history.replace('/books')
}

  }

render()
  {
    return (
        <div>
        <HeaderView
        book_id = {this.props.book_id}/>

        { this.props.book_id && <QuestionView
        book_id = {this.props.book_id}
        />}
        </div>
    );
}}
export default connect(mapStateToProps)(QuestionPage)
