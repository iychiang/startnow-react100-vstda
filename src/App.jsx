import React, { Component } from 'react';
import Form from './Form';
import ToDoList from './ToDoList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toDoList: [],
      archive: []
    };

    this.addItem = this.addItem.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleArchive = this.handleArchive.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  addItem(toDo) {
    this.setState({ toDoList: [...this.state.toDoList, toDo] }, () => this.handleSort());
  }

  handleUpdate(index, prevToDo, nextToDo) {
    let newList = [...this.state.toDoList];
    //spread properties of prevToDo while replacing all relevant properties with nextToDo
    const newToDo = {
      ...prevToDo,
      ...nextToDo
    }

    newList.splice(index, 1, newToDo);
    this.setState({ toDoList: newList });
  }

  handleDelete(index) {
    let newList = [...this.state.toDoList];

    newList.splice(index, 1);
    this.setState({ toDoList: newList });
  }

  handleArchive(index) {
    let newList = [...this.state.toDoList];

    var item = newList.splice(index, 1);
    this.setState({ toDoList: newList, archive: [...this.state.archive, item] });
  }

  handleSort() {
    console.log(this.state.toDoList);
    let newList = [...this.state.toDoList];
    newList.sort((a, b) => a.priority - b.priority);

    this.setState({ toDoList: newList }, () => console.log('newList', newList));
  }

  //the more components, the more independent state should be to the component
  //don't change/mutate state in constructor, use setstate cause no rerendering

  render() {
    return (
      <div className='container'>
        <div className='header'>
          <h1><span className='very'>The</span> Simple To-do App</h1>
          <h3><span className='subheader'>Track all the things!</span></h3>
        </div>
        <div className='row'>
          <Form addItem={this.addItem} />
          <ToDoList toDoList={this.state.toDoList}
            handleUpdate={this.handleUpdate}
            handleDelete={this.handleDelete}
            handleArchive={this.handleArchive} />
        </div>
        <div className='row'>
          <div className='footer col-sm-4'>
            <h4>Tasks completed: {this.state.archive.length}</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
