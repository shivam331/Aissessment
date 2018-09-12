import React, { Component } from 'react';
import {connect} from 'react-redux';
import QuestionBox from './QuestionBox'
import {fetchQuestionData} from "../../Actions/QuestionBoxActions"

const mapStateToProps = state => {
  return {
    data :state.question
  }
}

const mapDispatchToProps = {
    fetchQuestionData
}

class QuestionView  extends Component {
  render(){
    return (
<QuestionBox
data ={this.props.data}
  book_id = {this.props.book_id}
  questionfetch = {this.props.fetchQuestionData}
/>

    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuestionView)
