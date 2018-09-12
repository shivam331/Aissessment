import React, { Component } from 'react';
import ReactDOM from "react-dom";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input,} from 'reactstrap'

var modal_checkbox_text = ["The question did not make sense","The distractors were inappropriate for the question stem",
"There was a formatting issue in the question stem or distractors", "The distractors weren't similar enough to each other"];

class DownVoteBtn extends Component {
  constructor(props) {
      super(props);
      this.state = {
        modal: false
      };
      this.toggle = this.toggle.bind(this);
    }

    toggle() {
      this.setState({
        modal: !this.state.modal
      });
    }
  render(){
    const title_mssg = "Please tell us more about why this question doesn't work"
    return(
        <div className = "col-10-md px-2">
        <span onClick={this.toggle} className="fa fa-thumbs-down"></span>
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
  <ModalHeader toggle={this.toggle}>{title_mssg}</ModalHeader>
  <ModalBody>
  <ModalBodyContent />
  </ModalBody>
  <ModalFooter>
    <Button color="danger" onClick={this.toggle}>Cancel</Button>{' '}
    <Button color="primary" onClick={this.toggle}>Submit Feedback</Button>
  </ModalFooter>
</Modal>
  </div>
    );
  }
}
class ModalBodyContent extends Component{
  render(){
    const checkboxes = [];
modal_checkbox_text.forEach((text)=>{
  checkboxes.push(
    <Checkbox text = {text} key = {text}/>
  )
});
    return(
      <Form>
        <FormGroup >
        {checkboxes}
        </FormGroup>
          <Input type="textarea" name="text" id="exampleText" placeholder = "Other Comments" />
      </Form>
    );
  }
}
class Checkbox extends Component{
  render(){
    return(
    <FormGroup check>
        <Label check>
            <Input type="checkbox" />{this.props.text}
        </Label>
    </FormGroup>
  );
  }
}

export default DownVoteBtn
