import React, { Component } from 'react';
import { FETCH_TITLE_SUCCESS } from "../../Actions/HeaderActions"
import {API} from "../../utils/api_list"
import {Link} from 'react-router-dom'
import Spinner from '../../utils/Spinner';
import {Button, Row, Col,Label} from 'reactstrap'
import history from '../../utils/history'



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
history.push('/books')

  }
  render(){
    // if (this.props.data.error) {
    //   return <Label>{this.props.data.error.message}</Label>;
    // }
    //
    // if (this.props.data.loading) {
    //   return (<div className="spin"><Col sm="12" md={{ size: 8, offset: 2 }}> <Spinner /> </Col> </div>);
    // }
    var name="Welcome " + this.props.name
    return(
       <div style={{ padding: '.5rem' }}>
      <Row>
       <Col xs="9">
      <h3 className={"font-weight-bold ml-5 mt-2"}>{this.props.book_id ? this.props.headerState.title : name}</h3>
       </Col>
       <Col xs = "3">
      <div style={{ padding: '.5rem' }}>

      <Button className ="btn btn-danger float-right" style={{ margin: '.20rem' }} onClick = {this.logOut}>Log Out</Button>
       {this.props.book_id && <Button className ="btn btn-primary float-right" style={{ margin: '.20rem' }} onClick = {this.bookList} >Book List</Button>}{' '}
      </div>
       </Col>
      </Row>
    </div>
    );
  }
}


export default TitleBar
