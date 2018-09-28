import React, { Component } from 'react';
import { FETCH_TITLE_SUCCESS } from "../../../Actions/HeaderActions"
import {API} from "../../../utils/api_list"
import {Link} from 'react-router-dom'
import Spinner from '../../../utils/Spinner';
import {Button, Row, Col} from 'reactstrap'


class TitleBar extends Component{
  constructor(props){
    super(props)
    this.bookList = this.bookList.bind(this)
    this.logOut = this.logOut.bind(this)
  }
  componentDidMount(){
    if(this.props.book_id){
      let api = API.BOOK_NAME + this.props.book_id;
      this.props.headerFetch(api,FETCH_TITLE_SUCCESS)
    }
  }
  logOut(){

    this.props.userLogOut()
      this.props.setCurrentBookId()
  }
  bookList(){
  this.props.setCurrentBookId()
  }
  render(){
    if (this.props.data.error) {
      return <p>{this.props.data.error.message}</p>;
    }

    if (this.props.data.loading) {
      return (<div className="spin"><Col sm="12" md={{ size: 8, offset: 2 }}> <Spinner /> </Col> </div>);
    }
    return(
      <Row>
       <Col xs="9">
      <h3 className="font-weight-bold ml-5 mt-2">{this.props.data.title}</h3>
       </Col>
       <Col xs = "3">
       <Button color="primary" className ={"mt-3 mb-2"} size="sm" onClick = {this.bookList} >Book List</Button>
         <Button color="danger"  className ={"mt-3 mb-2 ml-4 mr-3"} size="sm" onClick = {this.logOut}>Log Out</Button>{' '}
       </Col>
      </Row>
    );
  }
}


export default TitleBar
