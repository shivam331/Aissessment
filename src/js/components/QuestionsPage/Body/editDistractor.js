import React, { Component } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter,Table,Input   } from 'reactstrap'




class EditDistractor extends Component{
  constructor(props) {
  super(props);
  this.state = {
    modal: false,

  };

  this.toggle = this.toggle.bind(this);
}
toggle() {
  this.setState({
    modal: !this.state.modal
  });
}



  render(){
    return(
<div>
           <Button color="primary" size="sm"  onClick={this.toggle}>Edit Distractors</Button>
              <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Customize Distractors</ModalHeader>
            <ModalBody>
            <ModalBodyContent distractors = {this.props.distractors}/>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={this.toggle}>Save Changes</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
</div>
    )
  }
}

class ModalBodyContent extends Component{
  constructor(props){
    super(props)
    this.state = {
      currentDistractors : props.distractors
    }
    console.log(props.distractors);
this.deleteRow = this.deleteRow.bind(this)
  }
  deleteRow(index){
    let newDistractors =[]
     newDistractors=this.state.currentDistractors
 newDistractors.splice(index, 1);
 this.setState(prevState=>({
   currentDistractors : prevState.currentDistractors = newDistractors
 }))


  }
  render(){
    console.log("Edit disaaaa");
    console.log(this.props.distractors);
    const rows = [];
    this.state.currentDistractors.map((distractor,index)=> {
      rows.push(
         <Distractors distractor = {distractor.value} key  = {distractor.value} index = {index}
          deleteRow = {this.deleteRow}/>
      )
    });


    return(<Table hover borderless>
    <tbody>
    {rows}
    </tbody>
    </Table>)

  }
}

class Distractors extends Component {
  constructor(props){
    super(props)
    this.state = {
      nestedModal: false

    };
    this.toggleNested = this.toggleNested.bind(this);
    this.delete =this.delete.bind(this)

  }
  delete(e){
    e.preventDefault()
    this.props.deleteRow(this.props.index)
  }

  toggleNested() {
     this.setState({
       nestedModal: !this.state.nestedModal,
     });
   }


  render(){
    return(
<tr>
 <th scope="row">{this.props.index + 1}</th>
<td>{this.props.distractor}</td>
<td><Button color="primary" size="sm"  onClick={this.toggleNested}><i className="fa fa-pencil fa-fw"></i>{' '}Edit</Button></td>
        <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} >
           <ModalHeader>{this.props.distractor}</ModalHeader>
           <ModalBody>
           <Input type = "textarea"
           name = "text"
           id = "exampleText"
           placeholder = "Enter your distractor..." / >
           </ModalBody>
           <ModalFooter>
             <Button color="primary" onClick={this.toggleNested}>Done</Button>{' '}
             <Button color="secondary" onClick={this.toggleNested}>All Done</Button>
           </ModalFooter>
         </Modal>


<td><Button color="danger" size="sm" onClick = {this.delete}><i className="fa fa-trash-o fa-lg"></i>{' '}Delete</Button></td>
</tr>

    )
  }
}


export default EditDistractor
