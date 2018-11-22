import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {SortingOptions} from './../../../utils/Constants'
import { FETCH_QUESTION_SUCCESS} from "../../../Actions/QuestionBoxActions"
import {API} from "../../../utils/api_list"

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
    if(this.props.data.sorting != nextProps.data.sorting){
      if(nextProps.data.editingMode){
        let api = API.QUESTIONS+this.props.book_id+"/" + nextProps.data.chapter+ "/" + nextProps .data.questiontypes
        + "/"+ nextProps .data.page_no + "?sortBy="+nextProps.data.sorting;
        this.props.questionfetch(api,FETCH_QUESTION_SUCCESS,1,0,true)
      }
      else{
        let api = API.SAVED_QUESTION_LIST+this.props.book_id+"/" + nextProps.data.chapter+ "/" + nextProps.data.questiontypes
        + "/"+ nextProps.data.page_no;
        this.props.questionfetch(api,FETCH_QUESTION_SUCCESS,6,0,true)
      }
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
        {this.props.data.sorting}
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
