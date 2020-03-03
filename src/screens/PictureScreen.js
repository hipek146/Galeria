import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { pictureFetched, navigate } from 'actions';
import { hostAPI } from 'config';
import pictureInfo from 'pictureInfo.json';
import 'styles/PictureScreen.css';


class PictureScreen extends React.Component {
  constructor() {
    super();
    this.goAuction = this.goAuction.bind(this);
    this.close = this.close.bind(this);
    this.order = this.order.bind(this);
    this.sumUp = this.sumUp.bind(this);
    this.sendOrder = this.sendOrder.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.state = {order: false, sumUp: false, info: {name: '', surname: '', address: '', phoneNumber: '', email: ''}, comments: '', payment: 'bankTransfer', delivery: 'courier', error: {}, termsChecked: false};
  }

  componentDidMount() {
    document.body.classList.add("no-scroll")
    this.pictureFetch(this.props.name);
  }

  componentWillUnmount() {
    document.body.classList.remove("no-scroll")
  }

  pictureFetch(name) {
    fetch(hostAPI+(this.props.auction ? '/auction/' : '/picture/')+'pl?name='+name)
      .then(res => res.json())
      .then(json => this.props.pictureFetched(json));
  }

  close() {
    if(this.props.auction) {
      this.props.navigate('store');
    }
    else {
      this.props.navigate('gallery');
    }
  }

  goAuction() {
    this.props.navigate('store/' + this.props.openedPictureInfo.NAME);
  }

  click(event) {
    event.stopPropagation();
  }

  order() {
    this.setState({
      order: !this.state.order,
      error: {}
    });
  }

  sendOrder() {
    //fetch(hostAPI+'/order/' + this.props.openedPictureInfo.ID + '?'+ Object.keys(this.state.info).map(element => element + "=" + this.state.info[element]).join('&') + '&payment=' + this.state.payment + '&delivery=' + this.state.delivery  + '&comments=' + this.state.comments);
    this.close();
  }

  sumUp() {
    var errors = {};
    var regEmail = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var regPhone = /(^|\W)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/;
    for(let element in this.state.info) {
      if(this.state.info[element] === '') {
        errors[element] = true;
      } else if(element === 'email' && !regEmail.test(String(this.state.info[element]).toLowerCase())) {
        errors[element] = true;
      } else if(element === 'phoneNumber' && !regPhone.test(String(this.state.info[element]).toLowerCase())) {
        errors[element] = true;
      }
    }
    if(!this.state.termsChecked) {
      errors.termsChecked = true;
    }
    this.setState({
      error: errors
    });
    if(!Object.keys(errors).length) {
      this.setState({
        sumUp: !this.state.sumUp
      });
    }
  }

  handleChange(element, event) {
    if(element === 'comments') {
      this.setState({
        comments: event.target.value
      });
    }
    else {
      this.setState({
        info: Object.assign({}, this.state.info, {[element]: event.target.value})
      });
    }
  }

  handleCheckboxChange(event) {
    this.setState({
      termsChecked: event.target.checked
    });
  }


  render() {
    const { t } = this.props;
    var info, infoContainer;
    var pairFlag = true;
    if(this.props.openedPictureInfo) {
      info = this.props.openedPictureInfo;
      infoContainer = Object.keys(pictureInfo).map(element =>
        <div className={(pairFlag = !pairFlag)  ? "pictureScreenInfoPair" : "pictureScreenInfoUnpair"}>
            <div className="pictureScreenInfoLeft">
                {t(element)}
            </div>
            <div className="pictureScreenInfoRight">
                {t(info[element.toUpperCase()])}
            </div>
        </div>
      )
    }
    return (
        <div className="pictureScreenMain" onClick={this.close}>
            {this.props.openedPictureInfo &&
            <div className="pictureScreenContent" onClick={this.click}>
                <div className="pictureScreenCloseButton" onClick={this.close}>
                  x
                </div>
                {this.state.order ?
                  this.state.sumUp ?
                  <div className="pictureScreenTitle">
                  <div className="pictureScreenName">
                    {t('sumUp')}
                  </div>
                  <div className="pictureScreenSumFormWrapper">
                  <div className="pictureScreenSumForm">
                  {Object.keys(this.state.info).map(element =>
                      <div className="pictureScreenSumLabel">{t(element)}:</div>
                  )}
                    <div className="pictureScreenSumLabel">{t('expense')}:</div>
                    <div className="pictureScreenSumLabel">{t('delivery')}:</div>
                    <div className="pictureScreenSumLabel">{t('methodOfPayment')}:</div>
                  </div>
                  <div className="pictureScreenSumForm">
                  {Object.keys(this.state.info).map(element =>
                      <div className="pictureScreenSumLabel">{this.state.info[element]}</div>
                  )}
                    <div className="pictureScreenSumLabel">{this.props.openedPictureInfo.PRICE} PLN</div>
                    <div className="pictureScreenSumLabel">{t('courier')}</div>
                    <div className="pictureScreenSumLabel">{t('bankTransfer')}</div>
                  </div>
                  </div>
                  <div className="pictureScreenForm">
                    <div className="pictureScreenBack" onClick={this.sumUp}>
                      {t('cancel')}
                    </div>
                    <div className="pictureScreenOrder" onClick={this.sendOrder}>
                      {t('confirm')}
                    </div>
                  </div>
                  </div>
                  :
                  <div className="pictureScreenTitle">
                    <div className="pictureScreenName">
                      {this.props.openedPictureInfo.NAME}
                    </div>
                    <div className="pictureListPrice">
                      {Math.floor(this.props.openedPictureInfo.PRICE)} <span className="pictureListPricePlaces">{((this.props.openedPictureInfo.PRICE - Math.floor(this.props.openedPictureInfo.PRICE)) * 100).toFixed(0)}</span> PLN
                    </div>
                    {Object.keys(this.state.info).map(element =>
                      <div className="pictureScreenForm">
                        <div className="pictureScreenLabel">{t(element)}</div>
                        <input type="text" className={"pictureScreenInput"  + (this.state.error[element] ? " pictureScreenInputEroor" : "")} value={this.state.info[element]} onChange={this.handleChange.bind(this, element)} />
                      </div>
                    )}
                    <div className="pictureScreenForm"><div className="pictureScreenLabel">{t('delivery')}</div><div className="pictureScreenInput">{t('courier')}</div></div>
                    <div className="pictureScreenForm"><div className="pictureScreenLabel">{t('methodOfPayment')}</div><div className="pictureScreenInput">{t('bankTransfer')}</div></div>
                    <div className="pictureScreenForm"><div className="pictureScreenLabel">{t('comments')}</div><textarea rows="3" className="pictureScreenInput"  value={this.state.comments} onChange={this.handleChange.bind(this, 'comments')} /></div>
                    <span><input className={this.state.error.termsChecked ? "pictureScreenCkeckboxError" : ""} type="checkbox" checked={this.state.termsChecked} onChange={this.handleCheckboxChange} />{t('IAccept')} {t('theRules')} {t('and')} {t('thePrivacyPolicy')}</span>
                    <div className="pictureScreenForm">
                      <div className="pictureScreenBack" onClick={this.order}>
                        {t('back')}
                      </div>
                      <div className="pictureScreenOrder" onClick={this.sumUp}>
                        {t('iAmPurchasing')}
                      </div>
                    </div>
                  </div>
                : <>
                <div className="pictureScreenHeader">
                  <img src={process.env.PUBLIC_URL + '/data/pictures/'+this.props.openedPictureInfo.IMAGE} className="pictureScreenImage" />
                  <div className="pictureScreenTitle">
                      <div className="pictureScreenName">
                          {this.props.openedPictureInfo.NAME}
                      </div>
                      {(this.props.openedPictureInfo.PRICE && !this.props.auction) &&
                        <div className="pictureListPriceWrapper pictureListPointer" onClick={this.goAuction}>
                          <div className="pictureListPrice">
                            {t('forSale')}
                          </div>
                        </div>
                      }
                      {this.props.auction &&
                        <div className="pictureListPriceWrapper">
                          <div className="pictureListPrice">
                            {Math.floor(this.props.openedPictureInfo.PRICE)} <span className="pictureListPricePlaces">{((this.props.openedPictureInfo.PRICE - Math.floor(this.props.openedPictureInfo.PRICE)) * 100).toFixed(0)}</span> PLN
                          </div>
                          <div className="pictureScreenOrder" onClick={this.order}>
                            {t('order')}
                          </div>
                        </div>
                      }
                      <div className="pictureScreenInfoWrapper">
                          {infoContainer}
                      </div>
                  </div>
                </div>
                <div className="pictureScreenDescription">
                    <div className="pictureScreenDescriptionHeader">
                        {t('description')}:
                    </div>
                    {this.props.openedPictureInfo.DESCRIPTION}
                </div>
                </>
              }
            </div>
            }
        </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    openedPicture: state.openedPicture,
    openedPictureInfo: state.openedPictureInfo[0]
  };
};
const mapDispatchToProps = { pictureFetched, navigate };

export const PictureScreenRedux = connect(mapStateToProps, mapDispatchToProps)(PictureScreen);
const PictureScreenContainer = withTranslation()(PictureScreenRedux);
export default PictureScreenContainer;
