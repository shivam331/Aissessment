import React, { Component } from 'react';
import QuestTypes from './QuestionTypes';
import BookViewer from './BookViewer'
import {Nav, Row, Col,Button,Progress } from 'reactstrap';
import {QuestionTypes} from '../../../utils/Constants'

  // var question_types = [{"id" : 1,"category":"mcq","category_name":"Multiple Choice"},{"id" : 2,"category":"association","category_name":"Matching"},
  // {"id" :3,"category":"orderlist","category_name":"Sorting"}, {"id": 4,"category":"clozetext","category_name":"Fill in the blanks"}]

  var question_types = [{"id" : 1,"category":"mcq","category_name":"Multiple Choice"}]

  export class QuestionCatBar extends Component{
    constructor(props){
      super(props)
    }
    componentDidMount(){
      this.props.keyPhrasesCount(this.props.book_id)
    }


    render(){
      var rankedPercentage =((this.props.keyPhrasesState.keyPhrasesRanked / this.props.keyPhrasesState.total) *100).toFixed(2);
      const quest_types = [];
      question_types.forEach((type,index)=>{
        quest_types.push(
          <QuestTypes name = {type.category_name}
          key = {type.category}
          category_id = {type.id}
          newCategory = {this.props.newCategory}
          questions_meta = {this.props.questions_meta}
          />
        );
      })
      return(
        <div className = " mx-3 my-3">
        <Row>
        <Col xs="3">
        <Nav >
        {quest_types}
        </Nav>
        </Col>
        <Col xs = "6">
        <div className="text-center">KeyPhrases Ranked: {this.props.keyPhrasesState.keyPhrasesRanked} of {' '}
         {this.props.keyPhrasesState.total}</div>
        <Progress striped  color = "success" value={this.props.keyPhrasesState.keyPhrasesRanked}
         max={this.props.keyPhrasesState.total}><font color="black">{rankedPercentage}%</font></Progress>
        </Col>
        <Col xs="3">
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

        <BookViewer
       pagesContext = {this.props.pagesContext}
       book_id = {this.props.book_id}
       data ={this.props.data}
       />

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
