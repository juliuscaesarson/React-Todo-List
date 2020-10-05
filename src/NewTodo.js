import React, { Component } from 'react';
import './NewTodo.css';


class NewTodo extends Component {

  render() {
    return (
      <div className="row">
        <input type="text" id="add-item" placeholder="Add To-do" value={this.props.input} onChange={this.props.onChange} onKeyDown={this.props.onKeyDown}></input>
        <i className="far fa-plus-circle fa-clickable" id="add-item-button" onClick={this.props.onClick}></i>
      </div>
    );
  }
}

export default NewTodo;
