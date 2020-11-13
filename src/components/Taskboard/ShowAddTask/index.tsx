import React from 'react'
import { IShowAddTaskProps } from './ShowAddTaskPropsInterface'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './style.css'

export const ShowAddTask = (props: IShowAddTaskProps) : JSX.Element => {
    return(
        <div className='show-add-new-task-form-button' onClick={props.show} >  
            <FontAwesomeIcon icon={faPlus} />
            <p>Add New Task</p>
        </div>
    );
}