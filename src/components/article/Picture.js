import React from 'react';
import { connect } from 'react-redux';
import { hostAPI } from 'config';
import { withTranslation } from 'react-i18next';
import { navigate } from 'actions';

import './Picture.css';

class Picture extends React.Component {
  constructor(){
    super();
    this.setPicture = this.setPicture.bind(this);
    this.click = this.click.bind(this);
  }

  componentDidMount() {
    fetch(hostAPI+('/picture/')+'pl?name='+this.props.name)
      .then(res => res.json())
      .then(json => this.setPicture(json));
  }

  setPicture(json) {
    this.setState(json[0]);
  }

  click() {
    this.props.navigate('gallery/'+this.props.name)
  }

  render() {
    const { t } = this.props;

    return(
      <>
        {this.state &&
          <div style={style.center}>
          <div style={style.main}>
            <div style={style.leftSide}>
              <img src={process.env.PUBLIC_URL + '/data/pictures/'+this.state.IMAGE} style={style.image} />
            </div>
            <div style={style.rightSide}>
              <div style={style.name}>
                {this.state.NAME}
              </div>
              <div style={style.description}>
              <div className="newsPictureDescription">
                {this.state.DESCRIPTION}
              </div>
              </div>
              <div className="newsPictureButton" onClick={this.click}>
                  {t('seeInGallary')}
              </div>
            </div>
          </div>
          </div>
        }
      </>
    );
  }
}

const style= {
  center: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '6px',
    paddingTop: '16px',
    boxSizing: 'border-box',
  },
  main: {
    border: '2px solid #444',
    borderRadius: '4px',
    display: 'flex',
    maxWidth: '620px',
    height: '240px',
    boxSizing: 'border-box',
    boxShadow: '0px 0px 5px 2px #666',
  },
  leftSide: {
    height: '100%',
    width: '40%',
    background: '#ccc',
    padding: '4px',
    borderRight: '3px solid #444',
    boxSizing: 'border-box',

  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    filter: 'drop-shadow(0px 0px 2px rgba(0,0,0,1)) drop-shadow(0px 0px 2px rgba(0,0,0,1))',
  },
  rightSide: {
    position: 'relative',
    width: '60%',
    background: '#eee'
  },
  name: {
    fontFamily: 'Fira Sans',
    fontSize: '22px',
    fontWeight: 'bold',
    marginTop: '16px',
  },
  description: {
    padding: '12px',
  },

}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = { navigate };

export const PictureRedux = connect(mapStateToProps, mapDispatchToProps)(Picture);
const PictureContainer = withTranslation()(PictureRedux);
export default PictureContainer;
