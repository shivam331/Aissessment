import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Spinner from '../../../utils/Spinner'

export default class BookViewer extends Component {
  constructor(props) {
  super(props);
  this.state = {
    modal: false,
    content : ""
  };

  this.toggle = this.toggle.bind(this);
}
componentDidMount(){
  this.props.pagesContext(this.props.book_id)
}
componentWillReceiveProps(nextProps){
  if(this.props.headerState.context != nextProps.headerState.context){
    this.setState(prevState=>({
      content : prevState.content = nextProps.headerState.context.map(e => e.content).join(" ")
    }))
  }
}
toggle() {
  this.setState({
    modal: !this.state.modal
  });
}
render()
{

   return(
       <div className = "d-inline-block float-right ">
    <Button type="button" className="btn btn-outline-secondary shadow" onClick = {this.toggle}>Book Viewer</Button>
    <Modal isOpen={this.state.modal} size  = "lg" toggle={this.toggle} className={this.props.className}>
       <ModalHeader toggle={this.toggle}>{this.props.headerState.title}</ModalHeader>
       <ModalBody>
  { this.state.content.split('\n').map((item,i) => {
  return  <p key={i}>{item}</p>
})
}

       </ModalBody>

     </Modal>
       </div>
  );}
}
