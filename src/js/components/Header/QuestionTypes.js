import React, { Component } from 'react';
import {changeCategory} from "../../Actions/HeaderActions";
import {connect} from 'react-redux';
import {NavItem,NavLink } from 'reactstrap';



class QuestTypes extends Component{
  constructor(props){
    super(props)
    this.handleclick = this.handleclick.bind(this);
  }
  handleclick() {
    this.props.newCategory(this.props.category_id)
    
  }
  render(){
    return(
      <NavItem>
      <NavLink href = "#" onClick={this.handleclick} >{this.props.name}</NavLink>
      </NavItem>

    );
  }
}
export default QuestTypes
