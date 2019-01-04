import React, { Component } from 'react';
import {Table,Col,Progress} from 'reactstrap';
import {
  Redirect
} from 'react-router-dom'
import OverlayLoader from 'react-loading-indicator-overlay/lib/OverlayLoader';
import history from '../../utils/history'

class BookListTable extends Component{

constructor(props){
  super(props)
}
  componentDidMount() {
    this.props.fetchBookList()
  }

  render(){
    const rows = [];
console.log("booklist table");
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
    <OverlayLoader
                color={'red'} // default is white
                loader="ScaleLoader" // check below for more loaders
                text=""
                active={this.props.booklist.loading ? true : false}
                backgroundColor={'black'} // default is black
                opacity=".4" // default is .9
                >
                <Table hover bordered  className ="px-3" >
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
   </OverlayLoader>
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
    return (
      <tr>
      <td>{this.props.bookDetails.bookname}</td>
      <td></td>
      <td><center><a href ='' onClick={this.handleClick} id = "2">Rank Key Phrases</a>
      <p>  {this.props.bookDetails.rankedKeyPhrases}  out of {this.props.bookDetails.totalKeyphrases}</p></center></td>
      <td><center><a href ='' onClick={this.handleClick} id = "1">View Problems</a></center></td>



      </tr>
    );

  }
}

export default BookListTable;
