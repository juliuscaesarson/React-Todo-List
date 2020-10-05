import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

var apiKey = "7bb18b-b475a9-ca1a2f-812109-55f3c2";
var api = "https://cse204.work/todos";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {todos:[],input:''};
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onChange = this.onChange.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.sortByAlpha = this.sortByAlpha.bind(this);

  }

  onChange(event) {
    this.setState({
      input: event.target.value
    });

  }

  componentDidMount() {
    this.listToDos();

  }

  sortByAlpha() {
    console.log("sorting");
    var todos = this.state.todos;
    console.log(todos[1].text);
    todos = todos.sort(function(a,b) {
      return a.text.localeCompare(b.text);
    });
    this.setState({todos:todos});
    console.log(this.state.todos);
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
        this.addItem();
    }
  }

  addItem() {
    if (this.state.input == null || this.state.input === '') {
      alert("Please type in a ToDo");
    }
    else {
      console.log("adding item");
      // console.log(this.state.todos);
      var deez = this;

      var data = {
        text:this.state.input
      }
      
      var xhttp = new XMLHttpRequest();
      var todos = this.state.todos;

      xhttp.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            var todo = JSON.parse(this.responseText);
            deez.setState({todos:[...todos,todo]});
            deez.setState({input:''});

          } 
          else if (this.readyState === 4) {
            console.log(this.responseText);

          }
      };
      xhttp.open("POST",api,true);

      xhttp.setRequestHeader("Content-type","application/json");
      xhttp.setRequestHeader("x-api-key",apiKey)
      xhttp.send(JSON.stringify(data));

    }
    
  }

  
  removeItem(e) {
    console.log("removing");
    e.preventDefault();
    var deez = this;
    var id = e.target.id;
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const leftovers = deez.state.todos.filter((todo) => {
              if (todo.id !== id) {
                return todo;
              }
            });
            deez.setState({todos:leftovers});
        }
    }

    xhttp.open("DELETE",api + "/" + id, true);
    xhttp.setRequestHeader("x-api-key",apiKey);
    xhttp.send();

    console.log("deleted");

  }

  render() {
    console.log(this.state);
    return (
        <div className="App">
          <div className="container-fluid">
            <div className="row">
              <div className="title">To-Do List</div>
              <div className="sort" onClick={this.sortByAlpha}>Sort by  Alphabetical Order</div>
            </div>
            
          <NewTodo input={this.state.input} onChange={this.onChange} onKeyDown={this.handleKeyDown} onClick={this.addItem}/>
          
          <ul className="list-group" id="ul">
            {this.state.todos.map((todo) =>
              <Todo key={todo.id} id={todo.id} text={todo.text} completed={todo.completed} created={todo.created_at} onClick={this.removeItem}/>
            )}
            
          </ul>
          
        </div>
        </div>
    );
  }

  listToDos() {
    var xhttp = new XMLHttpRequest()
    var todos = [];

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        todos = JSON.parse(this.responseText);
        console.log(todos);
      }
    };

    xhttp.open("GET", api, false);
    xhttp.setRequestHeader("x-api-key", apiKey);
    xhttp.send();
    this.setState({ todos: todos });

    
  }


  
}



export default App;
