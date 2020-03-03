import React from 'react';
import { connect } from "react-redux";
import { navigate } from 'actions'
import '../styles/QuickMessage.css';

class QuickMessage extends React.Component {
  click() {
    this.props.navigate('message');
  }

  render() {
    return (
      <div className="quickMessage" onClick={this.click.bind(this)}>
          Szybka wiadomość
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { };
};
const mapDispatchToProps = { navigate };

export const QuickMessageContainer = connect(mapStateToProps, mapDispatchToProps)(QuickMessage);
