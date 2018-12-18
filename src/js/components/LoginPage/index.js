import React, { Component } from 'react';
import {connect} from 'react-redux';
import LoginView from './LoginView'
import {userlogin} from "../../Actions/loginActions"
import {
  Redirect
} from 'react-router-dom'
import history from '../../utils/history'
const mapStateToProps = state => {
  return {
    data :state.login
  }
}

const mapDispatchToProps = {
    userlogin
}


class Login  extends Component {
componentWillReceiveProps(nextProps) {
  if(nextProps.data.user){
  history.push('/books')
  }
}

  render(){
    return (
<LoginView
userdetails ={this.props.data}
  userlogin = {this.props.userlogin}
/>

    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)
