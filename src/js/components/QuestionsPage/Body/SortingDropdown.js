import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {SortingOptions} from './../../../utils/Constants'
import { FETCH_QUESTION_SUCCESS} from "../../../Actions/QuestionBoxActions"
import {API,myURL} from "../../../utils/api_list"
import {QuestionCode} from "../../../utils/Constants"

class SortingDropdown extends Component{
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      dropdownOpen: false,
    };
  }
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  componentWillReceiveProps(nextProps){
    if(this.props.questionsState.sorting != nextProps.questionsState.sorting){

      let details = {
        book_id : this.props.book_id,
        currentChapter : nextProps.headerState.currentChapter,
        currentQuestiontype : nextProps.headerState.currentQuestiontype,
        sortBy : nextProps.questionsState.sorting,
        page_no : nextProps.questionsState.page_no
      }

      if(nextProps.headerState.editingMode){
        details.current_category = QuestionCode.EditingMode + nextProps.headerState.current_category
      }
      else{
        details.current_category = QuestionCode.SavedMode + nextProps.headerState.current_category
      }
      let url = myURL(details)
      this.props.questionfetch(url,FETCH_QUESTION_SUCCESS,details.current_category,details.page_no,true)

    }
  }

  handleChange(e){
    e.preventDefault();

    if(this.state.currentValue !== e.target.innerText){
      let newVal = e.target.innerText
      this.props.newSorting(newVal)
    }
  }


  render(){
    const rows = []
    SortingOptions.map(option =>{
      rows.push(<DropDownRows key = {option}
        handleChange = {this.handleChange}
        option = {option}  />)
      })
      return(
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} size="sm"  className = "float-right">
        <DropdownToggle caret>
        {this.props.questionsState.sorting}
        </DropdownToggle>
        <DropdownMenu>
        {rows}
        </DropdownMenu>
        </Dropdown>

      )
    }}
    function DropDownRows(props) {
      return <DropdownItem onClick={props.handleChange}>{props.option}</DropdownItem>;
    }


    export  default SortingDropdown
