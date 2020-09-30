import React from 'react';
import TodoListItem from './TodoListItem';
import UpdateTodoItem from './UpdateTodoItem';
import Filter from './Filter';
import './App.css';
import {Type,Priority,Todo} from './types';

type MyState = {
  todos: Array<Todo>,
  todoValue: Todo,
  select: string,
  isUpdate: boolean,
  toBeUpdatedTodo: Todo,
  toBeUpdatedTodoRecord: Todo
}

class App extends React.Component<any,MyState> {
  constructor(props:any){
    super(props)
    this.state = {
      todos:[],
      todoValue:{
        text:'',
        todoType: Type.Personal,
        priority: Priority.Normal,
        complete: false
      },
      select:'None',
      isUpdate: false,
      toBeUpdatedTodo:{
        text:'',
        todoType: '',
        priority: '',
        complete: false
      },
      toBeUpdatedTodoRecord:{
        text:'',
        todoType: '',
        priority: '',
        complete: false
      }
    };
  }

  componentDidMount() {
    console.log(window.localStorage.getItem('todolist'))
    if(window.localStorage.getItem('todolist')!== null){
      console.log('hi')
      const todosList = JSON.parse(localStorage.getItem('todolist') || '{}');
      this.setState({todos:{...todosList}});
    }
  }
  
  changeInput = (event:React.ChangeEvent<HTMLInputElement>) :void => {
    const {todoValue} = this.state;
    this.setState({ todoValue:{...todoValue,text : event.target.value }});
  }

  updateInput = (event:React.ChangeEvent<HTMLInputElement>) :void => {
    const {toBeUpdatedTodo} = this.state;
    this.setState({ toBeUpdatedTodo:{...toBeUpdatedTodo,text : event.target.value }});
  }


  selectType = (event: React.ChangeEvent<HTMLSelectElement>) :void => {
    const {todoValue} = this.state;
    this.setState({ todoValue:{...todoValue,todoType : event.target.value }});
  }
  
  updateType = (event: React.ChangeEvent<HTMLSelectElement>) :void => {
    const {toBeUpdatedTodo} = this.state;
    this.setState({ toBeUpdatedTodo:{...toBeUpdatedTodo,todoType : event.target.value }});
  }

  selectPriority = (event:React.ChangeEvent<HTMLSelectElement>) :void => {
    const {todoValue} = this.state;
    this.setState({ todoValue:{...todoValue,priority : event.target.value }});
  }

  updatePriority = (event:React.ChangeEvent<HTMLSelectElement>) :void => {
    const {toBeUpdatedTodo} = this.state;
    this.setState({ toBeUpdatedTodo:{...toBeUpdatedTodo,priority : event.target.value }});
  }
 
  submit = (event: React.FormEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    const todo : Todo = this.state.todoValue;
    const {todos,todoValue}= this.state;
    this.setState({
        todos:[...todos,todo],
        todoValue:{
          ...todoValue,
          text:'',
          complete: false
        },
        select:'None'
      })
    window.localStorage.setItem('todosList', JSON.stringify(this.state.todos));
  }

  filterNone = (event: React.MouseEvent<HTMLButtonElement>): void => {
    this.setState({select:'None'})
  }

  filterPersonal = (event: React.MouseEvent<HTMLButtonElement>): void => {
    this.setState({select:'Personal'})
  }

  filterWork = (event: React.MouseEvent<HTMLButtonElement>): void => {
    this.setState({select:'Work'})
  }

  filterShopping = (event: React.MouseEvent<HTMLButtonElement>): void => {
    this.setState({select:'Shopping'})
  }

  filterOthers = (event: React.MouseEvent<HTMLButtonElement>): void => {
    this.setState({select:'Others'})
  }

  removeTodo(todo:Todo){
    this.setState({
        todos: this.state.todos.filter(el => el !== todo)
    })
    window.localStorage.setItem('todosList', JSON.stringify(this.state.todos));
  }

  toggleCheck = (selectedTodo: Todo) => {
    const newTodos = this.state.todos.map(todo => {
      if(todo === selectedTodo){
        return{
          ...todo,
          complete:!todo.complete
        };
      }
      return todo;
    })
    this.setState({todos:newTodos})
    window.localStorage.setItem('todosList', JSON.stringify(newTodos));
  }

  openInput = (selectedTodo: Todo):void => {
    console.log(selectedTodo)
    this.setState({
      toBeUpdatedTodo:{...selectedTodo},
      toBeUpdatedTodoRecord:{...selectedTodo},
      isUpdate:true})
  }

  updateTask = (selectedTodo: Todo) => {
    const newTodos = this.state.todos.map(todo => {
      if(todo === selectedTodo){
        return this.state.toBeUpdatedTodo;
      }
      return todo;
    })
    this.setState({
      todos:newTodos,
      toBeUpdatedTodo:{
        text:'',
        todoType: '',
        priority: '',
        complete: false
      },
      toBeUpdatedTodoRecord:{
        text:'',
        todoType: '',
        priority: '',
        complete: false
      },
      isUpdate:false
    })
    window.localStorage.setItem('todosList', JSON.stringify(newTodos));
  }

  render() {
    let list:Array<Todo>= this.state.todos;
    if(this.state.select==='None'){
      list = this.state.todos
    }
    else if(this.state.select==='Personal'){
      list = this.state.todos.filter(todo => todo.todoType==='Personal')
    }
    else if(this.state.select==='Work'){
      list = this.state.todos.filter(todo => todo.todoType==='Work')
    }
    else if(this.state.select==='Shopping'){
      list = this.state.todos.filter(todo => todo.todoType==='Shopping')
    }
    else if(this.state.select==='Others'){
      list = this.state.todos.filter(todo => todo.todoType==='Others')
    } 

    return (
      <div className = 'app'>        
        <Filter filterNone={this.filterNone} filterPersonal={this.filterPersonal} filterWork={this.filterWork} filterShopping={this.filterShopping} filterOthers={this.filterOthers}/>
        <TodoListItem todoValue={this.state.todoValue} changeInput={this.changeInput} selectType={this.selectType} selectPriority={this.selectPriority} submit={this.submit}/>
        {
            list.map((todo) =>(
            <div className='taskDiv' key={todo.text+todo.todoType}>
              {JSON.stringify(this.state.toBeUpdatedTodoRecord)=== JSON.stringify(todo)?
                !this.state.isUpdate?
                  <div className='task'>
                    <input className='task__checkbox' type="checkbox" checked={todo.complete} onChange={() => {this.toggleCheck(todo)}}/>
                    <span className='task__info'>{todo.text+"   "}</span>
                    <span className='task__type'>{todo.todoType+"   "}</span>
                    <span className='task__priority'>{todo.priority}</span>
                    <button className='task__delete' onClick={() => { this.removeTodo(todo)}}>Delete</button>
                    <button className='task__update' onClick={(e) => {this.openInput(todo)}}>Update</button>
                  </div>:
                  <UpdateTodoItem toBeUpdatedTodo={this.state.toBeUpdatedTodo} updateInput={this.updateInput} updateType={this.updateType} updatePriority={this.updatePriority} updateTask={() => {this.updateTask(todo)}}/>
                :
                <div className='task'>
                  <input className='task__checkbox' type="checkbox" checked={todo.complete} onChange={() => {this.toggleCheck(todo)}}/>
                  <span className='task__info'>{todo.text+"   "}</span>
                  <span className='task__type'>{todo.todoType+"   "}</span>
                  <span className='task__priority'>{todo.priority}</span>
                  <button className='task__delete' onClick={() => { this.removeTodo(todo)}}>Delete</button>
                  <button className='task__update' onClick={(e) => {this.openInput(todo)}}>Update</button>
                </div>
              }
            </div>
            )
          )
        }
      </div>
    );
  }
}

export default App