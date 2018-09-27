import React, { Component } from 'react';
import {initOptions,callbacks} from "../../../utils/learnosity_configuration";
import DownVoteBtn from "./DownVoteButton";
import {API} from "../../../utils/api_list";
import { FormText,Input,Button,Row,Col  } from 'reactstrap';
import { fetchQuestionData,FETCH_QUESTION_SUCCESS,LOAD_MORE_QUESTION } from "../../../Actions/QuestionBoxActions"
import EditDistractor from './editDistractor'
import OverlayLoader from 'react-loading-indicator-overlay/lib/OverlayLoader';

const response_ids =[];
class QuestionBox  extends Component{
  constructor(props){
    super(props)
    this.initialisation = this.initialisation.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.virsionChangeClicked =this.virsionChangeClicked.bind(this);
    this.state = {
      active_question_set : [],
      questions_version_set : []
    }

  }

  loadMore(e) {
    e.preventDefault()
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
    var myVar = setInterval(myTimer, 500);
    function myTimer() {
    response_ids.map(id => {
      var container = document.getElementById(id)
      if(container){
        console.log("Found");
        var options = container.querySelectorAll('.lrn_response_wrapper ul li .lrn_contentWrapper')
        clearInterval(myVar);
        for(let i=0;i<options.length;i++){
          let thumbIcon = document.createElement('i');
          thumbIcon.className = "fa fa-thumbs-down"
          thumbIcon.style = "margin-left : 10px;"
          options[i].onmouseenter = function() {
            options[i].appendChild(thumbIcon);
          };
          thumbIcon.onclick = function() {
            alert(options[i].innerText)
          }
          options[i].onmouseleave = function() {
            options[i].removeChild(thumbIcon);
          };
        }
      }else{
        console.log("not Found");
      }
    })
  }
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.props.data.questions !== prevProps.data.questions || this.props.data.page_no !== prevProps.data.page_no){
      const question_data = this.props.data.questions;
      var active_question_set = []
      var questions_version_set = []
      question_data.map((group)=>{
        active_question_set.push(group.question_array[0])
        questions_version_set.push(0)
      })
      this.setState(prevState=>({
        active_question_set : prevState.active_question_set  = active_question_set,
        questions_version_set:prevState.questions_version_set = questions_version_set
      }),() => {
        this.initialisation(false,"")
      })

    }

    if(this.state.active_question_set !== prevState.active_question_set){
    }
  }
  componentWillReceiveProps(newProps){

    if( this.props.data.current_category !== newProps.data.current_category){
      let api = API.QUESTIONS+this.props.book_id+"/" + this.props.data.chapter + "/" + this.props.data.questiontypes + "/"
      + this.props.data.page_no;
      this.props.questionfetch(api,FETCH_QUESTION_SUCCESS,newProps.data.current_category,0,true);

    }
  }

  initialisation(newVersionClicked,newVersionQuestion){
    if(newVersionClicked){
      initOptions.questions =[newVersionQuestion]
    }
    else
    {    initOptions.questions = this.state.active_question_set}
    if(initOptions.questions.length != 0){
      LearnosityApp.init(initOptions,callbacks);
    }

  }
  virsionChangeClicked(index){
    if(this.props.data.questions[index].question_array.length > 1)
    {    let current_version = this.state.questions_version_set[index] + 1;
      current_version = current_version%this.props.data.questions[index].question_array.length

      const aqs = [...this.state.active_question_set];
      const newVersionQuestion =  this.props.data.questions[index].question_array[current_version];
      aqs[index] = newVersionQuestion
      const questions_version_set = this.state.questions_version_set
      questions_version_set[index] = questions_version_set[index]+1;


      this.setState(prevState=>({
        active_question_set :prevState.active_question_set = aqs,
        questions_version_set:prevState.questions_version_set =questions_version_set
      }),() => {
        this.initialisation(true,newVersionQuestion)
      })
    }
  }
  render(){
    const questions = [];
    if(this.props.data.questions.length != 0)
  {  this.state.active_question_set.map((question,index)=>{
      const className = "learnosity-response question-" + question.response_id;
      response_ids.push(question.response_id);
      questions.push(
        <Question className = {className} key = {question.response_id} index ={index}
        virsionChangeClicked ={this.virsionChangeClicked} version_length ={this.props.data.questions[index].question_array.length}
        distractors = {question.options} blacklistDistractors = {this.props.blacklistDistractors} distractorState = {this.props.distractorState}
        updateDistractors = {this.props.updateDistractors}
        data ={this.props.data}
          book_id = {this.props.book_id}
          questionfetch = {this.props.questionfetch}
        />
      );
    })}


    if (this.props.data.error) {
      return <p>{this.props.data.error.message}</p>;
    }

    if (this.props.data.loading) {
      return (<OverlayLoader
            color={'red'} // default is white
            loader="ScaleLoader" // check below for more loaders
            text="Loading... Please wait!"
            active={true}
            backgroundColor={'black'} // default is black
            opacity=".4" // default is .9
            >
          </OverlayLoader>);
    }
    if(questions.length == 0){
      return <h3>Sorry, No Question Found...</h3>
    }
    // <Col sm="12" md={{ size: 8, offset: 5}}>
    // <Button color="danger"  onClick={this.loadMore} className = "form-row text-center">Load More...</Button>
    // </Col>
    return(
      <div className="container">
      <Row>
      <Col>
      {questions}
      </Col>
      </Row>
      <Row className = "mt-2 mb-5">

      </Row>
      </div>
    )
  }
}

class Question extends Component{
  constructor(props){
    super(props)
    this.versionChange = this.versionChange.bind(this)
  }
  versionChange(e){
    e.preventDefault()
    this.props.virsionChangeClicked(this.props.index)

  }

  render(){

    return(
  <div className="form-check mt-3  shadow ">
    <div className="p-2">
       <Input type="checkbox" />
       <span className= {this.props.className}></span>
          <div className="row col-md-12">
             <div className = "col-2-md">
                <a  href = {this.props.version_length > 1 ? "#" : null}  onClick ={this.versionChange} ><u>View Other Versions</u></a>
             </div>
               <EditDistractor distractors = {this.props.distractors} blacklistDistractors = {this.props.blacklistDistractors}
               distractorState = {this.props.distractorState} updateDistractors = {this.props.updateDistractors}
               data ={this.props.data}
                 book_id = {this.props.book_id}
                 questionfetch = {this.props.questionfetch}

               />
                  <DownVoteBtn />

      </div>
    </div>
  </div>
    );
  }
}

export default QuestionBox;
