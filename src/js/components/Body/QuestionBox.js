import React, { Component } from 'react';
import {initOptions,callbacks} from "../../utils/learnosity_configuration";
import DownVoteBtn from "./DownVoteButton";
import {API} from "../../utils/api_list";
import { FormText,Input,Button,Row,Col  } from 'reactstrap';
import { fetchQuestionData,FETCH_QUESTION_SUCCESS,LOAD_MORE_QUESTION } from "../../Actions/QuestionBoxActions"


class QuestionBox  extends Component{
  constructor(props){
    super(props)
    this.initialisation = this.initialisation.bind(this);
    this.loadMore = this.loadMore.bind(this);

}

  loadMore() {
    console.log(this.props);
    if(this.props.data.current_category == 1)
  {  let new_page_no = this.props.data.page_no + 1
    let api = API.QUESTIONS+this.props.book_id+"/" + this.props.data.chapter + "/" + this.props.data.questiontypes + "/"
    + new_page_no;
    this.props.questionfetch(api,LOAD_MORE_QUESTION,this.props.data.current_category,new_page_no,false);
  }
  }

  componentDidMount() {
    let api = API.QUESTIONS+this.props.book_id+"/" + this.props.data.chapter + "/" + this.props.data.questiontypes + "/"
    + this.props.data.page_no;
    this.props.questionfetch(api,FETCH_QUESTION_SUCCESS,this.props.data.current_category,this.props.data.page_no,true);

  }
  componentDidUpdate(prevProps, prevState) {
    if(this.props.data.questions !== prevProps.data.questions || this.props.data.page_no !== prevProps.data.page_no){
      this.initialisation()
    }
  }
  componentWillReceiveProps(newProps){
    if( this.props.data.current_category !== newProps.data.current_category){
      let api = API.QUESTIONS+this.props.book_id+"/" + this.props.data.chapter + "/" + this.props.data.questiontypes + "/"
      + this.props.data.page_no;
      this.props.questionfetch(api,FETCH_QUESTION_SUCCESS,newProps.data.current_category,0,true);

    }
  }

  initialisation(){
    initOptions.questions = this.props.data.questions
    if(initOptions.questions.length != 0){
      LearnosityApp.init(initOptions,callbacks);
    }

  }
  render(){
    const question_data = this.props.data.questions;
    const questions = [];
    question_data.forEach((question)=>{
      const className = "learnosity-response question-" + question.response_id;
      questions.push(
        <Question className = {className} key = {question.response_id} />
      );
    })


    if (this.props.data.error) {
      return <p>{error.message}</p>;
    }

    if (this.props.data.loading) {
      return <p>Loading Data ...</p>;
    }
    if(questions.length == 0){
      return <h3>Sorry, No Question Found...</h3>
    }

    return(
      <div className="container">
      <Row>
      <Col>
      {questions}
      </Col>
      </Row>
      <Row className = "mt-2 mb-5">
      <Col sm="12" md={{ size: 8, offset: 5}}>
      <Button color="danger"  onClick={this.loadMore} className = "form-row text-center">Load More...</Button>
      </Col>
      </Row>
      </div>
    )
  }
}

class Question extends Component{

  render(){
    return(
      <div className="form-check mt-3  shadow ">
      <div className="p-2">
      <Input type="checkbox" />
      <span className= {this.props.className}></span>
      <div className="row col-md-12">
      <div className = "col-2-md">
      <a href ="#"><u>View Other Versions</u></a>
      </div>
      <DownVoteBtn />
      </div>
      </div>
      </div>
    );
  }
}

  export default QuestionBox;
