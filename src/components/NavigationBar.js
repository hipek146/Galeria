import React from "react";
import { connect } from "react-redux";
import { galleryNavigation } from "../actions";
import theme from "../theme.js";
import "../styles/NavigationBar.css";
import iconMenu from "../assets/icons/icon-menu.png";

import { BarButtonContainer } from "../components/BarButton";

class NavigationBar extends React.Component {
  constructor() {
    super();
    this.menuTrigger = this.menuTrigger.bind(this);
    this.state = { menu: false };
  }

  menuTrigger() {
    this.setState({
      menu: !this.state.menu
    });
  }

  render() {
    const style = {
      main: {
        position: "fixed",
        width: "100%",
        height: "60px",
        background: theme.main,
        boxShadow: "0 -2px 8px 4px #333",
        zIndex: "10",
        padding: "6px",
        fontFamily: "Fira Sans",
        display: "flex",
        alignItems: "center",
        justifyContent: this.props.wide ? "center" : "space-between",
        overflow: "hidden"
      },
      list: {
        background: theme.main,
        position: "fixed",
        top: "72px",
        left: "0px",
        width: "100%",
        display: this.state.menu ? "block" : "none"
      }
    };

    return (
      <div style={style.main}>
        <BarButtonContainer header="true" name="Anna Litwin" destination="/" />
        {this.props.wide && (
          <>
            <BarButtonContainer name="Galeria" destination="Gallery" />
            <BarButtonContainer name="Sprzedaż" destination="Store" />
            <BarButtonContainer name="Technika" destination="Technique" />
            <BarButtonContainer name="O mnie" destination="About-Me" />
          </>
        )}
        {!this.props.wide && (
          <div>
            <img
              className="NavigationBarMenu"
              src={iconMenu}
              height="60px"
              onClick={this.menuTrigger}
            />
            <div style={style.list}>
              <BarButtonContainer name="Galeria" destination="Gallery" />
              <BarButtonContainer name="Sprzedaż" destination="Store" />
              <BarButtonContainer name="Technika" destination="Technique" />
              <BarButtonContainer name="O mnie" destination="About-Me" />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    wide: state.wideMode
  };
};
const mapDispatchToProps = { galleryNavigation };

export const NavigationBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar);
