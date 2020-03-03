import React from 'react';
import '../styles/Label.css';
import { connect } from "react-redux";
import theme from '../theme.js';
import iconEmail from '../assets/icons/icon-email.png';
import iconPhone from '../assets/icons/icon-phone.png';

import Contact from '../components/Contact';
import { QuickMessageContainer } from '../components/QuickMessage';


class Label extends React.Component {
  render() {
    console.log("Label "+this.props.wide)
    const style = {
      width: '100%',
    //  marginTop: '4px',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexFlow: 'row wrap',
      flexDirection: this.props.wide ? 'row' : 'column',
      background: theme.label,
      boxShadow: '0 0px 4px 4px #333',
      borderBottom: '2px solid #222',
      boxSizing: 'border-box',
    }
    const background = {
      background: 'url('+ process.env.PUBLIC_URL + '/images/label-background.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
    return (
      <div style={background}>
      <div style={style} >
          <div className="labelImage labelItem">
                  <img src={process.env.PUBLIC_URL + '/images/profil-picture.png'}  height="100%" />
          </div>
          <div className="labelName labelItem">
              Anna Litwin
          </div>
          {this.props.wide && <div className="labelBarrier" />}
          <div className="labelContact labelItem">
              <Contact name="507 344 201" image = {iconPhone} />
              <Contact name="contact@annalitwin.com" mail={true} image = {iconEmail} />
              <QuickMessageContainer />
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
const mapDispatchToProps = { };

export const LabelContainer = connect(mapStateToProps, mapDispatchToProps)(Label);
