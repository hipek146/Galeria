import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { triggerBar } from 'actions';

import { NewsContainer } from 'components/News';

import 'styles/NewsScreen.css';
import 'styles/AboutMeScreen.css';

class AboutMeScreen extends React.Component {
  componentDidMount() {
    this.props.triggerBar(true);
    window.scrollTo(0, 0);
  }

  render() {
    return(
      <>
        <div className="aboutMeScreenMain">
          <div className="newsScreenContent">
            JAKIŚ TEKST O MNIE
          </div>
        </div>
        <NewsContainer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.article);
  return {};
};
const mapDispatchToProps = { triggerBar };

export const AboutMeScreenRedux = connect(mapStateToProps, mapDispatchToProps)(AboutMeScreen);
const AboutMeScreenContainer = withTranslation()(AboutMeScreenRedux);
export default AboutMeScreenContainer;
