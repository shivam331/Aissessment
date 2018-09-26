import React, { Component } from 'react';
import { FETCH_TITLE_SUCCESS } from "../../../Actions/HeaderActions"
import {API} from "../../../utils/api_list"
import {Link} from 'react-router-dom'



class TitleBar extends Component{
  componentDidMount(){
    if(this.props.book_id){
      let api = API.BOOK_NAME + this.props.book_id;
      this.props.headerFetch(api,FETCH_TITLE_SUCCESS)
    }
  }
  render(){
    if (this.props.data.error) {
      return <p>{this.props.data.error.message}</p>;
    }

    if (this.props.data.loading) {
      return <p>Loading Data ...</p>;
    }
    return(
      <div>
      <h3 className="font-weight-bold ml-5 mt-2">{this.props.data.title}</h3>
      </div>
    );
  }
}


export default TitleBar
