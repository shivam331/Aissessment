import React, { Component } from 'react';
import {connect} from 'react-redux';
import LoginView from './LoginView'
import {userlogin} from "../../Actions/loginActions"
import {
  Redirect
} from 'react-router-dom'

const mapStateToProps = state => {
  return {
    data :state.login
  }
}

const mapDispatchToProps = {
    userlogin
}

class Login  extends Component {
  render(){
    if(this.props.data.user != ""){
      return(
       <Redirect to={'/books'} />
      )
    }
    return (
<LoginView
userdetails ={this.props.data}
  userlogin = {this.props.userlogin}
/>

    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)
