import React, { Component } from 'react';
import {Button } from 'reactstrap';
import { FETCH_QUESTION_SUCCESS} from "../../../Actions/QuestionBoxActions"
import {API,myURL} from "../../../utils/api_list"
import {QuestionCode} from '../../../utils/Constants'


class QuestTypes extends Component{
  constructor(props){
    super(props)
    this.handleclick = this.handleclick.bind(this);
  }
  handleclick(e) {
    e.preventDefault()

    this.props.newCategory(this.props.category_id)

  }


  componentWillReceiveProps(nextProps){
    if(this.props.headerState.current_category != nextProps.headerState.current_category &&
      nextProps.category_id == nextProps.headerState.current_category){
        let details = {
          book_id : this.props.book_id,
          currentChapter : nextProps.headerState.currentChapter,
          currentQuestiontype : nextProps.headerState.currentQuestiontype,
          sortBy : nextProps.questionsState.sorting,
          page_no : 0
        }
        if(nextProps.headerState.editingMode){
          details.current_category = QuestionCode.EditingMode + nextProps.headerState.current_category
        }
        else{
          details.current_category = QuestionCode.SavedMode + nextProps.headerState.current_category
        }
        let url = myURL(details)
        this.props.questionfetch(url,FETCH_QUESTION_SUCCESS,details.current_category,0,true)
      }

    }

    render(){
      return(
        <Button size = {(this.props.category_id == this.props.headerState.current_category)? "lg" : "sm" } color = "link" onClick={this.handleclick} >{this.props.name}</Button>


      );
    }
  }
  export default QuestTypes
