import React, { Suspense } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import { connect } from "react-redux";
import { newsFetched, wideMode, navigate } from "./actions";
import { hostAPI } from './config';

import { NavigationBarContainer } from './components/NavigationBar';
import { NavigationScreenContainer } from './navigation/NavigationScreen'

class App extends React.Component {
  constructor() {
    super();
    this.onResize = this.onResize.bind(this);
  }

  componentDidMount() {
   window.addEventListener('resize', this.onResize);
   this.onResize();
   if(window.location.pathname === '/') {
     this.props.navigate('/', false);
   }
   else if(window.location.pathname) {
     this.props.navigate(window.location.pathname.substring(1));
   }
   window.onpopstate  = () => {
     if(window.location.pathname === '/') {
       this.props.navigate('/', false);
     }
     else if(window.location.pathname) {
       this.props.navigate(window.location.pathname.substring(1), false);
     }
   }

   fetch(hostAPI)
     .then(res => res.json())
     .then(json => this.props.newsFetched(json));
  }

  componentWillUnmount() {
    document.removeEventListener('resize', this.onResize);
  }

  onResize() {
    if(this.element.offsetWidth > 800 && !this.props.wide) {
      console.log(true);
      this.props.wideMode(true);
    }
    else if(this.element.offsetWidth <= 800 && this.props.wide) {
      console.log(false);
      this.props.wideMode(false);
    }
  }

  render() {
    return (
      <Suspense fallback={(<div></div>)}>
      <div className="App" ref={element => this.element=element}>
          {
              this.props.bar && <NavigationBarContainer />
          }
          <NavigationScreenContainer />
      </div>
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    news: state.news,
    bar: state.triggerBar,
    wide: state.wideMode
  }
};
const mapDispatchToProps = { newsFetched, wideMode, navigate };

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
