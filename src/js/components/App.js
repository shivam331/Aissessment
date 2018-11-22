import React, { Component } from 'react';
import LoginView from './LoginPage'
import QuestionPage from './QuestionsPage'
import BookPage from './BookPage'
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import history from '../utils/history'

const mapStateToProps = state => {
  return {
    data :state.login
  }
}


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


  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        (this.props.data.user != "") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );


  export default (App)
