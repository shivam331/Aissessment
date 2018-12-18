import React, { Component } from 'react';
import ReactDOM from "react-dom";
import TitleBar from '../../Reusable/TitleBar'
import MenuBar from './MenuBar'
import QuestionCatBar from './QuestionCatBar'


class HeaderView extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
<div>
<TitleBar
headerState ={this.props.headerState}
book_id = {this.props.book_id}
headerFetch = {this.props.headerFetch}
setCurrentBookId = {this.props.setCurrentBookId}
userLogOut ={this.props.userLogOut}
user = {this.props.user}
/>

<MenuBar
book_id = {this.props.book_id}
headerFetch = {this.props.headerFetch}
questionfetch = {this.props.questionfetch}
headerState ={this.props.headerState}
questionsState = {this.props.questionsState}
newChapter = {this.props.newChapter}
newType ={this.props.newType}
showQuestions ={this.props.showQuestions}
newMode = {this.props.newMode}
fetchKeyPhrases = {this.props.fetchKeyPhrases}
showQuestions = {this.props.showQuestions}
keyPhrasesState = {this.props.keyPhrasesState}
newCategory = {this.props.newCategory}

/>

<QuestionCatBar
newCategory = {this.props.newCategory}
book_id = {this.props.book_id}
pagesContext = {this.props.pagesContext}
headerState ={this.props.headerState}
dataCount = {this.props.dataCount}
questionsState = {this.props.questionsState}
questionfetch = {this.props.questionfetch}
saveQuestionState = {this.props.saveQuestionState}
showQuestions = {this.props.showQuestions}
keyPhrasesState = {this.props.keyPhrasesState}
/>
</div>
)
  }
}


export default (HeaderView)
