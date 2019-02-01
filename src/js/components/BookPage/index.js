import React, { Component } from 'react';
import {connect} from 'react-redux';
import BookListTable from './BookListTable'
import {fetchBookList,setCurrentBookId,fetchBookActivitySummary} from "../../Actions/BookListAction"
import {userLogOut} from "../../Actions/loginActions"
import history from '../../utils/history'
import {Row, Col,Container} from 'reactstrap'
import TitleBar from '../Reusable/TitleBar'
import {
  Redirect
} from 'react-router-dom'

const mapStateToProps = state => {
  return {
    booklist :state.booklist,
    data :state.login
  }
}

const mapDispatchToProps = {
  fetchBookList,
  setCurrentBookId,
  userLogOut,
  fetchBookActivitySummary
}

class BooksList  extends Component {
  componentWillUpdate(nextProps, nextState) {
    if(nextProps.data.user && nextProps.booklist.currentBookId){

    }

  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.data.user){
      history.replace('/')
    }
    if( this.props.booklist.currentBookId !== nextProps.booklist.currentBookId
      || this.props.booklist.showQuestions !== nextProps.booklist.showQuestions){
      // this.props.newChapter("All Chapters");
      // this.props.newType("Example")
       history.push('/question')
     }}


  componentWillMount() {
  if(!this.props.data.user){
    history.replace('/')
  }

  }



  render(){
    return (
      <div>
      <TitleBar
        user = {this.props.data.user}
        name = {this.props.data.name}
        setCurrentBookId = {this.props.setCurrentBookId}
        userLogOut = {this.props.userLogOut}
        />

      <BookListTable
      booklist ={this.props.booklist}
      fetchBookList = {this.props.fetchBookList}
      newBookId = {this.props.setCurrentBookId}
      fetchBookActivitySummary = {this.props.fetchBookActivitySummary}
      />
    </div>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(BooksList)
