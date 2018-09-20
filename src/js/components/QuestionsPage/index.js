import React, { Component } from 'react';
import HeaderView from "./Header";
import QuestionView from './Body'
import {connect} from 'react-redux';
import {
  Redirect
} from 'react-router-dom'

// var book_id =15;
const mapStateToProps = state => {
  return {
    data :state.login,
    book_id :state.question.current_book_id
  }
}


class QuestionPage extends Component{

render()

  {if(this.props.data.user == ""){
    return(
     <Redirect to={'/'} />
    )
  }

    return (
        <div>
        <HeaderView
        book_id = {this.props.book_id}/>

        <QuestionView
        book_id = {this.props.book_id}
        />
        </div>
    );}
}
export default connect(mapStateToProps)(QuestionPage)
