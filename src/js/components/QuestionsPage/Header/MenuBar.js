import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, ListGroup, ListGroupItem,
Nav,NavItem,NavLink, Row, Col,Button, Label,Form,Input} from 'reactstrap';
import FilterDropDown from './FilterDropDown'
import { FETCH_QUESTION_SUCCESS} from "../../../Actions/QuestionBoxActions"
import {API} from "../../../utils/api_list"



var dropdown_list = [{"name" : "All Chapters","options":["All Chapters"]},
{"name" : "All Question Types","options":["All Question Types"]}]

class MenuBar  extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
  }
render(){
  const dropdown = [];
  if(this.props.book_id){
    dropdown_list.map((dropdownData,index)=>{
      dropdown.push(
        <FilterDropDown
        book_id = {this.props.book_id}
         key = {dropdownData.name}
         index = {index}
         headerFetch = {this.props.headerFetch}
         questionfetch = {this.props.questionfetch}
         data ={this.props.data}
         questions_meta = {this.props.questions_meta}
         newChapter = {this.props.newChapter}
         newType = {this.props.newType}
        />
      );
    });
  }

  return(
    <Nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </Button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ListGroup className="navbar-nav mr-auto">
         {dropdown}
        </ListGroup>
       <SearchBar
        questionfetch = {this.props.questionfetch}
          book_id = {this.props.book_id} />
      </div>
    </Nav>
  );
}
}




class SearchBar extends Component{
  constructor(props) {
  super(props);
  this.search = React.createRef();
  this.handleSearch = this.handleSearch.bind(this);}

  handleSearch(e) {

	e.preventDefault();
  if(this.props.book_id && this.search.current.value != ""){
    let api = API.SEARCH+this.props.book_id+"/" +this.search.current.value;
  this.props.questionfetch(api,FETCH_QUESTION_SUCCESS,1,0,true)
  }



}
  render(){
    return(
      <Form className="form-inline my-2 my-lg-0">
        <Input innerRef={this.search} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
        <Button type ="submit" color="secondary"  onClick={this.handleSearch}>Search</Button>
      </Form>
    );
  }
}


export default MenuBar;
