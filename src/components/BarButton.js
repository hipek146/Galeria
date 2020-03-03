import React from 'react';
import { connect } from "react-redux";
import '../styles/BarButton.css';
import { navigate } from '../actions'

class BarButton extends React.Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.navigate(this.props.destination);
  }

  render() {
    return (
      <div className={this.props.header ? "barButtonHeader" : "barButton"} onClick={this.onClick}>
          {this.props.name}
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return { };
};
const mapDispatchToProps = { navigate };

export const BarButtonContainer = connect(mapStateToProps, mapDispatchToProps)(BarButton);
