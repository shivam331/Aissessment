import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, ListGroup, ListGroupItem,
  Nav,NavItem,NavLink, Row, Col,Button, Label,Form,Input} from 'reactstrap';
  import FilterDropDown from './FilterDropDown'
  import { FETCH_QUESTION_SUCCESS} from "../../../Actions/QuestionBoxActions"
  import {FETCH_KEYPHRASES_SUCCESS} from "../../../Actions/KeyPhrasesAction"
  import {API,myURL} from "../../../utils/api_list"
  import {MenuBarDropdowns,QuestionCode} from '../../../utils/Constants'
  import Switch from "react-switch";
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    UncontrolledDropdown} from 'reactstrap';


    class MenuBar  extends Component {
      constructor(props){
        super(props)
        this.toggle = this.toggle.bind(this);
        this.modeChange = this.modeChange.bind(this)
        this.state = {
          isOpen: false,
          editing :true
        };
      }
      componentWillReceiveProps(nextProps){
        if(this.props.showQuestions){
          if(this.props.headerState.editingMode != nextProps.headerState.editingMode ||
            this.props.headerState.currentChapter != nextProps.headerState.currentChapter ||
            this.props.headerState.currentQuestiontype != nextProps.headerState.currentQuestiontype ||
          this.props.headerState.current_category != nextProps.headerState.current_category){
              let details = {
                book_id : this.props.book_id,
                currentChapter : nextProps.headerState.currentChapter,
                currentQuestiontype : nextProps.headerState.currentQuestiontype,
                sortBy : nextProps.questionsState.sorting,
                page_no : 0
              }


              if(nextProps.headerState.editingMode){
                details.current_category = QuestionCode.EditingMode + nextProps.headerState.current_category
              }
              else{
                details.current_category = QuestionCode.SavedMode + nextProps.headerState.current_category
              }

              let api = myURL(details)
              this.props.questionfetch(api,FETCH_QUESTION_SUCCESS,details.current_category,details.page_no,true)

            }
          }
          else{
            if(this.props.headerState.editingMode != nextProps.headerState.editingMode){
              let details = {
                book_id : this.props.book_id,
                page_no : this.props.keyPhrasesState.page_no
              }

              if(nextProps.headerState.editingMode){
                details.current_category = QuestionCode.EditingMode + QuestionCode.RankingKeyPhrases
              }
              else{
                details.current_category = QuestionCode.SavedMode + QuestionCode.RankingKeyPhrases
              }
              this.props.fetchKeyPhrases(myURL(details),FETCH_KEYPHRASES_SUCCESS,details.current_category,0,true);

            }
          }
        }


        modeChange(){
          this.props.newMode(!this.props.headerState.editingMode)
        }
        toggle(){
          this.setState({
            isOpen: !this.state.isOpen
          });
        }
        render(){
          const borderRadiusStyle = { borderRadius: 2 }
          const dropdown = [];
          if(this.props.book_id){
            MenuBarDropdowns.map((filter,index)=>{
              let disable = false
              if(this.props.headerState.current_category == QuestionCode.Match_The_Following
                 && filter.name == "Content Types"){
                disable = true
              }
              dropdown.push(
                <FilterDropDown
                book_id = {this.props.book_id}
                key = {filter.name}
                id = {filter.id}
                headerFetch = {this.props.headerFetch}
                questionfetch = {this.props.questionfetch}
                headerState ={this.props.headerState}
                questionsState = {this.props.questionsState}
                newChapter = {this.props.newChapter}
                newType = {this.props.newType}
                disabled = {disable}
                heading = {filter.header}
                newCategory = {this.props.newCategory}
                />
              );
            });
          }

          return(
            <Navbar color="dark" light expand="md">
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>

            <Nav navbar>
            {this.props.showQuestions && dropdown}

            <NavItem className = {"m-2"}>
            <Switch
            disabled = {this.props.questionsState.loading}
            onChange={this.modeChange}
            checked={this.props.headerState.editingMode}
            width = {90}
            height = {35}
            id="normal-switch"
            offColor="#6c757d"
            onColor="#6c757d"
            uncheckedIcon={
              <div
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
              <div
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
            />
            </NavItem>

            </Nav>

            <div className="ml-auto" >
            <SearchBar
            questionfetch = {this.props.questionfetch}
            book_id = {this.props.book_id}
            headerState = {this.props.headerState}
            fetchKeyPhrases = {this.props.fetchKeyPhrases}
            showQuestions ={this.props.showQuestions}/>
            </div >
            </Collapse>
            </Navbar>

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

            if(this.props.showQuestions){

              if(this.props.headerState.editingMode){
                let cat = QuestionCode.EditingMode + this.props.headerState.current_category
                let api = API.SEARCH+this.props.book_id+"/" +this.search.current.value;
                this.props.questionfetch(api,FETCH_QUESTION_SUCCESS,cat,0,true)
              }
              else{
                let cat = QuestionCode.SavedMode + this.props.headerState.current_category
                let api = API.SEARCH_SAVED_QUESTION+this.props.book_id+"/" +this.search.current.value;
                this.props.questionfetch(api,FETCH_QUESTION_SUCCESS,cat,0,true)
              }
            }
            else{
              let cat = QuestionCode.EditingMode + QuestionCode.RankingKeyPhrases
              let api = API.SEARCH_KEYPHRASES+this.props.book_id+"/" +this.search.current.value;
              this.props.fetchKeyPhrases(api,FETCH_KEYPHRASES_SUCCESS,cat,0,true)
            }
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


      export default MenuBar;
