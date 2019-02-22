import React, {Component} from 'react';
import ReactDOM from "react-dom";
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import ReactHtmlParser from 'react-html-parser';
class ShowContext extends Component{
  constructor(props) {
   super(props);

   this.toggle = this.toggle.bind(this);
   this.state = {
     modal: false
   };
 }

 toggle(e) {
   e.preventDefault()
   this.setState({
     modal: !this.state.modal
   });

 }
 parseContext(){

   if(this.props.context){
     let data =  this.props.context.content.map((item,i) => {
      return  "<p>"+item+"</p>"
      })
      return data.join("")
   }
   else {
     return ""
   }


 }
 // dangerouslySetInnerHTML={{ __html: this.parseContext() }}
  render(){

    return(
 <div className = "col-8-md px-2" >
      <Button color={this.props.context?"primary":"secondary"}
     id={"popover"+this.props.index}
     disabled = {this.props.context?false: true} size="sm" onClick = {this.toggle}>
     View Context</Button>

     <Modal isOpen={this.state.modal} size = "lg" toggle={this.toggle} className={this.props.className}>
         <ModalHeader toggle={this.toggle}>{this.props.context?this.props.context.page.replace('.txt',''):""}</ModalHeader>
         <ModalBody    >
{ReactHtmlParser(this.parseContext() )}
         </ModalBody>
       </Modal>


      </div>

    )
  }
}

export default ShowContext
