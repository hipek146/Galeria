import React from 'react';
import { connect } from "react-redux";
import '../styles/MultipleList.css';
import iconOk from '../assets/icons/icon-ok.png'
import iconFold from '../assets/icons/icon-fold.png'
import iconExpand from '../assets/icons/icon-expand.png'

export class MultipleList extends React.Component {
  constructor() {
    super();
    this.trigger = this.trigger.bind(this);
    this.hideTrigger = this.hideTrigger.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onClickAll = this.onClickAll.bind(this);
    this.state = {sum: 0, visible: false, value:{all: true}, short: true}
  }

  trigger() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  hideTrigger() {
    this.setState({
      short: !this.state.short,
    });
  }

  onClick(value) {
    this.setState({
      sum: this.state.sum + (this.state.value[value] ? 1 : -1),
      value: {
        ...this.state.value,
        all: (this.state.sum + (this.state.value[value] ? 1 : -1)) ? false : true,
        [value] : !this.state.value[value]
      },
      visible: !this.state.visible,
    });
  }

  onClickAll() {
    this.setState({
      sum: 0,
      value: {
        all: true,
      }
    });
  }

  render() {
  //  console.log(this.props)
    const style = {
      list: {
        //display: this.state.visible ? 'block' : 'none',
      },
      icon: {
        height: '24px',
        width: '24px',
        background: 'url('+ iconOk +')',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        float: 'left',
      },
      noIcon: {
        height: '24px',
        width: '24px',
        float: 'left',
      },
      expandIcon: {
        height: '24px',
        width: '24px',
        float: 'left',
        backgroundImage: 'url('+ iconExpand +')',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
      },
      foldIcon: {
        height: '24px',
        width: '24px',
        float: 'left',
        backgroundImage: 'url('+ iconFold +')',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
      }
    }

    const list = Object.keys(this.props.options).map(element =>
      <div key={element} onClick={this.onClick.bind(null, element)} className={this.state.value[element] ? "multipleListElementChosen" : "multipleListElement"}>
          <div style={this.state.value[element] ? style.icon : style.noIcon} />
          {this.props.options[element]}
      </div>
    );
    const shortList = Object.keys(this.props.options).map(element =>
      this.state.value[element] &&
      <div key={element} onClick={this.onClick.bind(null, element)} className={this.state.value[element] ? "multipleListElementChosen" : "multipleListElement"}>
          <div style={this.state.value[element] ? style.icon : style.noIcon} />
          {this.props.options[element]}
      </div>
    );

    return (
      <div className="multipleListMain">
          <div className="multipleListName">
              {this.props.name}
          </div>
          <div style={style.list}>
              <div className="multipleList">
                  <div className={this.state.value['all'] ? "multipleListElementChosen" : "multipleListElement"} onClick={this.onClickAll}>
                      <div style={this.state.value['all'] ? style.icon : style.noIcon} />
                      Wszystkie
                  </div>
                  {this.state.short ? shortList : list}
                  <div className={"multipleListHideTrigger"} onClick={this.hideTrigger}>
                      <div style={this.state.short ? style.expandIcon : style.foldIcon} />
                      {this.state.short ? "Rozwiń" : "Zwiń"}
                  </div>
              </div>
          </div>
      </div>
    );
  }
}
