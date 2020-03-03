import React from 'react';
import { connect } from "react-redux";
import { navigate, pictureFetched } from "../actions";
import { hostAPI } from '../config';

import HomeScreenContainer from 'screens/HomeScreen';
import GalleryScreenContainer from 'screens/GalleryScreen';
import StoreScreenContainer from 'screens/StoreScreen';
import PictureScreenContainer from 'screens/PictureScreen';
import NewsScreenContainer from 'screens/NewsScreen';
import TechniqueScreenContainer from 'screens/TechniqueScreen';
import AboutMeScreenContainer from 'screens/AboutMeScreen';
import MessageScreenContainer from 'screens/MessageScreen';

class NavigationScreen extends React.Component {
  constructor() {
    super();
    this.state = {navigator: <HomeScreenContainer />}
  }

  componentDidUpdate(prevProps) {
    if(this.props.navigator != prevProps.navigator) {
      var navigator=this.state.navigator, overlay = '';
      const regGallery = new RegExp("^gallery/.+" , "i");
      const regStore = new RegExp("^store/.+" , "i");
      const regNews = new RegExp("^news/.+" , "i");
      if(this.props.navigator && this.props.navigator.length) {
      if(regGallery.test(this.props.navigator)) {
        navigator = <GalleryScreenContainer />;
        overlay = <PictureScreenContainer name={this.props.navigator.slice(8).replace(/-/g," ")}/>;
        if(this.props.push) window.history.pushState('Picture', 'Anna Litwin', '/gallery/'+this.props.navigator.slice(8).replace(/ /g,"-"))
        document.title='Anna Litwin - Zdjecie';
      }
      else if(regStore.test(this.props.navigator)) {
        navigator = <StoreScreenContainer />;
        overlay = <PictureScreenContainer
                    name={this.props.navigator.slice(6).replace(/-/g," ")}
                    auction={true}
                  />;
        if(this.props.push) window.history.pushState('Auction', 'Anna Litwin', '/store/'+this.props.navigator.slice(6).replace(/ /g,"-"))
        document.title='Anna Litwin - Aukcja';
      }
      else if(regNews.test(this.props.navigator)) {
        navigator = <NewsScreenContainer name={this.props.navigator.slice(5).replace(/-/g," ")}/>;
        if(this.props.push) window.history.pushState('News', 'Anna Litwin', '/news/'+this.props.navigator.slice(5).replace(/ /g,"-"))
        document.title='Anna Litwin - News';
      }
      else {
      switch(this.props.navigator.toLowerCase()) {
        case 'home':
          navigator = <HomeScreenContainer />;
          if(this.props.push) window.history.pushState('Home', 'Anna Litwin', '/home')
          document.title='Anna Litwin';
          break;
        case 'gallery':
            navigator = <GalleryScreenContainer />;
            if(this.props.push) window.history.pushState('Gallery', 'Anna Litwin - Galeria', '/gallery');
            document.title='Anna Litwin - Galeria';
            break;
        case 'store':
          navigator = <StoreScreenContainer />;
          if(this.props.push) window.history.pushState('Store', 'Anna Litwin', '/store')
          document.title='Anna Litwin - Sprzedaż';
          break;
        case 'technique':
          navigator = <TechniqueScreenContainer />;
          if(this.props.push) window.history.pushState('Technique', 'Anna Litwin', '/technique');
          document.title='Anna Litwin - Technika';
          break;
        case 'about-me':
          navigator = <AboutMeScreenContainer />;
          if(this.props.push) window.history.pushState('About-me', 'Anna Litwin', '/about-me');
          document.title='Anna Litwin - O mnie';
          break;
        case '/':
          navigator = <HomeScreenContainer />;
          if(this.props.push) window.history.pushState('Home', 'Anna Litwin', '/');
          document.title='Anna Litwin';
          break;
        case 'message':
          overlay = <MessageScreenContainer />
          if(this.props.push) window.history.pushState('Message', 'Anna Litwin', '/message')
          document.title='Anna Litwin - Wiadomość';
          break;
        default:
          if(this.props.push) window.history.pushState('404', 'Anna Litwin - 404 Not Found', '');
          throw new Error('404 Page not found');
      }
      }
      }
      this.setState({
        navigator: navigator,
        overlay: overlay,
      })
    }
  }

  render() {
    return (
      <div>
        {this.state.navigator}
        {this.state.overlay}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    navigator: state.navigate.destination,
    push: state.navigate.push
  }
};
const mapDispatchToProps = { navigate, pictureFetched };

export const NavigationScreenContainer = connect(mapStateToProps, mapDispatchToProps)(NavigationScreen);
