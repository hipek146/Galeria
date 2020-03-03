import React from "react";
import { connect } from "react-redux";
import { navigate } from "actions";
import "../styles/NewsNote.css";

class NewsNote extends React.Component {
  constructor() {
    super();
    this.click = this.click.bind(this);
  }

  click() {
    this.props.navigate("news/" + this.props.title);
  }

  render() {
    const { title, date, image, cover, content } = this.props;
    const convertedDate = new Date(date);
    const bgSize = cover ? "cover" : "contain";
    const style = {
      miniature: {
        height: "100%",
        width: "280px",
        backgroundColor: "#ddd",
        backgroundImage:
          "url(" + process.env.PUBLIC_URL + "/data/miniatures/" + image + ")",
        backgroundSize: bgSize,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        border: "1px solid #aaa",
        borderRadius: "3px",
        boxSizing: "border-box"
      },
      rightSide: {
        flex: "1",
        textAlign: "left",
        padding: "5px",
        paddingLeft: "20px",
        display: "flex",
        flexDirection: "column"
      },
      header: {
        display: "flex"
      },
      title: {
        flex: "1",
        fontFamily: "Fira Sans",
        fontWeight: "700",
        fontSize: "24px",
        padding: "2px"
      },
      date: {
        padding: "4px",
        fontFamily: "Arial",
        fontSize: "14px",
        color: "#444"
      }
    };

    return (
      <div className="newsNoteMain" onClick={this.click}>
        <div style={style.miniature} />
        <div style={style.rightSide}>
          <div style={style.header}>
            <div style={style.title}>{title}</div>
            <div style={style.date}>
              {convertedDate.getDate() +
                "." +
                convertedDate.getMonth() +
                "." +
                convertedDate.getFullYear()}
            </div>
          </div>
          <div className="newsNoteContent">{content}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = { navigate };

export const NewsNoteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsNote);
