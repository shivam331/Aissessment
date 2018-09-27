import React, { Component } from 'react';
import {connect} from 'react-redux';
import QuestionBox from './QuestionBox'
import {fetchQuestionData} from "../../../Actions/QuestionBoxActions"
import {blacklistDistractors,updateDistractors} from "../../../Actions/DistractorActions"
const mapStateToProps = state => {
  return {
    data :state.question,
    distractorState : state.blacklistDistractor

  }
}

const mapDispatchToProps = {
    fetchQuestionData,
    blacklistDistractors,
    updateDistractors
}

class QuestionView  extends Component {
  render(){
    return (
<QuestionBox
data ={this.props.data}
  book_id = {this.props.book_id}
  questionfetch = {this.props.fetchQuestionData}
  blacklistDistractors = {this.props.blacklistDistractors}
  distractorState = {this.props.distractorState}
  updateDistractors = {this.props.updateDistractors}
/>

    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuestionView)
