import React, { Component } from 'react';
import HeaderView from "./Header";
import QuestionView from './Body'
var book_id =1;
class App extends Component{
  constructor(props){
    super(props)
  }

  render(){

    return (
      <div>
      <HeaderView
      book_id = {book_id}/>

      <QuestionView
      book_id = {book_id}
      />
      </div>
    );

  }
}

export default App;
