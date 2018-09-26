import React, { Component } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter,Table,Input,CustomInput,Alert   } from 'reactstrap'
import {FETCH_QUESTION_SUCCESS } from "../../../Actions/QuestionBoxActions"
import {API} from "../../../utils/api_list";


class EditDistractor extends Component{
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
           <Button color="primary" size="sm"  onClick={this.toggle}>Edit Distractors</Button>
              {this.state.modal && <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Customize Distractors</ModalHeader>
            <ModalBody>
            <ModalBodyContent distractors = {this.props.distractors} blacklistDistractors = {this.props.blacklistDistractors}
            distractorState = {this.props.distractorState} updateDistractors = {this.props.updateDistractors}
            data ={this.props.data}
              book_id = {this.props.book_id}
              questionfetch = {this.props.questionfetch}
            />
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
  constructor(props){
    super(props)
    this.state = {
      currentDistractors : props.distractors
    }
this.deleteRow = this.deleteRow.bind(this)
this.updateDistarctor = this.updateDistarctor.bind(this)
  }
  componentDidUpdate(prevProps,prevState){

    if(this.props.distractorState.status != prevProps.distractorState.status && this.props.distractorState.status == "success"){
        let api = API.QUESTIONS+this.props.book_id+"/" + this.props.data.chapter + "/" + this.props.data.questiontypes + "/"
        + this.props.data.page_no;
         this.props.questionfetch(api,FETCH_QUESTION_SUCCESS,this.props.data.current_category,this.props.data.page_no,true);
    }
  }
  deleteRow(index){
 // this.setState(prevState=>{
 //  const distractortext = prevState.deleteDistractors
 //  distractortext.push(prevState.currentDistractors[index])
 //   const newDistractors = [...prevState.currentDistractors]
 //   newDistractors.splice(index,1)
 //   return {
 //     currentDistractors : newDistractors,
 //     deleteDistractors : distractortext
 //   }
 // })
  // console.log(this.props.questionfetch);

 this.props.blacklistDistractors(this.state.currentDistractors[index].value)


}

 updateDistarctor(newDistractor,oldDistractor){
//    this.setState(prevState=>{
//      const newdistractor = [...prevState.currentDistractors]
//      newdistractor[index] = {label: updatedText,
// value: updatedText}
//      return {
//        currentDistractors : newdistractor
//      }
//    })
let data = {
  from : oldDistractor,
  to : newDistractor
}
this.props.updateDistractors(data)
 }




  render(){
    const rows = [];
    this.state.currentDistractors.map((distractor,index)=> {
      rows.push(
         <Distractors distractor = {distractor.value} key  = {distractor.value} index = {index}
          deleteRow = {this.deleteRow} updateDistarctor = {this.updateDistarctor}/>
      )
    });

    if (this.props.distractorState.error) {
      return <p>{this.props.distractorState.error.message}</p>;
    }

    if (this.props.distractorState.loading) {
      return <p>Updating Distractors ...</p>;
    }

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
    this.delete =this.delete.bind(this)
    this.updateDistarctor = this.updateDistarctor.bind(this)
      this.updateDistarctorText = React.createRef();

  }
  delete(e){
    e.preventDefault()
    this.props.deleteRow(this.props.index)
  }

  updateDistarctor(e){
    e.preventDefault()
  if(this.updateDistarctorText.current.value != "")
{
     this.props.updateDistarctor(this.updateDistarctorText.current.value,this.props.distractor)
}
else{
alert("Please Enter the Distarctors.")

}
  }



  render(){
    return(
<tr>
 <th scope="row">{this.props.index + 1}</th>
<td> <CustomInput  type="text" name="text" id="exampleText" placeholder = {this.props.distractor} innerRef = {this.updateDistarctorText} /></td>
<td><Button color="primary" size="sm" onClick = {this.updateDistarctor}>{' '}Update</Button></td>
<td><Button color="danger" size="sm" onClick = {this.delete}><i className="fa fa-trash-o fa-lg"></i>{' '}Delete</Button>{' '}</td>
</tr>

    )
  }
}


export default EditDistractor
