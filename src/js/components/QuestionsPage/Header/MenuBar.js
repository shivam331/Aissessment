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
    this.rankKeyPhrases = this.rankKeyPhrases.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state={
      isOpen:false
    }
  }
  componentDidMount(){

  }
  componentDidUpdate(){

    // {!this.state.isOpen && console.log(document.getElementById('checked-editing').innerText)}
    // {this.state.isOpen && console.log(document.getElementById('unchecked-saved').innerText)}
  }

rankKeyPhrases(){
console.log("#####");
}

toggle() {
  this.setState({
    isOpen: !this.state.isOpen
  });
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
    <Navbar color="dark" light expand="md">
      <NavbarToggler onClick={this.toggle} />
      <Collapse isOpen={this.state.isOpen} navbar>
      <Nav navbar>
           {dropdown}
     <NavItem className = {"m-2"}>
      <Button color="secondary" onClick = {this.rankKeyPhrases}>Rank Key Phrases</Button>
     </NavItem >
     <NavItem className = {"m-2"}>
       <ToggleBar />
     </NavItem>
       </Nav>
       <div className="ml-auto" >
       <SearchBar
        questionfetch = {this.props.questionfetch}
        book_id = {this.props.book_id}/>
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

class ToggleBar extends Component{
  constructor(props) {
  super(props);
  this.toggle = this.toggle.bind(this);
  this.state={
    isOpen:false
  }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render(){
    return(
      <label htmlFor="icon-switch">
        <Switch
          checked={!this.state.isOpen}
          onChange={this.toggle}
          height={40}
          width={90}
          offColor="#6c757d"
          onColor="#6c757d"
          uncheckedIcon={
            <div id="unchecked-saved"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 12,
                color: "White",
                padding: 2
              }}
              >
              Saved
            </div>
          }
          checkedIcon={
            <div id="checked-editing"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 12,
                color: "White",
                padding: 2
              }}
              >
              Editing
            </div>
          }
          className="react-switch"
          id="icon-switch"
          />
      </label>
    )
  }
}


class SearchBar extends Component{
  constructor(props) {
  super(props);
  this.search = React.createRef();
  this.handleSearch = this.handleSearch.bind(this);
}

  handleSearch(e) {

	e.preventDefault();
  if(this.props.book_id && this.search.current.value != ""){
    let api = API.SEARCH+this.props.book_id+"/" +this.search.current.value;
  this.props.questionfetch(api,FETCH_QUESTION_SUCCESS,1,0,true)
  }

}
  render(){
    return(
      <div>
       <Form className="form-inline ">
          <Input innerRef={this.search} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <Button type ="submit" color="secondary"  onClick={this.handleSearch}>Search</Button>
        </Form>
      </div>

    );
  }
}


export {MenuBar};
