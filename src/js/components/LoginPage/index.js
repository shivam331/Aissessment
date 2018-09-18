import React, { Component } from 'react';
import {connect} from 'react-redux';
import LoginView from './LoginView'
import {userlogin} from "../../Actions/loginActions"

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
    return (
<LoginView
userdetails ={this.props.data}
  userlogin = {this.props.userlogin}
/>

    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)
