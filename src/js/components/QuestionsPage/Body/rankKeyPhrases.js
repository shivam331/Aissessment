import React, { Component } from 'react';
import {Button, Row, Col,Label,Container,Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import {API} from "../../../utils/api_list";
import {initOptions,callbacks} from "../../../utils/learnosity_configuration";
import {FETCH_KEYPHRASES_SUCCESS,LOAD_MORE_KEYPHRASES } from "../../../Actions/KeyPhrasesAction"
import OverlayLoader from 'react-loading-indicator-overlay/lib/OverlayLoader';
import {notify} from 'react-notify-toast';

var questionApp;
class RankKeyPhrases extends Component {
  constructor(props) {
    super(props)
    this.initialisation = this.initialisation.bind(this)
    this.loadMore = this.loadMore.bind(this)
    this.save =this.save.bind(this)
    this.state = {
      totalKeyphrases : 0,
       KeyPhraesList : []
    }
  }
  componentDidMount(){
    if(this.props.questions_meta.editingMode){
    let api = API.KEYPHRASES_LIST + this.props.book_id + "/"+ this.props.data.page_no;
    this.props.fetchKeyPhrases(api,FETCH_KEYPHRASES_SUCCESS,5,this.props.data.page_no,true);
  }
  else{
  let  api = API.RATED_KEYPHRASES + this.props.book_id + "/"+ this.props.data.page_no;
     this.props.fetchKeyPhrases(api,FETCH_KEYPHRASES_SUCCESS,5,this.props.data.page_no,true);
  }
  }
  componentDidUpdate(prevProps, prevState) {
  if(this.props.data.keyPhrases !== prevProps.data.keyPhrases){
    this.setState(prevState=>({
      totalKeyphrases : prevState.totalKeyphrases  = this.props.data.total,
      KeyPhraesList:prevState.KeyPhraesList = this.props.data.keyPhrases
    }),() => {
      this.initialisation()
    })
  }
  }
  initialisation(){
    initOptions.questions = this.state.KeyPhraesList
    if(initOptions.questions.length != 0){
    questionApp =  LearnosityApp.init(initOptions,callbacks);
    }

  }
  loadMore(e,page_no) {
    e.preventDefault()


if(page_no !== this.props.data.page_no)
{
      let api = API.KEYPHRASES_LIST + this.props.book_id + "/"+ page_no;

      this.props.fetchKeyPhrases(api,LOAD_MORE_KEYPHRASES,5,page_no,true)
    }
  }
  save(rank,keyPhrase){
    console.log(rank + " " + keyPhrase);
    const data = {
      book_id:this.props.book_id,
      phrase:keyPhrase,
      rating : rank
    }
     this.props.saveKeyphraseRating(data)
     .then(status =>{
    if(status == "success"){
      let myColor = { background: '#228B22', text: "#FFFFFF" };
notify.show("KeyPhrase Rating Saved successfully!", "custom", 5000, myColor);
      if(this.props.questions_meta.editingMode){
    this.setState(prevState => ({
    KeyPhraesList : prevState.KeyPhraesList.filter((e => e.keyPhrase !== keyPhrase)),
    totalKeyphrases : prevState.totalKeyphrases -1
  }))}
}
     })


}
componentWillReceiveProps(nextProps){

  if(this.props.data.saveStatus != nextProps.data.saveStatus && nextProps.data.saveStatus == "success"){

    //   this.setState(prevState => ({
    //   KeyPhraesList : prevState.KeyPhraesList.filter((e => e !== keyPhrase)),
    //   totalKeyphrases : prevState.totalKeyphrases -1
    // }))
  }
}

  render(){
let pages =  Math.ceil(this.props.data.total/50 )
    const KeyPhraes = []
    this.state.KeyPhraesList.map((question,index)=>{
     if(question.response_id){
    const className = "learnosity-response question-" + question.response_id;
    KeyPhraes.push(
      <RankBox className = {className} key  ={className} response_id = {question.response_id}
      keyPhrase = {question.keyPhrase}
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
         <p className="text-primary mt-2">Total KeyPhrases: {this.state.totalKeyphrases}</p>
       </Col>
      </Row>
      <Row>
        <Col  sm="12">
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
