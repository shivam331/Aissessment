import React, { Component } from 'react';
import {Table,Col} from 'reactstrap';
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
         <ProductRow bookname = {book.bookname} key  = {book._id} index = {index} bookid = {book._id}
         newBookId = {this.props.newBookId} booklist = {this.props.booklist}
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
                text="Loading... Please wait!"
                active={this.props.booklist.loading ? true : false}
                backgroundColor={'black'} // default is black
                opacity=".4" // default is .9
                >

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
if(this.props.bookid != this.props.booklist.currentBookId){
    this.props.newBookId(this.props.bookid)
  }
  else{
    history.go(-1)
  }


  }

  render(){
    return (
      <tr>
     <th scope="row">{this.props.index + 1}</th>
<td>{this.props.bookname}</td>
<td><a href ='' onClick={this.handleClick}>{this.props.bookid}</a></td>
      </tr>
    );

  }
}

export default BookListTable;
