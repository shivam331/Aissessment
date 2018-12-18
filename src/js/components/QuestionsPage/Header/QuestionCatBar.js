import React, { Component } from 'react';
import QuestTypes from './QuestionTypes';
import BookViewer from './BookViewer'
import {Nav, Row, Col,Button,Progress } from 'reactstrap';
import {QuestionTypes} from '../../../utils/Constants'

  // var question_types = [{"id" : 1,"category":"mcq","category_name":"Multiple Choice"},{"id" : 2,"category":"association","category_name":"Matching"},
  // {"id" :3,"category":"orderlist","category_name":"Sorting"}, {"id": 4,"category":"clozetext","category_name":"Fill in the blanks"}]

  // var question_types = [{"id" : 1,"category":"mcq","category_name":"Multiple Choice"}]

  export class QuestionCatBar extends Component{
    constructor(props){
      super(props)
    }
    componentDidMount(){
      this.props.dataCount(this.props.book_id,this.props.headerState.currentChapter,this.props.headerState.currentQuestiontype)
    }

  componentWillReceiveProps(nextProps){
    if(this.props.headerState.currentChapter != nextProps.headerState.currentChapter || this.props.headerState.currentQuestiontype != nextProps.headerState.currentQuestiontype
    || (this.props.saveQuestionState.loading != nextProps.saveQuestionState.loading && nextProps.saveQuestionState.loading == false)
    || (this.props.keyPhrasesState.saveStatus  != nextProps.keyPhrasesState.saveStatus && nextProps.keyPhrasesState.saveStatus == "success")){
      this.props.dataCount(this.props.book_id,nextProps.headerState.currentChapter,nextProps.headerState.currentQuestiontype)
    }
  }

    render(){
      var savedPercentage = ((this.props.headerState.savedQuestion / this.props.headerState.totalQuestion) *100).toFixed(2);
      // var rankedPercentage =((this.props.headerState.rankedKeyphrases / this.props.headerState.totalKeyphrases) *100).toFixed(2);

      if(Number.isNaN(Number(savedPercentage))){
        savedPercentage = "0.00"
      }
      const quest_types = [];
      this.props.showQuestions && QuestionTypes.forEach((type,index)=>{
        quest_types.push(
          <QuestTypes name = {type.category_name}
          key = {type.category}
          category_id = {type.id}
          newCategory = {this.props.newCategory}
          headerState = {this.props.headerState}
          questionsState = {this.props.questionsState}
          questionfetch = {this.props.questionfetch}
          book_id = {this.props.book_id}
          />
        );
      })
      return(
        <div className = " mx-3 my-3">
        <Row>
        <Col xs="3">
        </Col>

        <Col xs = "6">
        <div className="text-center">Questions Saved: {this.props.headerState.savedQuestion} of {' '}
         {this.props.headerState.totalQuestion}</div>
        <Progress striped  color = "success" value={this.props.headerState.savedQuestion}
         max={this.props.headerState.totalQuestion}><font color="black">{savedPercentage}%</font></Progress>
        </Col>
        <Col xs="3">
         <MenuCatButtons
         pagesContext = {this.props.pagesContext}
         book_id = {this.props.book_id}
         headerState ={this.props.headerState} />
        </Col>
        </Row>
        </div>
      );
    }
  }
  // {quest_types}

  // <Col xs = "3">
  // <div className="text-center">KeyPhrases Ranked: {this.props.headerState.rankedKeyphrases} of {' '}
  //  {this.props.headerState.totalKeyphrases}</div>
  // <Progress striped  color = "success" value={this.props.headerState.rankedKeyphrases}
  //  max={this.props.headerState.totalKeyphrases}><font color="black">{rankedPercentage}%</font></Progress>
  // </Col>

  class MenuCatButtons extends Component{
    render(){
      return(

        <BookViewer
       pagesContext = {this.props.pagesContext}
       book_id = {this.props.book_id}
       headerState ={this.props.headerState}
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
