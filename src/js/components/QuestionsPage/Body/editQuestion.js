import React, { Component } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter,Table,Input,CustomInput,Alert ,Label  } from 'reactstrap'
import {FETCH_QUESTION_SUCCESS } from "../../../Actions/QuestionBoxActions"
import {API} from "../../../utils/api_list";
import {QuestionBox} from './QuestionBox'

class EditQuestion extends Component{
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
    this.toggle = this.toggle.bind(this);

  }
  toggle() {

    this.setState((prevState)=>({
      modal: !prevState.modal
    }));
  }

  render(){
    return(
      <div className = "col-2-md px-2">
      <Button color="primary" size="sm"  onClick={this.toggle}> Save </Button>
      {this.state.modal && <Modal isOpen={this.state.modal} toggle={this.toggle}>
      <ModalHeader toggle={this.toggle}>Customize Question</ModalHeader>
      <ModalBody>
      <ModalBodyContent />
      </ModalBody>
      <ModalFooter>
      <Button color="secondary" onClick={this.toggle}>Done</Button>
      </ModalFooter>
      </Modal>}
      </div>
    )
  }
}

class ModalBodyContent extends Component{
  render(){
    return(
      <div>
      </div>
      )

    }
  }

  export default EditQuestion
