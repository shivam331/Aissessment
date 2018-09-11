import React, { Component } from 'react';
import { FETCH_TITLE_SUCCESS } from "../../Actions/HeaderActions"


var api = "http://localhost:3000/api/bookname/"
class TitleBar extends Component{
  componentDidMount(){
    api = api + this.props.book_id;
    this.props.headerFetch(api,FETCH_TITLE_SUCCESS)
    //this.props.dispatch(fetchHeaderData(api,FETCH_TITLE_SUCCESS));
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
