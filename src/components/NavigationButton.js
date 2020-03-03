import React from 'react';
import { connect } from "react-redux";
import theme from '../theme.js';
import '../styles/NavigationButton.css';
import { navigate } from '../actions'

class NavigationButton extends React.Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.navigate(this.props.destination);
  }

  render() {
    const background = {
        width: '100%',
        height: '100%',
        background: 'url('+ this.props.image +')',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }

      const style = {
        content: {
          height: '100%',
          background: theme.menu,
          paddingTop: this.props.wide ? '10%' : '1%',
          display: 'flex',
          flexDirection: 'column',
        },
        title: {
          fontSize: '22px',
          fontWeight: '700',
          marginLeft: '6%',
          textAlign: 'left',
        },
        barrier: {
          width: '80%',
          borderBottom: '2px solid #888',
          margin: '3%',
        }
      }

    return (
      <div className={ this.props.wide ? "navigationButton" : "navigationButtonNarrow"}
        onClick={this.onClick}
      >
      <div style={background} >
      <div style={style.content}>
          <div className="navigationButtonTitle">
              {this.props.title}
          </div>
          <div style={style.barrier} />
          <div className={"navigationButtonNote"}>
              {this.props.note}
          </div>
      </div>
      </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    wide: state.wideMode
  };
};
const mapDispatchToProps = { navigate };

export const NavigationButtonContainer = connect(mapStateToProps, mapDispatchToProps)(NavigationButton);
