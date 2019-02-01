import React, {Component} from 'react';
import ReactDOM from "react-dom";
import {Button,
  Modal, ModalHeader,
  ModalBody, ModalFooter,
  Form,FormGroup,
  Label,Input
} from 'reactstrap'
import {notify} from 'react-notify-toast';
import {FeedbackReasons} from "../../../utils/Constants";
import OverlayLoader from 'react-loading-indicator-overlay/lib/OverlayLoader';



var selectedFeedback= []
var commentsText = ""

class DownVoteBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      disliked : false
    };
    this.toggle = this.toggle.bind(this);
    this.submitFeedback = this.submitFeedback.bind(this)
  }

  feedbackdata(selected,data){

    if(selected){
      selectedFeedback.push(data)
    }
    else {
      let index =   selectedFeedback.indexOf(data)
      selectedFeedback.splice(index,1)
    }
  }
  comments(text){
    commentsText =  text
  }


  submitFeedback(e){
    const authCache = localStorage.getItem('auth')
    if(selectedFeedback.length !== 0 || commentsText !== "")
    {
      let feedback = {
        reasons : selectedFeedback,
        comment : commentsText,
        question_id : this.props.question_id,
        user : JSON.parse(authCache).user
      }
      e.preventDefault()
      this.props.submitfeedback(feedback)
      .then(status =>{
        this.setState({
          modal: !this.state.modal,
        });
        if(status == "success"){
          let myColor = { background: '#228B22', text: "#FFFFFF" };
          this.props.dislikedQuestionsSuccess(this.props.question_id)
  notify.show("Feedback Saved successfully!", "custom", 5000, myColor);
        }
      })
    }
    else{
      alert("Please Enter Your Feedback.")
    }
  }


  componentWillReceiveProps(nextProps){
    if(this.props.feedbackState.status != nextProps.feedbackState.status && !nextProps.feedbackState.loading){

    }
  }
  toggle(e) {
    e.preventDefault()
    selectedFeedback = []
    commentsText = ""
    if(this.props.disliked){
      this.props.rollBackQuestionDislike(this.props.question_id)
    }
    else{
    this.setState({
      modal: !this.state.modal
    });}
  }
  render() {
    const title_mssg = "Please tell us more about why this question doesn't work"
    const color = this.props.disliked? "red" : "none"
    
    return (
      <div className = "col-8-md px-2" >
      <a  href = {"#"} onClick = {this.toggle}
      className={this.props.disliked? "fa fa-thumbs-down":"fa fa-thumbs-o-down"}  style  = {{
  color: color
}}> < /a>
      <  Modal isOpen = {this.state.modal}  toggle = {this.toggle}
      className = {this.props.className} >
      <OverlayLoader
            color={'red'} // default is white
            loader="ScaleLoader" // check below for more loaders
            text="Saving Feedback... Please wait!"
            active={this.props.feedbackState.loading}
            backgroundColor={'black'} // default is black
            opacity=".4" // default is .9
            >

      <ModalHeader toggle = {  this.toggle} > {title_mssg} < /ModalHeader>
      <ModalBody >
      <ModalBodyContent feedbackdata = {this.feedbackdata} comments = {this.comments}/ >
      </ModalBody>
      <ModalFooter >
      <Button color = "danger" onClick = {this.toggle} > Cancel < /Button>{' '}
      <Button color = "primary" onClick = {this.submitFeedback} > Submit Feedback < /Button>
      </ModalFooter >
        </OverlayLoader>
      </Modal> < /div >
    );
  }
}
class ModalBodyContent extends Component {
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.commentsText = React.createRef();
  }
  handleChange(data,selected){
    this.props.feedbackdata(selected,data)
  }
  render() {
    const checkboxes = [];
    FeedbackReasons.forEach((text,index) => {
      checkboxes.push( < Checkbox text = {text} key = {text} handleChange = {this.handleChange} index = {index}/>)
    });
    return (
      <Form >
      <FormGroup >
      {checkboxes}
      </FormGroup>
      <Input type = "textarea"
      name = "text"
      innerRef = {this.commentsText}
      onChange = {(e) => this.props.comments(this.commentsText.current.value)}
      placeholder = "Other Comments" / >
      </Form>
    );
  }
}
class Checkbox extends Component {

  constructor(props){
    super(props)
  }

  render() {
    return ( <FormGroup check >
      <  Label check >
      <Input type = "checkbox" onChange = {(e)=>this.props.handleChange(this.props.text,e.target.checked)}/ > {  this.props.text}
      </Label>
      < /FormGroup >
    );
  }
}

export default DownVoteBtn
