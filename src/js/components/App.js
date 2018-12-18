import React, { Component } from 'react';
import LoginView from './LoginPage'
import QuestionPage from './QuestionsPage'
import BookPage from './BookPage'
// import {connect} from 'react-redux';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Router,
  Route,
  Switch
} from 'react-router-dom'
import history from '../utils/history'



class App extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <Router history = {history}>
      <Switch>
        <Route exact={true} path="/" component={LoginView} />
        <Route path="/question" component={QuestionPage} />
        <Route path="/books" component={BookPage} />
      </Switch>
      </Router>

      )
}

  }





  export default (App)
