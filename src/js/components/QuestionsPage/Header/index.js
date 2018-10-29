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
data ={this.props.data}
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
data ={this.props.data}
questions_meta = {this.props.questions_meta}
newChapter = {this.props.newChapter}
newType ={this.props.newType}
showQuestions ={this.props.showQuestions}
newMode = {this.props.newMode}
fetchKeyPhrases = {this.props.fetchKeyPhrases}
/>

{this.props.showQuestions &&<QuestionCatBar
newCategory = {this.props.newCategory}
oncatchange = {this.props.oncatchange}
book_id = {this.props.book_id} />}
</div>
)
  }
}


export default (HeaderView)
