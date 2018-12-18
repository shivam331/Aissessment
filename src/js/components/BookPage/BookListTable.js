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
                <Table hover bordered  className ="px-3" dark>
                <thead>
                <tr>
              <th><center>Problems</center></th>
              <th><center>Ranking</center></th>
              <th><center>Book Name</center></th>
              <th><center>KeyPhrases Ranked</center></th>
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
      <td><a href ='' onClick={this.handleClick} id = "1">View Problems</a></td>
      <td><a href ='' onClick={this.handleClick} id = "2">Rank KeyPhrases</a></td>
      <td>{this.props.bookDetails.bookname}</td>
      <td className="text-center">
      {this.props.bookDetails.rankedKeyPhrases} Out Of {this.props.bookDetails.totalKeyphrases}
      <Progress striped  color = "success" value={this.props.bookDetails.rankedKeyPhrases}
       max={this.props.bookDetails.totalKeyphrases}></Progress>
      </td>
      </tr>
    );

  }
}

export default BookListTable;
