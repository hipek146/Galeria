import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { navigate } from 'actions';
import '../styles/MessageScreen.css';

class MessageScreen extends React.Component {
  constructor() {
    super();
    this.close = this.close.bind(this);
    this.click = this.click.bind(this);
  }

  componentDidMount() {
    document.body.classList.add("no-scroll")
  }

  componentWillUnmount() {
    document.body.classList.remove("no-scroll")
  }

  close() {
    this.props.navigate('/');
  }

  click(event) {
    event.stopPropagation();
  }

  render() {
    const { t } = this.props;

    return(
      <div className="messageScreenMain" onClick={this.close} >
          <div className="messageScreenContent" onClick={this.click}>
            <div className="messageScreenMainHeader">
              {t('quickMessage')}
            </div>
            <div className="messageScreenHeader">{t('messageContent')}</div>
            <textarea className="messageScreenTextarea" />
            <div className="messageScreenHeader">{t('feedbackContact')}</div>
            <input className="messageScreenFeedback" type="text" />
            <div className="messageScreenButton" >{t('submit')}</div>
          </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = { navigate };

export const MessageScreenRedux = connect(mapStateToProps, mapDispatchToProps)(MessageScreen);
const MessageScreenContainer = withTranslation()(MessageScreenRedux);
export default MessageScreenContainer;
