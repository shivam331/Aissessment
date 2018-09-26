import React, { Component } from 'react';
import {connect} from 'react-redux';
import BookListTable from './BookListTable'
import {fetchBookList,setCurrentBookId} from "../../Actions/BookListAction"
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
  render(){
    if(!this.props.data.user){
      return(
<Redirect to={'/'} />
)
    }
    if(this.props.booklist.currentBookId){
      return(
       <Redirect to={'/question'} />
      )
    }

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
