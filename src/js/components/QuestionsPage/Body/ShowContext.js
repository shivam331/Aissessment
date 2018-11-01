import React, {
  Component
} from 'react';
import ReactDOM from "react-dom";
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
class ShowContext extends Component{
  constructor(props) {
   super(props);

   this.toggle = this.toggle.bind(this);
   this.state = {
     popoverOpen: false
   };
 }

 toggle(e) {
   e.preventDefault()
   this.setState({
     popoverOpen: !this.state.popoverOpen
   });

 }
  render(){

    return(
      <div className = "col-8-md px-2" >
      <a href = "#"  id={"popover"+this.props.index}  onClick = {this.toggle}
      className = "fa fa-info-circle" > < /a>
      <Popover  placement="bottom" isOpen={this.state.popoverOpen} target={"popover"+this.props.index} toggle={this.toggle}>
       <PopoverHeader>{this.props.context?this.props.context.page.replace('.txt',''):""}</PopoverHeader>
       <PopoverBody>
{this.props.context? this.props.context.content : "" }
       </PopoverBody>
     </Popover>
      </div>
    )
  }
}

export default ShowContext
