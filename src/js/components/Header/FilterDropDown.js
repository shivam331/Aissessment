import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import { FETCH_CHAPTER_SUCCESS,FETCH_QUESTION_TYPE_SUCCESS } from "../../Actions/HeaderActions";


 var count = 0;
class FilterDropDown extends Component{
    constructor(props) {
   super(props);
   this.toggle = this.toggle.bind(this);
   this.handleChange = this.handleChange.bind(this);
   const chapter = this.props.data.chapters[0]
   const questiontype =  this.props.data.questionstype[0]
   this.state = {
     dropdownOpen: false,
     dropDownValue:( this.props.index == 0) ? chapter : questiontype,
     chapter : chapter,
     quetion_type : questiontype
   };
 }

 componentWillReceiveProps(newProps){
count++;
console.log(count);

if(this.props.questions_meta != newProps.questions_meta){

    console.log(this.props.questions_meta);
  console.log(newProps.questions_meta);

  console.log("+++++++++++++");
}
                 }

 componentDidMount(){
   var api = ""
   if(this.props.index == 0){
      api = "http://localhost:3000/api/chapter/"
     api = api + this.props.book_id;
     this.props.headerFetch(api,FETCH_CHAPTER_SUCCESS)
   }
   else if(this.props.index == 1){
    api = "http://localhost:3000/api/questiontypes/"
   api = api + this.props.book_id;
   this.props.headerFetch(api,FETCH_QUESTION_TYPE_SUCCESS)
}

 }
handleChange(event){
 event.preventDefault();

   if(this.props.index == 0){
     this.props.newChapter(event.target.innerText);
  //   let api = 'http://localhost:3000/api/filter/'+this.props.book_id+"/" + this.props.questions.chapter+ "/" + this.props.questions.questiontypes;
  //   this.props.questionfetch(api,"FETCH_QUESTION_SUCCESS",1,0)
    //       this.setState(prevState =>
    //   ({dropDownValue: prevState.dropDownValue = event.target.innerText,
    //     chapter : prevState.chapter = event.target.innerText,
    //   }),
    //   () => {
    //    let api = 'http://localhost:3000/api/filter/'+this.props.book_id+"/" + this.state.chapter+ "/" + this.state.quetion_type;
    // this.props.questionfetch(api,"FETCH_QUESTION_SUCCESS",1,0)
    //
    //  })
   }
   else if(this.props.index == 1){
     this.props.newType(event.target.innerText)
//     let api = 'http://localhost:3000/api/filter/'+this.props.book_id+"/" + this.props.questions.chapter+ "/" + this.props.questions.questiontypes;
  //   this.props.questionfetch(api,"FETCH_QUESTION_SUCCESS",1,0)
    //  this.setState(prevState =>
    //   ({dropDownValue: prevState.dropDownValue = event.target.innerText,
    //     quetion_type : prevState.quetion_type = event.target.innerText,
    //   }),
    //   () => {
    //
    //    let api = 'http://localhost:3000/api/filter/'+this.props.book_id+"/" + this.state.chapter+ "/" + this.state.quetion_type;
    // this.props.questionfetch(api,"FETCH_QUESTION_SUCCESS",1,0)
    //
    //  })
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
