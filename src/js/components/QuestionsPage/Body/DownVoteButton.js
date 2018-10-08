import React, {
  Component
} from 'react';
import ReactDOM from "react-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  UncontrolledAlert,
} from 'reactstrap'
import OverlayLoader from 'react-loading-indicator-overlay/lib/OverlayLoader';
var modal_checkbox_text = ["The question did not make sense", "The distractors were inappropriate for the question stem",
"There was a formatting issue in the question stem or distractors", "The distractors weren't similar enough to each other"
];

var selectedFeedback= []
var commentsText = ""

class DownVoteBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
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
          modal: !this.state.modal
        });
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
    this.setState({
      modal: !this.state.modal
    });
  }
  render() {
    const title_mssg = "Please tell us more about why this question doesn't work"
    return (
      <  div className = "col-8-md px-2" >
      <a href = "#" onClick = {this.toggle}
      className = "fa fa-thumbs-down" > < /a>
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
    modal_checkbox_text.forEach((text,index) => {
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
