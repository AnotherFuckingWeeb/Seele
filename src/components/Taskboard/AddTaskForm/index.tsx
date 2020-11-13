import React, { useState } from 'react'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { IAddTaskFormProps } from './AddTaskFormPropsInterface'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.css'

export const AddTaskForm = (props: IAddTaskFormProps) : JSX.Element => {

    const [inputText, setInputText] = useState('');

    const onChangeState = (event: React.ChangeEvent<HTMLInputElement>) : void => {
        const { value } = event.target;
        setInputText(value);
    }

    const Submit = (e: any) : void => {
        props.onSubmit(inputText);
        props.close();
    }

    return (
        <div className='add-task-form'>
            <input className='add-task-form-input' onChange={onChangeState} />
            <div className='add-task-form-buttons-container'>
                <button className='add-new-task-button' onClick={Submit}>Add Task</button>
                <FontAwesomeIcon className='pointer' onClick={props.close} icon={faTimes} />
            </div>
        </div>
    );
}
