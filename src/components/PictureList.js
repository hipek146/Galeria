import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { openPicture, navigate } from '../actions';
import '../styles/PictureList.css';

class PictureList extends React.Component {
  constructor() {
    super();
    this.clickPicture = this.clickPicture.bind(this);
  }
  clickPicture() {
    this.props.openPicture(this.props.name);
    this.props.navigate((this.props.price ? 'store/' : 'gallery/')+this.props.name);
  }
  render() {
    const { t, name, image, description, info, price } = this.props;
    return (
      <div className="pictureListMain" onClick={this.clickPicture}>
          <img src={process.env.PUBLIC_URL + '/data/pictures/'+image} className="pictureListImage" />
          <div className="pictureListContent">
            <div className="pictureListTitle">
              {name}
            </div>
            <div className="pictureListDescription">
                <div className="pictureListDescriptionWrap">
                    {description}
                    </div>
            </div>
          </div>
          <div className="pictureListFooter">
          {Object.keys(info).map(element =>
            <div className="pictureListInfo">{t(info[element])}</div>
          )}
          </div>
          {price &&
          <div className="pictureListPriceWrapper">
            <div className="pictureListPrice">
              {Math.floor(price)} <span className="pictureListPricePlaces">{((price - Math.floor(price)) * 100).toFixed(0)}</span> PLN
            </div>
          </div>
          }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};
const mapDispatchToProps = { openPicture, navigate };

export const PictureListRedux = connect(mapStateToProps, mapDispatchToProps)(PictureList);
export const PictureListContainer = withTranslation()(PictureListRedux);
