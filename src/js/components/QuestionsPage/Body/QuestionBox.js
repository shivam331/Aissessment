import React, { Component } from 'react';
import {initOptions,callbacks,initOption} from "../../../utils/learnosity_configuration";
import DownVoteBtn from "./DownVoteButton";
import {API} from "../../../utils/api_list";
import { Input,Button,Row,Col,Label,Pagination, PaginationItem, PaginationLink  } from 'reactstrap';
import {FETCH_QUESTION_SUCCESS,LOAD_MORE_QUESTION } from "../../../Actions/QuestionBoxActions"
import EditDistractor from './editDistractor'
import EditQuestion from './editQuestion'
import OverlayLoader from 'react-loading-indicator-overlay/lib/OverlayLoader';
import styles from '../../../../css/question_css.css';

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

  loadMore(e,page_no) {
    e.preventDefault()

    if(page_no !== this.props.data.page_no)
    {    if(this.props.data.current_category == 1)
      {
        // let new_page_no = this.props.data.page_no + 1
        let api = API.QUESTIONS+this.props.book_id+"/" + this.props.data.chapter + "/" + this.props.data.questiontypes + "/"
        + page_no;
        this.props.questionfetch(api,LOAD_MORE_QUESTION,this.props.data.current_category,page_no,true);
      }}
    }

    componentDidMount() {
      let api = API.QUESTIONS+this.props.book_id+"/" + this.props.data.chapter + "/" + this.props.data.questiontypes + "/"
      + this.props.data.page_no;
      this.props.questionfetch(api,FETCH_QUESTION_SUCCESS,this.props.data.current_category,this.props.data.page_no,true);

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

    // thumbsDown=(event)=> {
    //   this.setState({editDistractorVisible:true})
    // }

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
      let pages =  Math.ceil(this.props.data.total/50 )
      const questions = [];
      if(this.props.data.questions.length != 0)
      {  this.state.active_question_set.map((question,index)=>{
        const className = "learnosity-response question-" + question.response_id;
        // loking for proper condition for this bug fixing
        if(this.props.data.questions[index])
        {questions.push(
          <Question className = {className}
            key = {question.response_id}
            index ={index}
            virsionChangeClicked ={this.virsionChangeClicked}
            version_length ={this.props.data.questions[index].question_array.length}
            distractors = {question.options}
            blacklistDistractors = {this.props.blacklistDistractors}
            distractorState = {this.props.distractorState}
            updateDistractors = {this.props.updateDistractors}
            data ={this.props.data}
            book_id = {this.props.book_id}
            questionfetch = {this.props.questionfetch}
            question_id = {question.response_id}
            submitfeedback = {this.props.submitfeedback}
            feedbackState = {this.props.feedbackState}
            />
        );}
      })}


      if (this.props.data.error) {
        return <Label>{this.props.data.error.message}</Label>;
        }


        if(questions.length == 0 && !this.props.data.loading){
          return <h3>Sorry, No Question Found...</h3>
        }

        // <Col sm="12" md={{ size: 8, offset: 5}}>
        // <Button color="danger"  onClick={this.loadMore} className = "form-row text-center">Load More...</Button>
        // </Col>
        return(
          <div className="container">
            <OverlayLoader
              color={'red'} // default is white
              loader="ScaleLoader" // check below for more loaders
              text="Loading... Please wait!"
              active={this.props.data.loading}
              backgroundColor={'black'} // default is black
              opacity=".4" // default is .9
              >
            </OverlayLoader>
            <Row>
              <Col  sm="12" md={{ size: 8, offset: 4 }}>
                <Pagination aria-label="Page navigation">
                  <PaginationItem disabled={this.props.data.page_no <= 0}>
                    <PaginationLink
                      onClick={e => this.loadMore(e, this.props.data.page_no - 1)}
                      previous
                      href="#"
                      />
                  </PaginationItem>

                  {[...Array(pages > 5 ? 5 : pages)].map((page, i) =>

                    <PaginationItem active={i === this.props.data.page_no} key={i}>
                      <PaginationLink onClick={e => this.loadMore(e, i)} href="#">
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  <PaginationItem disabled={this.props.data.page_no >= pages - 1}>
                    <PaginationLink
                      onClick={e => this.loadMore(e, this.props.data.page_no + 1)}
                      next
                      href="#"
                      />

                  </PaginationItem>
                </Pagination>
              </Col>
            </Row>

            <Row>
              <Col>
                {questions}
              </Col>
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
            <span className = {this.props.className}></span>
              </div>
              <div className="row col-md-12">
                <div className = "col-2-md">
                  <Button color="link" disabled={this.props.version_length > 1 ? false :true} onClick ={this.versionChange}>View Other Versions</Button>
                </div>
                <EditDistractor distractors = {this.props.distractors} blacklistDistractors = {this.props.blacklistDistractors}
                  distractorState = {this.props.distractorState} updateDistractors = {this.props.updateDistractors}
                  data ={this.props.data}
                  book_id = {this.props.book_id}
                  questionfetch = {this.props.questionfetch}
                  />
                <EditQuestion className={this.props.className}/>
                <DownVoteBtn question_id = {this.props.question_id}
                  submitfeedback = {this.props.submitfeedback}
                  feedbackState = {this.props.feedbackState}/>

            </div>
          </div>
        );
      }
    }

    export default QuestionBox;
