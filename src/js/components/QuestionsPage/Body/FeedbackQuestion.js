import React, { Component } from 'react';
import {Button,Modal, ModalHeader, ModalBody, ModalFooter,Row,Col,Collapse, CardBody, Card} from 'reactstrap';
import {API,myURL} from "../../../utils/api_list";
import {QuestionCode} from "../../../utils/Constants";
import {initOptions,callbacks} from "../../../utils/learnosity_configuration";
import {notify} from 'react-notify-toast';

var app;
class FeedbackQuestions extends Component{
  constructor(props){
    super(props)
    this.state = {
     modal: false,
     questions : [],
     reasonCollapse : false
   };
   this.toggle = this.toggle.bind(this);
   this.removeQuestion = this.removeQuestion.bind(this)
  }
  removeQuestion(e,index){
    e.preventDefault()
    let question_id = this.state.questions[index].response_id
this.props.deleteFeedback({combine_problem_id : question_id})
.then(result =>{
  if(result.status == "success"){
    let newQuestions = [...this.state.questions]
    newQuestions.splice(index,1)
    this.setState(prevState=>({
      questions : newQuestions
    }),()=>{

      this.props.rollBackQuestionDislike(question_id)
    })
  }
  else{
      let myColor = { background: '#228B22', text: "#FFFFFF" };
      notify.show("Please Try Again!", "custom", 5000, myColor);

  }

})
  }

  initialisation(){
    initOptions.questions = this.state.questions
      LearnosityApp.init(initOptions,callbacks);
  }
  componentDidUpdate(prevProps, prevState){

    if(prevState.questions !== this.state.questions){
    }
  }


  toggle() {
   this.setState(prevState =>({
     modal: !prevState.modal
   }),()=>{
     if(this.state.modal){
       let details = {
         book_id : this.props.book_id,
         current_category : QuestionCode.EditingMode + QuestionCode.FeedbackQuestions,
         page_no : 0
       }

       this.props.feedbackQuestionFetch(myURL(details),details.current_category,true)
         }
       });
     }

     componentWillReceiveProps(nextProps){
       if(this.props.feedbackState.questions !== nextProps.feedbackState.questions){

         this.setState(prevState=>({
           questions : nextProps.feedbackState.questions
         }),()=>{
           this.initialisation()

         })
       }
     }


  render(){
    let questions = this.state.questions.map((question,index)=>{
     const className = "learnosity-response question-" + question.response_id;
     return(<Question
                className = {className}
                key = {question.response_id}
                index = {index}
                removeQuestion = {this.removeQuestion}
                question = {question}/>)
    })
    return(
      <div>
      <Button color="link" className = "inline float-right" onClick = {this.toggle}>
      View Disliked Questions
      </Button>
      <Modal isOpen={this.state.modal} toggle={this.toggle} size  = {"lg"} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Disliked Questions</ModalHeader>
          <ModalBody>
          {questions}
          </ModalBody>
        </Modal>
        </div>
    );
  }
}

class Question extends Component{
  constructor(props){
    super(props)
    this.state = {
     commentscollapse : false,
     reasonCollapse : false
   };

   this.reasonToggle = this.reasonToggle.bind(this);
  }



  reasonToggle(){
    this.setState({ reasonCollapse: !this.state.reasonCollapse });

  }
  render(){
    const style = {textAlign:"center", background:"#f00", width:30, height:30, padding:5, position:"absolute", top:0, left:0 };
    return(
      <div className=" m-3  shadow p-2" style = {{position : "relative"}}>
      <a style = {style} className = "mt-2" href = "#" onClick = {e=>this.props.removeQuestion(e,this.props.index)}>
      <i  className="fa fa-times"
      style =  {{color : "#fff",textAlign : "center"}}></i></a>
      <div style= {{paddingTop:40}}><span className = {this.props.className} /></div>
      <p><b>Your Comment: </b> {this.props.question.comment}</p>
      <Row>
      <Col>
        <Button color="primary" size="sm" onClick={this.reasonToggle} style={{ marginBottom: '1rem' }}>Reasons</Button>
         <Collapse isOpen={this.state.reasonCollapse}>
          <Card>
            <CardBody>
            <ul>
            {this.props.question.reasons.map((reason,index)=>{
              return <li key = {index}>{reason}</li>
            })}
            </ul>
            </CardBody>
          </Card>
        </Collapse>
      </Col >
      </Row>
      </div>
    )
  }
}

export default FeedbackQuestions;
