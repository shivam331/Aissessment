import React, { Component } from 'react';
import {Table,Col} from 'reactstrap';
import {
  Redirect
} from 'react-router-dom'

class BookListTable extends Component{

constructor(props){
  super(props)
}
  componentDidMount() {
    this.props.fetchBookList()
  }

  render(){
    const rows = [];

    this.props.booklist.Books.forEach((book,index)=> {
      rows.push(
         <ProdctRow bookname = {book.bookname} key  = {book._id} index = {index} bookid = {book._id}
         newBookId = {this.props.newBookId} question = {this.props.question}
          />
      )
    });
    return (
<Table hover bordered>
<thead>
<tr>
<th>SNO.</th>
<th><Col sm="12" md={{size:9,offset:5}}>Book Name</Col></th>
<th></th>
</tr>
</thead>
<tbody>{rows}</tbody>
</Table>

    );
  }
}


class ProdctRow extends Component{
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e){
    e.preventDefault()

    this.props.newBookId(this.props.bookid)


  }

  render(){
    return (
      <tr>
      <td>{this.props.index + 1}</td>
<td>{this.props.bookname}</td>
<td><a href ='' onClick={this.handleClick}>Show Problems</a></td>
      </tr>
    );

  }
}

export default BookListTable;
