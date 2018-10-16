import React, { Component } from 'react';
import {Button, Row, Col,Label,Container} from 'reactstrap'
import {API} from "../../../utils/api_list";
import {initOptions,callbacks} from "../../../utils/learnosity_configuration";
import OverlayLoader from 'react-loading-indicator-overlay/lib/OverlayLoader';


var questionApp;
class RankKeyPhrases extends Component {
  constructor(props) {
    super(props)
    this.initialisation = this.initialisation.bind(this)
    this.save =this.save.bind(this)
    this.state = {
      totalKeyphrases : 5,
       KeyPhraesList : ["keyphrases1","Keyphraes2","Keyphrases3","Keyphrases4","Keyphrases5"]
    }
  }
  componentDidMount(){
    let api = API.QUESTIONS+this.props.book_id+"/" + this.props.data.chapter + "/" + this.props.data.questiontypes + "/"
    + this.props.data.page_no;
    this.props.questionfetch(api,"FETCH_QUESTION_SUCCESS",5,this.props.data.page_no,true);
  }
  componentDidUpdate(prevProps, prevState) {
  if(this.props.data.questions != prevProps.data.questions){
this.initialisation()
  }
  }
  initialisation(){
    initOptions.questions = this.props.data.questions
    if(initOptions.questions.length != 0){
    questionApp =  LearnosityApp.init(initOptions,callbacks);
    }

  }
  save(rank,keyPhrase){
    console.log(rank + " " + keyPhrase);
  this.setState(prevState => ({
  KeyPhraesList : prevState.KeyPhraesList.filter((e => e !== keyPhrase)),
  totalKeyphrases : prevState.totalKeyphrases -1
}))
}

  render(){
    const KeyPhraes = []
    this.props.data.questions.map((question,index)=>{
     if(this.state.KeyPhraesList[index] && question.response_id){
    const className = "learnosity-response question-" + question.response_id;

    KeyPhraes.push(
      <RankBox className = {className} key  ={className} response_id = {question.response_id}
      keyPhrase = {this.state.KeyPhraesList[index]}
      save = {this.save}
      />
    )
  }
    })

    return(

   <Container >
   <OverlayLoader
         color={'red'} // default is white
         loader="ScaleLoader" // check below for more loaders
         text="Loading... Please wait!"
         active={this.props.data.loading}
         backgroundColor={'black'} // default is black
         opacity=".4" // default is .9
         >
             </OverlayLoader>
      <Row className="mt-2">
       <Col >
         <p className="text-primary mt-2">Total KeyPhraes: {this.state.totalKeyphrases}</p>
       </Col>
      </Row>
       <Row>
       <Col>
         {KeyPhraes}
       </Col>
     </Row>
   </Container>
    )
  }
}

class RankBox extends Component{
  constructor(props) {
    super(props)
    this.saveClick = this.saveClick.bind(this)
  }
  saveClick(e){
     e.preventDefault()
  if(questionApp.getResponses()[this.props.response_id]){
     this.props.save(questionApp.getResponses()[this.props.response_id].value,this.props.keyPhrase)
   }
  }
render(){
  return(
    <div className = "shadow" style={{ padding: '1.5rem' }}>

    <div className = "pb-4">
    <p><b>KeyPhraes: </b>{this.props.keyPhrase}</p>
  <p><b>Excerpt:</b>
<span className= {this.props.className}></span>
<Button color="secondary"  className=" float-right" onClick = {this.saveClick}>Save</Button>
</p>
</div>

</div>
  )
}

}
export default RankKeyPhrases
