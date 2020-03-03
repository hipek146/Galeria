import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { triggerBar } from 'actions';

import { NewsContainer } from 'components/News';

import 'styles/NewsScreen.css';
import 'styles/TechniqueScreen.css';

class TechniqueScreen extends React.Component {
  componentDidMount() {
    this.props.triggerBar(true);
    window.scrollTo(0, 0);
  }

  render() {
    return(
      <>
        <div className="techniqueScreenMain">
          <div className="newsScreenContent">
            JAKIŚ TEKST
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

export const TechniqueScreenRedux = connect(mapStateToProps, mapDispatchToProps)(TechniqueScreen);
const TechniqueScreenContainer = withTranslation()(TechniqueScreenRedux);
export default TechniqueScreenContainer;
