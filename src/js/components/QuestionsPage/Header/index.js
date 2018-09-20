import React, { Component } from 'react';
import ReactDOM from "react-dom";
import TitleBar from './TitleBar'
import MenuBar from './MenuBar'
import QuestionCatBar from './QuestionCatBar'
import {connect} from 'react-redux';

import { fetchHeaderData } from "../../../Actions/HeaderActions"
import {fetchQuestionData,newChapter,newType,newCategory} from "../../../Actions/QuestionBoxActions"

const mapStateToProps = state => {
  return {
    data : state.header,
    questions_meta : state.question
  }
}

const mapDispatchToProps = {
    fetchHeaderData,
    fetchQuestionData,
    newChapter,
    newType,
    newCategory

}

class HeaderView extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
<div>
<TitleBar
data ={this.props.data}
book_id = {this.props.book_id}
headerFetch = {this.props.fetchHeaderData}/>

<MenuBar
book_id = {this.props.book_id}
headerFetch = {this.props.fetchHeaderData}
questionfetch = {this.props.fetchQuestionData}
data ={this.props.data}
questions_meta = {this.props.questions_meta}
newChapter = {this.props.newChapter}
newType ={this.props.newType}/>

<QuestionCatBar
newCategory = {this.props.newCategory}
oncatchange = {this.props.oncatchange}
book_id = {this.props.book_id} />
</div>
)
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(HeaderView)
