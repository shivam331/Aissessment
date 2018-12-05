import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu,ListGroup, DropdownItem,Col,Label,NavItem} from 'reactstrap';
import { FETCH_CHAPTER_SUCCESS,FETCH_QUESTION_TYPE_SUCCESS } from "../../../Actions/HeaderActions";
import { FETCH_QUESTION_SUCCESS} from "../../../Actions/QuestionBoxActions"
import {API} from "../../../utils/api_list"
import Spinner from '../../../utils/Spinner'


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
    // look for better approach rather than if else
    // if(this.props.headerState.currentChapter != newProps.headerState.currentChapter && this.props.index == 0 ){
    //
    //   if(newProps.headerState.editingMode){
    //     let api = API.QUESTIONS+this.props.book_id+"/" + newProps.headerState.currentChapter+ "/" + newProps.headerState.currentQuestiontype
    //     + "/0"+  "?sortBy="+newProps.questionsState.sorting;
    //     this.props.questionfetch(api,FETCH_QUESTION_SUCCESS,1,0,true)
    //   }
    //   else{
    //     let  api = API.SAVED_QUESTION_LIST+this.props.book_id+"/" + newProps.headerState.currentChapter+ "/" + newProps.headerState.currentQuestiontype
    //     + "/0" +  "?sortBy="+newProps.questionsState.sorting;
    //     this.props.questionfetch(api,FETCH_QUESTION_SUCCESS,6,0,true)
    //   }
    //
    //
    // }
    // else if(this.props.headerState.currentQuestiontype != newProps.headerState.currentQuestiontype && this.props.index == 1){
    //   if(newProps.headerState.editingMode){
    //     let api = API.QUESTIONS+this.props.book_id+"/" + newProps.headerState.currentChapter+ "/" + newProps.headerState.currentQuestiontype
    //     + "/0" + "?sortBy="+newProps.questionsState.sorting;
    //     this.props.questionfetch(api,FETCH_QUESTION_SUCCESS,1,0,true)
    //   }
    //   else{
    //     let api = API.SAVED_QUESTION_LIST+this.props.book_id+"/" + newProps.headerState.currentChapter+ "/" + newProps.headerState.currentQuestiontype
    //     + "/0" +  "?sortBy="+newProps.questionsState.sorting;
    //     this.props.questionfetch(api,FETCH_QUESTION_SUCCESS,6,0,true)
    //   }
    //
    // }
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
      if( this.props.headerState.currentChapter != event.target.innerText)
      {  this.props.newChapter(event.target.innerText);}

    }
    else if(this.props.index == 1){
      if(this.props.headerState.currentQuestiontype != event.target.innerText)
      {this.props.newType(event.target.innerText)}
    }
    //event.persist();
  }
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  render(){
    const list = ( this.props.index == 0) ? this.props.headerState.chapters : this.props.headerState.questionstype
    const options = [];
    list.map((option)=>{
      options.push(
        <DropDownRows option = {option} key = {option}
        handleChange = {this.handleChange}/>
      )
    })
    if (this.props.headerState.error) {
      return <Label>{this.props.headerState.error.message}</Label>;
    }

    if (this.props.headerState.loading) {
      return (<div className="spin"><Col sm="12" md={{ size: 8, offset: 2 }}> <Spinner /> </Col> </div>);
    }
    return(
      <NavItem className="m-2">
      <Dropdown  isOpen={this.state.dropdownOpen} toggle={this.toggle}>
      <DropdownToggle caret disabled  = {this.props.disabled}>
      {( this.props.index == 0) ? this.props.headerState.currentChapter : this.props.headerState.currentQuestiontype}
      </DropdownToggle>
      <DropdownMenu
      modifiers={{
        setMaxHeight: {
          enabled: true,
          order: 890,
          fn: (data) => {
            return {
              ...data,
              styles: {
                ...data.styles,
                overflow: 'auto',
                maxHeight: 340,
              },
            };
          },
        },
      }}
      >
      {options}
      </DropdownMenu>
      </Dropdown>
      </NavItem>);
    }
  }

  function DropDownRows(props) {
    return   <DropdownItem onClick={props.handleChange} >{props.option}</DropdownItem>
  }



  export default FilterDropDown;
