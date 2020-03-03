import React from 'react';
import { connect } from "react-redux";
import '../styles/List.css';

export class List extends React.Component {
  constructor() {
    super();
    this.trigger = this.trigger.bind(this);
    this.onClick = this.onClick.bind(this);
    this.state = {visible: false, value: 'all'}
  }

  trigger() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  onClick(value) {
    this.setState({
      value: value,
      visible: !this.state.visible,
    });
  }

  render() {
    const style = {
      list: {
        display: this.state.visible ? 'block' : 'none',
      }
    }

    const list = Object.keys(this.props.options).map(element =>
      <div key={element} onClick={this.onClick.bind(null, element)} className="listElement">{this.props.options[element]}</div>
    );

    return (
      <div className="listMain">
          <div className="listName">
              {this.props.name}
          </div>
          <div className={this.state.visible ? "listValueVisible" : "listValue"} onClick={this.trigger}>
              {this.props.options[this.state.value]}
          </div>
          <div style={style.list}>
              <div className="list">
                  {list}
              </div>
          </div>
      </div>
    );
  }
}
