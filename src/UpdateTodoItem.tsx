import React from 'react'
import {Type,Priority,Todo} from './types';
import './UpdateTodoItem.css'

interface TodoListItemProps{
    toBeUpdatedTodo: Todo;
    updateInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    updateType: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    updatePriority: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    updateTask: (event: React.MouseEvent<HTMLButtonElement>) => void
}
const UpdateTodoItem:React.FC<TodoListItemProps> = ({toBeUpdatedTodo,updateInput,updateType,updatePriority,updateTask}) => {
    return (
        <div className='updateTodoListItem'>
            <form className='updateTodoListItem__form'>
                <input className='updateTodoListItem__formInput' value = {toBeUpdatedTodo.text} placeholder='Update Task' type="text" onChange={updateInput}/>
                <select className='updateTodoListItem__formSelect' defaultValue='Type of Task' value={toBeUpdatedTodo.todoType} onChange={updateType} >
                    <option disabled>{toBeUpdatedTodo.todoType}</option>
                    <option value={Type.Personal}>{Type.Personal}</option>
                    <option value={Type.Shopping}>{Type.Shopping}</option>
                    <option value={Type.Work}>{Type.Work}</option>
                    <option value={Type.Others}>{Type.Others}</option>
                </select>
                <select className='updateTodoListItem__formSelect' defaultValue='Priority' value={toBeUpdatedTodo.priority} onChange={updatePriority}>
                    <option disabled>{toBeUpdatedTodo.priority}</option>
                    <option value={Priority.Normal}>{Priority.Normal}</option>
                    <option value={Priority.Important}>{Priority.Important}</option>
                </select>
                <button className='updateTodoListItem__formSubmit' type='submit' onClick={updateTask}>Update Task</button>
            </form>
        </div>
    )
}

export default UpdateTodoItem