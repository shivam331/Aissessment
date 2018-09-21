import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, ListGroup, ListGroupItem,
Nav,NavItem,NavLink, Row, Col,Button } from 'reactstrap';
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
  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
         {dropdown}
        </ul>
       <SearchBar
        questionfetch = {this.props.questionfetch}
          book_id = {this.props.book_id} />
      </div>
    </nav>

  );
}
}




class SearchBar extends Component{
  constructor(props) {
  super(props);
  this.search = React.createRef();
  this.handleSearch = this.handleSearch.bind(this);}

  handleSearch(e) {
	var criteria;
	e.preventDefault();
  let api = API.SEARCH+this.props.book_id+"/" +this.search.current.value;
this.props.questionfetch(api,FETCH_QUESTION_SUCCESS,1,0,true)


}
  render(){
    return(
      <form className="form-inline my-2 my-lg-0">
        <input ref={this.search} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
        <Button color="secondary"  onClick={this.handleSearch}>Search</Button>
      </form>
    );
  }
}


export default MenuBar;
