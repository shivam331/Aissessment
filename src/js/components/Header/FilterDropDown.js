import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import { FETCH_CHAPTER_SUCCESS,FETCH_QUESTION_TYPE_SUCCESS } from "../../Actions/HeaderActions";
import { FETCH_QUESTION_SUCCESS} from "../../Actions/QuestionBoxActions"
import {API} from "../../utils/api_list"



class FilterDropDown extends Component{
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  componentWillReceiveProps(newProps){
    // this for better approach rather than if else
    if(this.props.questions_meta.chapter != newProps.questions_meta.chapter && this.props.index == 0 ){
      let api = API.QUESTIONS+this.props.book_id+"/" + newProps.questions_meta.chapter+ "/" + newProps.questions_meta.questiontypes
      + "/"+ + newProps.questions_meta.page_no;
      this.props.questionfetch(api,FETCH_QUESTION_SUCCESS,1,newProps.questions_meta.page_no,true)
    }
    else if(this.props.questions_meta.questiontypes != newProps.questions_meta.questiontypes && this.props.index == 1){
      let api = API.QUESTIONS+this.props.book_id+"/" + newProps.questions_meta.chapter+ "/" + newProps.questions_meta.questiontypes
      + "/"+ + newProps.questions_meta.page_no;
      this.props.questionfetch(api,FETCH_QUESTION_SUCCESS,1,newProps.questions_meta.page_no,true)
    }
  }

  componentDidMount(){
    var api = ""
    if(this.props.index == 0){
      api = API.CHAPTER_LIST + this.props.book_id;
      this.props.headerFetch(api,FETCH_CHAPTER_SUCCESS)
    }
    else if(this.props.index == 1){
      api = API.QUESTION_TYPES_LIST + this.props.book_id;
      this.props.headerFetch(api,FETCH_QUESTION_TYPE_SUCCESS)
    }
  }
  handleChange(event){
    event.preventDefault();
    if(this.props.index == 0){
      this.props.newChapter(event.target.innerText);

    }
    else if(this.props.index == 1){
      this.props.newType(event.target.innerText)
    }
    //event.persist();
  }
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  render(){
    const list = ( this.props.index == 0) ? this.props.data.chapters : this.props.data.questionstype
    const options = [];
    list.forEach((option)=>{
      options.push(
        <DropDownRows option = {option} key = {option}
        handleChange = {this.handleChange}/>
      )
    })
    if (this.props.data.error) {
      return <p>{this.props.data.message}</p>;
    }

    if (this.props.data.loading) {
      return <p>Loading Data ...</p>;
    }
    return(
      <li className="nav-item m-2">
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
      <DropdownToggle caret>
      {( this.props.index == 0) ? this.props.questions_meta.chapter : this.props.questions_meta.questiontypes}
      </DropdownToggle>
      <DropdownMenu>
      {options}
      </DropdownMenu>
      </Dropdown>
      </li>);
    }
  }


  class DropDownRows extends Component{
    render(){
      return(
        <DropdownItem onClick={this.props.handleChange}>{this.props.option}</DropdownItem>
      );
    }
  }


  export default FilterDropDown;
