import React, { Component } from 'react';
import './Todo.css';

var apiKey = "7bb18b-b475a9-ca1a2f-812109-55f3c2";
var api = "https://cse204.work/todos";

class Todo extends Component {
  constructor(props){
    super(props);
    this.state = {todos:[],completed:this.props.completed};
    this.checkItem = this.checkItem.bind(this);

  }

  checkItem(e) {
    var deez = this;
    console.log("checking item");
    var api_id = this.props.id;
    var checked = this.state.completed;
    
    if (checked) {
      var data = {completed:false}
    }
    else {
      // eslint-disable-next-line
      var data = {completed:true}
    }

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          var todo = JSON.parse(this.responseText);
          console.log(todo.completed);
          deez.setState({completed:todo.completed});
        }
    
    };

    xhttp.open("PUT",api + "/" + api_id,true);

    xhttp.setRequestHeader("Content-type","application/json");
    xhttp.setRequestHeader("x-api-key",apiKey);
    xhttp.send(JSON.stringify(data));

    console.log("checked")
  }

  render() {
    var checked;
    if (this.state.completed) {
      checked = "list-group-item list-group-item-action active";
    }
    else {
      checked = "list-group-item list-group-item-action";
    }
    // console.log(this);

    return (
      <li className={checked} onClick={this.checkItem} id={this.props.id}>
        {this.props.text}
        <div className='removeButton' id={this.props.id}>
          <i className='fa fa-trash' onClick={this.props.onClick} id={this.props.id}></i>
        </div>
      </li>
    );
  }

  

}

export default Todo;
