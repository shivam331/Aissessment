import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu,ListGroup, DropdownItem,Col,Label,NavItem} from 'reactstrap';
import { FETCH_CHAPTER_SUCCESS,FETCH_QUESTION_TYPE_SUCCESS } from "../../../Actions/HeaderActions";
import { FETCH_QUESTION_SUCCESS} from "../../../Actions/QuestionBoxActions"
import {API} from "../../../utils/api_list"
import Spinner from '../../../utils/Spinner'
import {QuestionTypes} from '../../../utils/Constants'


class FilterDropDown extends Component{
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.dropDownItems = this.dropDownItems.bind(this)
    this.state = {
      dropdownOpen: false
    };
  }

  componentWillReceiveProps(newProps){
  }

  componentDidMount(){
    var api = ""
    if(this.props.id == 1){
      api = API.CHAPTER_LIST + this.props.book_id;
      this.props.headerFetch(api,FETCH_CHAPTER_SUCCESS)
    }
    else if(this.props.id == 2){
      api = API.QUESTION_TYPES_LIST + this.props.book_id;
      this.props.headerFetch(api,FETCH_QUESTION_TYPE_SUCCESS)
    }
  }
  handleChange(event){
    event.preventDefault();
    if(this.props.id == 1){
      if( this.props.headerState.currentChapter != event.target.innerText)
      {  this.props.newChapter(event.target.innerText);}

    }
    else if(this.props.id == 2){
      if(this.props.headerState.currentQuestiontype != event.target.innerText)
      {this.props.newType(event.target.innerText)}
    }
    else if(this.props.id == 3){
      if(this.props.headerState.current_category != event.target.value){
        this.props.newCategory(event.target.value)
      }
    }
    //event.persist();
  }

  categoryName(catId){
    for(let cat of QuestionTypes){
      if(cat.id ==  catId){
        return cat.category_name
      }
    }

  }

  dropDownItems(dropdownId){
    switch (dropdownId) {
      case 1:
      return {data:this.props.headerState.chapters,currentValue : this.props.headerState.currentChapter}
      break;

      case 2:
      return  {data : this.props.headerState.questionstype, currentValue : this.props.headerState.currentQuestiontype}
      break

      case 3:
      return {data :this.props.headerState.questionCategories,
        currentValue : this.categoryName(this.props.headerState.current_category)}
        break

        default:
        return []

      }
    }


    toggle() {
      this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen
      }));
    }
    render(){
      const list = this.dropDownItems(this.props.id)
      const options = [];
      list.data.map((option)=>{
        if(this.props.id == 3){
          options.push(<DropDownRows option = {option.category_name} key = {option.category_name}
            handleChange = {this.handleChange}
            value = {option.id}/>)
          }
          else{
            options.push(
              <DropDownRows option = {option} key = {option}
              handleChange = {this.handleChange}
              value = {option}/>
            )}
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
            {list.currentValue}
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
            <DropdownItem header>{this.props.heading}</DropdownItem>
            <DropdownItem divider />
            {options}
            </DropdownMenu>
            </Dropdown>
            </NavItem>);
          }
        }

        function DropDownRows(props) {
          return   <DropdownItem onClick={props.handleChange} value = {props.value} >{props.option}</DropdownItem>
        }




        export default FilterDropDown;
