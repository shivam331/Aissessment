import React, { Component } from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button, FormText, FormFeedback,
} from 'reactstrap';

import styles from './loginForm.css';

class LoginView extends Component {
  constructor(props) {
    super(props);
      this.state = {
      'email': '',
      'password': '',
      validate: {
        emailState: '',
      },
    }
    this.handleChange = this.handleChange.bind(this);
  }

  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state
      if (emailRex.test(e.target.value)) {
        validate.emailState = 'has-success'
      } else {
        validate.emailState = 'has-danger'
      }
      this.setState({ validate })
    }

  handleChange(event){
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
     this.setState({
      [ name ]: value,
    });
  }

  submitForm(e) {
    e.preventDefault();
    let credentials = {
      email : this.state.email,
      password : this.state.password
    }
    this.props.userlogin(credentials)
  }

  render() {

    const { email, password } = this.state;
    if (this.props.userdetails.error) {
      return <Label>{this.props.userdetails.error.message}</Label>;
    }

    if (this.props.userdetails.loading) {
      return <Label>Signing In ...</Label>;
    }


    return (
      <Container className={styles.LoginView}>
        <h2>Log In</h2>

        <Form className={styles.form} onSubmit={ (e) => this.submitForm(e) }>
        <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="myemail@email.com"
                value={ email }
                valid={ this.state.validate.emailState === 'has-success' }
                invalid={ this.state.validate.emailState === 'has-danger' }
                onChange={ (e) => {
                            this.validateEmail(e)
                            this.handleChange(e)
                          } }
              />

            <FormText>Please enter a registerd email</FormText>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="********"
                value={ password }
                onChange={ (e) => this.handleChange(e) }
            />
            </FormGroup>
          </Col >
          <Col sm="12" md={{ size: 4, offset: 5 }}>
          <Button color="primary">Submit</Button>
          </Col>
      </Form>
      </Container>
    );
  }
}

export default LoginView;
