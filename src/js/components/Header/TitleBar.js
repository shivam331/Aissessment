import React, { Component } from 'react';
import { FETCH_TITLE_SUCCESS } from "../../Actions/HeaderActions"
import {API} from "../../utils/api_list"



class TitleBar extends Component{
  componentDidMount(){
    let api = API.BOOK_NAME + this.props.book_id;
    this.props.headerFetch(api,FETCH_TITLE_SUCCESS)
  }
  render(){
    if (this.props.data.error) {
      return <p>{this.props.data.error.message}</p>;
    }

    if (this.props.data.loading) {
      return <p>Loading Data ...</p>;
    }
    return(
      <h3 className="font-weight-bold ml-5 mt-2">{this.props.data.title}</h3>
    );
  }
}


export default TitleBar
