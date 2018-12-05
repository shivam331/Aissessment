import React, { Component } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter,Table,Input,CustomInput,Alert ,Label  } from 'reactstrap'
import {FETCH_QUESTION_SUCCESS } from "../../../Actions/QuestionBoxActions"
import {API} from "../../../utils/api_list";
import {notify} from 'react-notify-toast';
import {QuestionCode} from "../../../utils/Constants";
import {myURL} from "../../../utils/api_list";


class EditDistractor extends Component{
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
    this.toggle = this.toggle.bind(this)

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
      questionsState ={this.props.questionsState}
      book_id = {this.props.book_id}
      questionfetch = {this.props.questionfetch}
      question = {this.props.question}
      headerState = {this.props.headerState}
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
     if(this.props.headerState.editingMode){
    if(this.props.distractorState.status != prevProps.distractorState.status && this.props.distractorState.status == "success"){
          let details = {
                book_id : this.props.book_id,
                currentChapter : this.props.headerState.currentChapter,
                currentQuestiontype : this.props.headerState.currentQuestiontype,
                sortBy : this.props.questionsState.sorting,
                page_no : this.props.questionsState.page_no,
                current_category : QuestionCode.EditingMode + this.props.headerState.current_category
              }
              let url = myURL(details)
              this.props.questionfetch(url,FETCH_QUESTION_SUCCESS,details.current_category,details.page_no,true)
      // let api = API.QUESTIONS+this.props.book_id+"/" + this.props.headerState.currentChapter + "/" + this.props.headerState.currentQuestiontype + "/"
      // + this.props.questionsState.page_no;
      //  this.props.questionfetch(api,FETCH_QUESTION_SUCCESS,this.props.headerState.current_category,this.props.questionsState.page_no,true);
    }
  }
  }
  deleteRow(index){

    this.props.blacklistDistractors(this.state.currentDistractors[index].value,this.props.book_id)
    .then(status =>{
      if(status == "success"){
        let myColor = { background: '#228B22', text: "#FFFFFF" };
notify.show("Distractor BlackListed successfully!", "custom", 5000, myColor);
     sessionStorage.setItem('edited_question',this.props.question.response_id);
      }
    })
  }

  updateDistarctor(newDistractor,oldDistractor){
    let data = {
      from : oldDistractor,
      to : newDistractor
    }
    this.props.updateDistractors(data)
    .then(status =>{
      if(status == "success"){
        let myColor = { background: '#228B22', text: "#FFFFFF" };
notify.show("Distractor Updated successfully!", "custom", 5000, myColor);
     sessionStorage.setItem('edited_question',this.props.question.response_id);
      }
    })
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
      return <Label>{this.props.distractorState.error.message}</Label>;
    }

    if (this.props.distractorState.loading) {
      return <Label>Updating Distractors ...</Label>;
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
