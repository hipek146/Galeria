import React from 'react';
import { connect } from "react-redux";
import { triggerBar } from "../actions";

import { NavigationButtonContainer } from '../components/NavigationButton';

class Menu extends React.Component {
  constructor() {
    super();
    this.checkScroll = this.checkScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.checkScroll);
    this.checkScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.checkScroll);
  }

  checkScroll() {
    if(!this.props.mode && window.scrollY > this.element.offsetTop + this.element.offsetHeight -60 ) {
      this.props.triggerBar(true);
    }
    else if(this.props.mode && window.scrollY <= this.element.offsetTop + this.element.offsetHeight -60) {
      this.props.triggerBar(false);
    }
  }

  render() {
    const style = {
      main: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: this.props.wide ? 'row' : 'column',
        flexWrap: 'wrap',
        marginTop: '30px',
        marginBottom:'100px',
      },
      row: {
        display: 'flex',
        flexDirection: this.props.wide ? 'row' : 'column',
        width: this.props.wide ? 'auto' : '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }
    }

    return (
      <div style={style.main} ref={element => this.element = element}>
          <div style={style.row}>
          <NavigationButtonContainer title="Obrazy i galeria" image={process.env.PUBLIC_URL + '/images/menu-gallery.jpg'}
              note="Wszystkie moje dotychczasowe prace. Ładnie pogrupowane."
              destination="Gallery"
          />
          <NavigationButtonContainer title="Sprzedaż i zamówienia" image={process.env.PUBLIC_URL + '/images/menu-shop.jfif'}
              note="Istnieje  możliwość złożenia indywidualnego zamówina. Czasem też obrazy są wystawine na sprzedaż lub aukcje."
              destination="Store"
          />
          </div>
          <div style={style.row}>
          <NavigationButtonContainer title="Technika i technologia" image={process.env.PUBLIC_URL + '/images/menu-technique.jpg'}
              note="Opis co tam sobie dziecko drogie tu chcesz mieć."
              destination="Technique"
          />
          <NavigationButtonContainer title="Informacje o mnie" image={process.env.PUBLIC_URL + '/images/menu-aboutMe.jpg'}
              note="Czyli kim jestem i czym się zajmuję."
              destination="About-Me"
          />
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mode: state.triggerBar,
    wide: state.wideMode
  };
};
const mapDispatchToProps = { triggerBar };

export const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(Menu);
