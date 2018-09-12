import React, { Component } from 'react';
import QuestTypes from './QuestionTypes';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, ListGroup, ListGroupItem,
  Nav, Row, Col,Button } from 'reactstrap';

  var question_types = [{"id" : 1,"category":"mcq","category_name":"Multiple Choice"},{"id" : 2,"category":"association","category_name":"Matching"},
  {"id" :3,"category":"orderlist","category_name":"Sorting"}, {"id": 4,"category":"clozetext","category_name":"Fill in the blanks"}]

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
        <Col xs="9">
        <Nav >
        {quest_types}
        </Nav>
        </Col>
        <Col xs="3">
        <MenuCatButtons />
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
        <ExportQtBtn />
        <AddBankBtn  />
        </div>
      );
    }
  }

  class ExportQtBtn extends Component {
    render(){
      return(
        <button type="button" className="btn btn-outline-secondary mr-2 shadow">Export To QTI</button>
      );
    }
  }

  class AddBankBtn extends Component {
    render(){
      return(
        <button type="button" className="btn btn-outline-secondary ml-2 shadow">Add To Bank</button>
      );
    }
  }

  export default QuestionCatBar
