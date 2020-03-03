import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import "../styles/FilterList.css";
import iconOk from "../assets/icons/icon-ok.png";
import iconFold from "../assets/icons/icon-fold.png";
import iconExpand from "../assets/icons/icon-expand.png";

class FilterList extends React.Component {
  constructor() {
    super();
    this.trigger = this.trigger.bind(this);
    this.hideTrigger = this.hideTrigger.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onClickAll = this.onClickAll.bind(this);
    this.state = {
      sum: 0,
      max: 4,
      visible: false,
      value: { all: true },
      short: true
    };
  }

  componentDidMount() {
    if (this.props.filters[this.props.name]) {
      this.setState({
        sum: this.props.filters[this.props.name]["all"]
          ? 0
          : Object.keys(this.props.filters[this.props.name])
              .map(element => this.props.filters[this.props.name][element])
              .filter(Boolean).length,
        value: this.props.filters[this.props.name]
      });
    }
  }

  trigger() {
    this.setState({
      visible: !this.state.visible
    });
  }

  hideTrigger() {
    this.setState({
      short: !this.state.short
    });
  }

  onClick(value, update) {
    this.setState(
      {
        sum: this.state.sum + (this.state.value[value] ? -1 : 1),
        value: {
          ...this.state.value,
          all:
            this.state.sum + (this.state.value[value] ? -1 : 1) ? false : true,
          [value]: !this.state.value[value]
        },
        visible: !this.state.visible
      },
      () => update(this.state.value)
    );
  }

  onClickAll() {
    this.setState({
      sum: 0,
      value: {
        all: true
      }
    });
  }

  render() {
    const { t } = this.props;

    const style = {
      icon: {
        height: "22px",
        width: "22px",
        boxSizing: "border-box",
        background: "url(" + iconOk + ")",
        backgroundSize: "contain",
        backgroundPosition: "center",
        border: "2px solid #333",
        borderRadius: "3px",
        float: "left",
        marginRight: "5px"
      },
      noIcon: {
        height: "22px",
        width: "22px",
        boxSizing: "border-box",
        border: "1px solid #222",
        borderRadius: "3px",
        float: "left",
        marginRight: "5px"
      },
      expandIcon: {
        height: "22px",
        width: "22px",
        float: "left",
        backgroundImage: "url(" + iconExpand + ")",
        backgroundSize: "contain",
        backgroundPosition: "center",
        marginRight: "2px"
      },
      foldIcon: {
        height: "22px",
        width: "22px",
        float: "left",
        backgroundImage: "url(" + iconFold + ")",
        backgroundSize: "contain",
        backgroundPosition: "center",
        marginRight: "2px"
      }
    };
    const length = Object.keys(this.props.options).length;
    var wrap = length > this.state.max && length !== this.state.sum;
    var count = this.state.max - this.state.sum;
    const left = length - this.state.sum - (count > 0) * count;
    var seeAll = false;
    if (left === 1) {
      wrap = false;
      seeAll = true;
    }
    const list = Object.keys(this.props.options).map(element => (
      <div
        key={element}
        onClick={this.onClick.bind(null, element, this.props.update)}
        className={
          this.state.value[element]
            ? "filterListElementChosen"
            : "filterListElement"
        }
      >
        <div style={this.state.value[element] ? style.icon : style.noIcon} />
        {this.props.options[element]}
      </div>
    ));
    const shortList = Object.keys(this.props.options).map(
      element =>
        (this.state.value[element] || --count >= 0) && (
          <div
            key={element}
            onClick={this.onClick.bind(null, element, this.props.update)}
            className={
              this.state.value[element]
                ? "filterListElementChosen"
                : "filterListElement"
            }
          >
            <div
              style={this.state.value[element] ? style.icon : style.noIcon}
            />
            {this.props.options[element]}
          </div>
        )
    );

    return (
      <div className="filterListMain">
        <div className="filterListName">{t(this.props.name)}</div>
        <div>
          <div className="filterList">
            {this.state.short && !seeAll ? shortList : list}
            {wrap && (
              <div
                className={"filterListHideTrigger"}
                onClick={this.hideTrigger}
              >
                <div
                  style={this.state.short ? style.expandIcon : style.foldIcon}
                />
                {this.state.short ? t("more") + " (" + left + ")" : t("less")}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    filters: state.filters
  };
};
const mapDispatchToProps = {};

const FilterListRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterList);

export default withTranslation()(FilterListRedux);
