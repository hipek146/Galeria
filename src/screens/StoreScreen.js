import React from 'react';
import { connect } from 'react-redux';
import { triggerBar } from '../actions';
import { withTranslation } from 'react-i18next';
import { FilterContainer } from '../components/Filter'
import { StoreContainer } from '../components/Store'
import 'styles/StoreScreen.css';

class StoreScreen extends React.Component {
  componentDidMount() {
    this.props.triggerBar(true);
  }
  render() {
    const { t } = this.props;
    return (
      <div style={style.main}>
          <FilterContainer hideView={true} />
          <div style={style.store}>
              <div className="storeScreenOrderWrapper">
              <div className="storeScreenOrder">
                {t('placeAnOrder')}
              </div>
              </div>
              <StoreContainer />
          </div>
      </div>
    );
  }
}

const style = {
  main: {
    display: 'flex',
  },
  store: {
    width: '100%',
    marginLeft: '310px',
    marginTop: '80px',
    position: 'relative',
  }
}

const mapStateToProps = (state) => {
  return { };
};
const mapDispatchToProps = { triggerBar };

const StoreScreenRedux = connect(mapStateToProps, mapDispatchToProps)(StoreScreen);
export const StoreScreenContainer = withTranslation()(StoreScreenRedux);
export default StoreScreenContainer;
