import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, ListGroup, ListGroupItem,
Nav,NavItem,NavLink, Row, Col,Button, Label,Form,Input} from 'reactstrap';
import FilterDropDown from './FilterDropDown'
import { FETCH_QUESTION_SUCCESS} from "../../../Actions/QuestionBoxActions"
import {API} from "../../../utils/api_list"
import Switch from "react-switch";


import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  UncontrolledDropdown} from 'reactstrap';

var dropdown_list = [{"name" : "All Chapters","options":["All Chapters"]},
{"name" : "All Question Types","options":["All Question Types"]}]

class MenuBar  extends Component {
  constructor(props){
    super(props)
      this.modeChange = this.modeChange.bind(this)
    this.state = {
   isOpen: false,
   editing :true
 };
  }
  componentWillReceiveProps(nextProps){


    if(this.props.questions_meta.editingMode != nextProps.questions_meta.editingMode){
      let api = ""
      if(nextProps.questions_meta.editingMode){
         api = API.QUESTIONS+this.props.book_id+"/" + nextProps.questions_meta.chapter+ "/" + nextProps.questions_meta.questiontypes
        + "/"+ + nextProps.questions_meta.page_no;
            this.props.questionfetch(api,FETCH_QUESTION_SUCCESS,1,0,true)
      }
      else{
      api = API.SAVED_QUESTION_LIST
          this.props.questionfetch(api,FETCH_QUESTION_SUCCESS,6,0,true)
    }
      // let api = API.SAVED_QUESTION_LIST+this.props.book_id+"/" +this.search.current.value;

    }
  }
rankKeyPhrases(){
  // this.props.setShowQuestion()
}
modeChange(){

  this.setState(prevState =>({
    editing: !prevState.editing,
  }),()=>{
    this.props.newMode(!this.props.questions_meta.editingMode)
  })
}
  toggle() {

  this.setState({
    isOpen: !this.state.isOpen
  });
}
render(){
  const borderRadiusStyle = { borderRadius: 2 }
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
  // <NavItem className = {"m-2"}>
  //  <Button color="secondary" onClick = {this.rankKeyPhrases}>{this.props.showQuestions? "Questions":"RankKeyPhrases"}</Button>
  // </NavItem >
  return(
    <Navbar color="dark" light expand="md">
      <NavbarToggler onClick={this.toggle} />
      <Collapse isOpen={this.state.isOpen} navbar>
      <Nav  navbar>
           {dropdown}

     <NavItem className = {"m-2"}>
     <Switch
          onChange={this.modeChange}
          checked={this.props.questions_meta.editingMode}
          width = {90}
          height = {35}
          aria-labelledby	= {"abc"}
          aria-label	 ={"EEEEEEEEE"}
          id="normal-switch"
        />
     </NavItem >
       </Nav>
       <div className="ml-auto" >
       <SearchBar
        questionfetch = {this.props.questionfetch}
        book_id = {this.props.book_id} />
              </div >
      </Collapse>
    </Navbar>


  )

  // return(
  //   <Nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  //     <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  //       <span className="navbar-toggler-icon"></span>
  //     </Button>
  //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
  //       <ListGroup className="navbar-nav mr-auto">
  //        {dropdown}
  //       </ListGroup>
  //      <SearchBar
  //       questionfetch = {this.props.questionfetch}
  //         book_id = {this.props.book_id} />
  //     </div>
  //   </Nav>
  // );
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
      <Form className="form-inline ">
        <Input innerRef={this.search} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
        <Button type ="submit" color="secondary"  onClick={this.handleSearch}>Search</Button>
      </Form>
    );
  }
}


export default MenuBar;
