import React from 'react';
import './TodoListItem.css'
import {Type,Priority,Todo} from './types';

interface TodoListItemProps{
    todoValue: Todo;
    changeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selectType: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    selectPriority: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    submit: (event: React.MouseEvent<HTMLButtonElement>) => void
}
const TodoListItem:React.FC<TodoListItemProps> = ({todoValue,changeInput,selectType,selectPriority,submit}) => {
    return (
        <div className='todoListItem'>
            <form className='todoListItem__form'>
                <input className='todoListItem__formInput' value = {todoValue.text} placeholder='Add New Task...' type="text" onChange={changeInput}/>
                <select className='todoListItem__formSelect' defaultValue='Task Type' onChange={selectType}>
                    <option disabled>Task Type</option>
                    <option value={Type.Personal}>{Type.Personal}</option>
                    <option value={Type.Shopping}>{Type.Shopping}</option>
                    <option value={Type.Work}>{Type.Work}</option>
                    <option value={Type.Others}>{Type.Others}</option>
                </select>
                <select className='todoListItem__formSelect' defaultValue='Priority' onChange={selectPriority}>
                    <option disabled>Priority</option>
                    <option value={Priority.Normal}>{Priority.Normal}</option>
                    <option value={Priority.Important}>{Priority.Important}</option>
                </select>
                <button className='todoListItem__formSubmit' type='submit' onClick={submit}>Add Task</button>
            </form>        
        </div>
    )
}

export default TodoListItem