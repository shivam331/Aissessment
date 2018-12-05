import React, { Component } from 'react';
import {initOptions,callbacks} from "../../../utils/learnosity_configuration";
import DownVoteBtn from "./DownVoteButton";
import ShowContext from './ShowContext'
import {API,myURL} from "../../../utils/api_list";
import {QuestionCode} from "../../../utils/Constants";
import { Input,Button,Row,Col,Label,Pagination, PaginationItem, PaginationLink  } from 'reactstrap';
import {FETCH_QUESTION_SUCCESS,LOAD_MORE_QUESTION } from "../../../Actions/QuestionBoxActions"
import EditDistractor from './editDistractor'
import OverlayLoader from 'react-loading-indicator-overlay/lib/OverlayLoader';
import styles from '../../../../css/question_css.css';
import SaveQuestion from './SaveQuestion'
import SortingDropdown from './SortingDropdown'



class QuestionBox  extends Component{
  constructor(props){
    super(props)
    this.initialisation = this.initialisation.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.virsionChangeClicked =this.virsionChangeClicked.bind(this);
    this.state = {
      active_question_set : [],
      questions_version_set : [],
      context : []
    }
  }
  loadMore(e,page_no) {
    e.preventDefault()
    if(page_no !== this.props.questionsState.page_no)
      {

        let details = {
          book_id : this.props.book_id,
          currentChapter : this.props.headerState.currentChapter,
          currentQuestiontype : this.props.headerState.currentQuestiontype,
          sortBy : this.props.questionsState.sorting,
          page_no : page_no
        }
        if(this.props.headerState.editingMode){
          details.current_category = QuestionCode.EditingMode + this.props.headerState.current_category
        }
        else{
          details.current_category = QuestionCode.SavedMode + this.props.headerState.current_category
        }
        let url = myURL(details)
        this.props.questionfetch(url,LOAD_MORE_QUESTION,details.current_category,details.page_no,true)
      }

    }

    componentDidMount() {
      let details = {
        book_id : this.props.book_id,
        currentChapter : this.props.headerState.currentChapter,
        currentQuestiontype : this.props.headerState.currentQuestiontype,
        sortBy : this.props.questionsState.sorting,
        page_no : this.props.questionsState.page_no
      }
      if(this.props.headerState.editingMode){
        details.current_category = QuestionCode.EditingMode + this.props.headerState.current_category
      }
      else{
        details.current_category = QuestionCode.SavedMode + this.props.headerState.current_category
      }
      let url = myURL(details)
      this.props.questionfetch(url,FETCH_QUESTION_SUCCESS,details.current_category,details.page_no,true)
    }

    componentDidUpdate(prevProps, prevState) {
      if((this.props.questionsState.questions != prevProps.questionsState.questions || this.props.questionsState.page_no !== prevProps.questionsState.page_no)
      && this.props.questionsState.questions.length !== 0){
        const question_data = this.props.questionsState.questions;
        var active_question_set = []
        var questions_version_set = []
        var newContext = []
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
        this.props.pagesContext(this.props.book_id)
        .then(result=>{
          question_data.map((group,index)=>{
            var grp = group.group_name
            // .replace(/[^a-zA-Z0-9]/g, '');
            result.data.map((context)=>{
              let content = context.content.replace(/[’'“”""]/gi, '');
              if(content.includes(grp)){
                var pos =  content.indexOf(grp)
                var text = content.slice(0,pos) + "<b>" + content.slice(pos, pos+grp.length)
                + "</b>" + content.slice(pos+grp.length)

                var final =text.replace('/n','').slice(pos-200, pos+200 + grp.length);

                newContext[index] = {
                  content:final,
                  page:context.page
                }
              }
            })

          })
          this.setState(prevState=>({
            context : prevState.context  = newContext
          }))

        })
      }

      if(this.state.active_question_set !== prevState.active_question_set){
      }
    }

    componentWillReceiveProps(newProps){
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
      if(this.props.questionsState.questions[index].question_array.length > 1)
      {    let current_version = this.state.questions_version_set[index] + 1;
        current_version = current_version%this.props.questionsState.questions[index].question_array.length

        const aqs = [...this.state.active_question_set];
        const newVersionQuestion =  this.props.questionsState.questions[index].question_array[current_version];
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

      let pages =  Math.ceil(this.props.questionsState.total/50 )
      const questions = [];
      if(this.props.questionsState.questions.length != 0)
      {  this.state.active_question_set.map((question,index)=>{
        const className = "learnosity-response question-" + question.response_id;
        // loking for proper condition for this bug fixing
        if(this.props.questionsState.questions[index])
        {questions.push(
          <Question className = {className}
          key = {question.response_id}
          index ={index}
          virsionChangeClicked ={this.virsionChangeClicked}
          v
          ersion_length ={this.props.questionsState.questions[index].question_array.length}
          distractors = {question.options}
          blacklistDistractors = {this.props.blacklistDistractors}
          distractorState = {this.props.distractorState}
          updateDistractors = {this.props.updateDistractors}
          questionsState ={this.props.questionsState}
          book_id = {this.props.book_id}
          questionfetch = {this.props.questionfetch}
          question_id = {question.response_id}
          submitfeedback = {this.props.submitfeedback}
          feedbackState = {this.props.feedbackState}
          question = {question}
          saveQuestion = {this.props.saveQuestion}
          saveQuestionState = {this.props.saveQuestionState}
          context = {this.state.context[index]}
          headerState = {this.props.headerState}
          />
        );}
      })}


      if (this.props.questionsState.error) {
        return <Label>{this.props.questionsState.error.message}</Label>;
      }

      if(questions.length == 0 && !this.props.questionsState.loading){
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
        active={this.props.questionsState.loading}
        backgroundColor={'black'} // default is black
        opacity=".4" // default is .9
        >
        </OverlayLoader>
        <Row>
        <Col  sm="9">
        <Pagination aria-label="Page navigation">
        <PaginationItem disabled={this.props.questionsState.page_no <= 0}>
        <PaginationLink
        onClick={e => this.loadMore(e, this.props.questionsState.page_no - 1)}
        previous
        href="#"
        />
        </PaginationItem>

        {[...Array(pages > 5 ? 5 : pages)].map((page, i) =>

          <PaginationItem active={i === this.props.questionsState.page_no} key={i}>
          <PaginationLink onClick={e => this.loadMore(e, i)} href="#">
          {i + 1}
          </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem disabled={this.props.questionsState.page_no >= pages - 1}>
        <PaginationLink
        onClick={e => this.loadMore(e, this.props.questionsState.page_no + 1)}
        next
        href="#"
        />

        </PaginationItem>
        </Pagination>
        </Col>
        <Col sm = "3" >
        <div className = "inline float-right">
        <span className = "mr-2 "><b>{'Sort By:'}</b>
        </span>
        <SortingDropdown
        newSorting = {this.props.newSorting}
        questionsState = {this.props.questionsState}
        questionfetch = {this.props.questionfetch}
        book_id = {this.props.book_id}
        headerState = {this.props.headerState}
        />
        </div>
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
      this.index = React.createRef();
    }
    versionChange(e){
      e.preventDefault()
      this.props.virsionChangeClicked(this.props.index)
    }
    componentDidMount(){
      const myDomNode = this.index.current
      const edited_question = sessionStorage.getItem("edited_question");

      if(this.props.className == "learnosity-response question-" + edited_question )
      {

        myDomNode.scrollIntoView()
        sessionStorage.removeItem("edited_question")

      }
    }
    render(){
      return(
        <div className="form-check mt-3  shadow " >
        <div className="p-2">
        <Input type="checkbox" />
        <span className = {this.props.className} ref = {this.index}></span>
        </div>
        <div className="row col-md-12">
        <div className = "col-2-md">
        <Button color="link" disabled={this.props.version_length > 1 ? false :true} onClick ={this.versionChange}>View Other Versions</Button>
        </div>
        <EditDistractor distractors = {this.props.distractors}
        blacklistDistractors = {this.props.blacklistDistractors}
        distractorState = {this.props.distractorState}
        updateDistractors = {this.props.updateDistractors}
        questionsState ={this.props.questionsState}
        book_id = {this.props.book_id}
        questionfetch = {this.props.questionfetch}
        question = {this.props.question}
          headerState = {this.props.headerState}
        />
        <SaveQuestion
        question = {this.props.question}
        saveQuestion = {this.props.saveQuestion}
        book_id = {this.props.book_id}
        saveQuestionState = {this.props.saveQuestionState}

        />
        <ShowContext
        index = {this.props.index}
        context = {this.props.context}/>
        <DownVoteBtn question_id = {this.props.question_id}
        submitfeedback = {this.props.submitfeedback}
        feedbackState = {this.props.feedbackState}/>

        </div>
        </div>
      );
    }
  }

  export default QuestionBox;
