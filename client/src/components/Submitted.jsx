import React, { Component} from "react";
import ReactDOM from "react-dom";



class Submitted extends Component {
  constructor(props) {
    super(props);
    }





  render () {
    return (
      <div className="outer" onClick={this.props.exit}>
        <div className="inner">Submitted</div>
      </div>
    )
  }
}

export default Submitted;