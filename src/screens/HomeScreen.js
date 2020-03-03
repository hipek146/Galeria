import React from 'react';
import { connect } from "react-redux";
import { LabelContainer } from '../components/Label';
import { MenuContainer } from '../components/Menu';
import { NewsContainer } from '../components/News';

class HomeScreen extends React.Component {
  render() {
    return (
      <>
        <LabelContainer />
        <MenuContainer />
        <NewsContainer />
      </>
    );
  }
}



const mapStateToProps = (state) => {
  return {
      wide: state.wideMode
   };
};
const mapDispatchToProps = { };

const HomeScreenBarContainer = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
export default HomeScreenBarContainer;
