import React, { Component } from 'react';
import {connect} from 'react-redux';
import BookListTable from './BookListTable'
import {fetchBookList,newBookId} from "../../Actions/BookListAction"
import {
  Redirect
} from 'react-router-dom'

const mapStateToProps = state => {
  return {
    booklist :state.booklist,
    data :state.login,
    question :state.question
  }
}

const mapDispatchToProps = {
    fetchBookList,
    newBookId
}

class BooksList  extends Component {
  render(){
    if(this.props.data.user  == ""){
      return(
<Redirect to={'/'} />
)
    }
    if(this.props.question.current_book_id != ""){
      return(
       <Redirect to={'/question'} />
      )
    }

    return (
<BookListTable
booklist ={this.props.booklist}
  fetchBookList = {this.props.fetchBookList}
  newBookId = {this.props.newBookId}
  question  = {this.props.question}
/>

    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(BooksList)
