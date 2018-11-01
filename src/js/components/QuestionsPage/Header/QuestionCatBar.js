import React, { Component } from 'react';
import QuestTypes from './QuestionTypes';
import BookViewer from './BookViewer'
import {Modal, ModalHeader, ModalBody, ModalFooter,
  Nav, Row, Col,Button } from 'reactstrap';

  // var question_types = [{"id" : 1,"category":"mcq","category_name":"Multiple Choice"},{"id" : 2,"category":"association","category_name":"Matching"},
  // {"id" :3,"category":"orderlist","category_name":"Sorting"}, {"id": 4,"category":"clozetext","category_name":"Fill in the blanks"}]

  var question_types = [{"id" : 1,"category":"mcq","category_name":"Multiple Choice"}]

  export class QuestionCatBar extends Component{
    constructor(props){
      super(props)
    }
    render(){

      const quest_types = [];
      question_types.forEach((type,index)=>{
        quest_types.push(
          <QuestTypes name = {type.category_name}
          key = {type.category}
          category_id = {type.id}
          oncatchange ={this.props.oncatchange}
          newCategory = {this.props.newCategory}
          />
        );
      })
      return(
        <div className = " mx-3 my-3">
        <Row>
        <Col xs="6">
        <Nav >
        {quest_types}
        </Nav>
        </Col>
        <Col xs="6">
         <MenuCatButtons
         pagesContext = {this.props.pagesContext}
         book_id = {this.props.book_id}
         data ={this.props.data} />
        </Col>
        </Row>
        </div>
      );
    }
  }

  class MenuCatButtons extends Component{
    render(){
      return(
        <div  className = "d-inline-block float-right " >
        <BookViewer
       pagesContext = {this.props.pagesContext}
       book_id = {this.props.book_id}
       data ={this.props.data}
       />
        </div>
      );
    }
  }
  // <ExportQtBtn />
  // <AddBankBtn  />
  class ExportQtBtn extends Component {
    render(){
      return(
        <Button type="button" className="btn btn-outline-secondary mr-2 shadow">Export To QTI</Button>
      );
    }
  }

  class AddBankBtn extends Component {
    render(){
      return(
        <Button type="button" className="btn btn-outline-secondary ml-2 shadow">Add To Bank</Button>
      );
    }
  }


  export default QuestionCatBar
