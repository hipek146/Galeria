import React from 'react';
import { connect } from 'react-redux';
import { triggerBar } from '../actions';
import { FilterContainer } from '../components/Filter'
import { GalleryContainer } from '../components/Gallery'

class GalleryScreen extends React.Component {
  componentDidMount() {
    this.props.triggerBar(true);
  }
  render() {
    return (
      <div style={style.main}>
          <FilterContainer />
          <div style={style.gallery}>
              <GalleryContainer />
          </div>
      </div>
    );
  }
}

const style = {
  main: {
    display: 'flex',
  },
  gallery: {
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

export const GalleryScreenContainer = connect(mapStateToProps, mapDispatchToProps)(GalleryScreen);
export default GalleryScreenContainer;
