import React, { Component } from 'react';
import {connect} from 'react-redux';
import BookListTable from './BookListTable'
import {fetchBookList,setCurrentBookId} from "../../Actions/BookListAction"
import history from '../../utils/history'
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
}

class BooksList  extends Component {

  componentWillMount() {

    this.props.setCurrentBookId()


  }
  componentWillReceiveProps(newProps){
    console.log(newProps.data.user);
    console.log(newProps.booklist.currentBookId);
    if(!newProps.data.user){
        history.replace('/')
    }

    if(newProps.data.user && newProps.booklist.currentBookId){
  history.replace('/question')
}
  }


  render(){

    return (
<BookListTable
booklist ={this.props.booklist}
  fetchBookList = {this.props.fetchBookList}
  newBookId = {this.props.setCurrentBookId}
/>

    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(BooksList)
