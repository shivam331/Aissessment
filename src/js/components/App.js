import React, { Component } from 'react';
import HeaderView from "./Header";
import QuestionBox from './Body/QuestionBox'
var book_id =1;
class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      question_catid : 1,
    };
this.categorychange = this.categorychange.bind(this);
  }

 categorychange(category_id){
   this.setState((prevState) =>
     {
      return { question_catid : prevState.questioncatid = category_id }
     }
   )
 }

render(){

  return (
    <div>
    <HeaderView
    oncatchange = {this.categorychange}
    book_id = {book_id}/>
<QuestionBox
questioncatid ={this.state.question_catid}
  book_id = {book_id}
 />
    </div>
  );

}
}

export default App;
