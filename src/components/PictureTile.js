import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { openPicture, navigate } from "../actions";
import "../styles/PictureTile.css";

class PictureTile extends React.Component {
  constructor() {
    super();
    this.clickPicture = this.clickPicture.bind(this);
  }
  clickPicture() {
    this.props.openPicture(this.props.name);
    this.props.navigate("gallery/" + this.props.name);
  }
  render() {
    const { name, image, info, date, width, height } = this.props;
    const convertedDate = new Date(date);
    const { t } = this.props;
    const style = {
      main: {
        width: "400px",
        height: "360px",
        margin: "20px",
        display: "flex",
        flexDirection: "column",
        background: "#ddd",
        boxShadow: "0px 1px 4px 2px #333",
        boxSizing: "border-box"
      },
      imageDiv: {
        flexGrow: "1",
        height: "0%"
      },
      image: {
        width: "100%",
        height: "100%",
        objectFit: "contain",
        filter:
          "drop-shadow(0px 0px 2px rgba(0,0,0,.5)) drop-shadow(0px 0px 3px rgba(0,0,0,.5))",
        padding: "7px",
        boxSizing: "border-box"
      },
      name: {
        fontFamily: "Fira Sans",
        fontWeight: "700",
        fontSize: "22px",
        padding: "3px"
      },
      footer: {
        //  borderTop: '1px solid #777',
        //  background: '#cecece',
        padding: "0px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        paddingLeft: "2px",
        paddingTop: "2px"
      },
      info: {
        margin: "2px",
        marginLeft: "0px",
        marginTop: "0px",
        background: "#bdbdbd",
        border: "1px solid #aaa",
        borderRadius: "3px",
        flexGrow: "1",
        padding: "1px",
        paddingLeft: "4px",
        paddingRight: "4px",
        fontSize: "15px",
        color: "#333",
        fontFamily: "Fira Sans",
        fontWeight: "700"
      }
    };
    return (
      <div
        className="PictureTileMain"
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}
        onClick={this.clickPicture}
      >
        <div style={style.imageDiv}>
          <img
            src={process.env.PUBLIC_URL + "/data/pictures/" + image}
            style={style.image}
          />
        </div>
        <div style={style.name}>{name}</div>
        <div style={style.footer}>
          <div style={style.info}>
            {width}cm x {height}cm
          </div>
          <div style={style.info}>
            {convertedDate.getDate() +
              "." +
              convertedDate.getMonth() +
              "." +
              convertedDate.getFullYear()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = { openPicture, navigate };

const PictureTileRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(PictureTile);
export const PictureTileContainer = withTranslation()(PictureTileRedux);
