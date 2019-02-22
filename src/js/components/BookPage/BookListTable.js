import React, { Component } from 'react';
import {Table,Col,Progress} from 'reactstrap';
import { Redirect} from 'react-router-dom'
import history from '../../utils/history'
class BookListTable extends Component{

constructor(props){
  super(props)
}
  componentDidMount() {
    this.props.fetchBookList()
    .then(()=>{
this.props.fetchBookActivitySummary()
    })

  }

  render(){

    const rows = [];

    this.props.booklist.Books.map((book,index)=> {
      rows.push(
         <ProductRow  key  = {book.book_id} index = {index}
         newBookId = {this.props.newBookId} booklist = {this.props.booklist}
         bookDetails = {book}
          />
      )
    });

    if (this.props.booklist.error) {
      return <p>{this.props.booklist.error.message}</p>;
    }
return(
  <div>
                <Table hover bordered  className ="px-3 table" >
                <thead>
                <tr>
              <th><center>Book Title</center></th>
              <th><center>Source</center></th>
              <th><center>Rank Key Phrases</center></th>
              <th><center>View Problems</center></th>
              </tr>
                </thead>
                <tbody>{rows}</tbody>
                </Table>
                </div>

 )
}
}

class ProductRow extends Component{
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(e){
    e.preventDefault()
    let currentStatus ;
    if(e.target.id == 1){
          currentStatus  = true
    }
    else{
currentStatus = false    }
if(this.props.bookDetails.book_id != this.props.booklist.currentBookId || this.props.booklist.showQuestions != currentStatus ){
    this.props.newBookId(this.props.bookDetails.book_id,currentStatus)
  }
  else{
     history.push('/question')

  }
  }

  render(){
    let metaData = this.props.booklist.BooksMetadata.find(e=>e._id == this.props.bookDetails.book_id)
    let rankedKeyPhrases = metaData? metaData.rankedKeyPhrases : 0
    let totalKeyphrases = metaData? metaData.totalKeyphrases : 0
    let totalQuestionCount = metaData?metaData.totalQuestionCount : 0
    let savedQuestionCount = metaData? metaData.savedQuestionCount : 0
    return (
      <tr>
      <td>{this.props.bookDetails.name}</td>
      <td></td>
      <td><center><a href ='' onClick={this.handleClick} id = "2">Rank Key Phrases</a>
      <p>  {rankedKeyPhrases}  out of {totalKeyphrases}</p></center></td>
      <td><center><a href ='' onClick={this.handleClick} id = "1">View Problems</a>
      <p>  {savedQuestionCount}  out of {totalQuestionCount}</p></center></td>



      </tr>
    );

  }
}

export default BookListTable;
