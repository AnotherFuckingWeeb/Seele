import React, { useState } from 'react'
import { ITaskProps } from './TaskPropsInterface'
import { TaskDetailsModal } from '../Modals/TaskDetailsModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { ButtonStyleTwo } from '../Button'
import './style.css'

export const Task = (props: ITaskProps) : JSX.Element => {

    const dragStart = (e: any) : void => {
        const target = e.target;
        e.dataTransfer.setData('task_id', target.id);
    }

    const dragOver = (e: any) : void => {
        e.stopPropagation();
    }

    let GetStatusColor = () : string => {

        let status = ''

        switch (props.status) {
            case 'TODO':
                status = 'status-todo';
                break;
            case 'DOING':
                status = 'status-doing';
                break;
            case 'REVIEW':
                status = 'status-review';
                break;
            case 'URGENT':
                status = 'status-urgent';
                break;
            case 'DONE':
                status = 'status-done';
                break;
        }

        return status;
    }

    const [showDetails, setShowDetails] = useState(false);

    const onSubmitUpdate = async (title: string, description: string, status: string, isDone: boolean) : Promise<void> => {
        props.Update(props.id, title, description, status, isDone);
    }

    const onComplete = async () : Promise<void> => {
        props.Update(props.id, props.title, props.description as string, props.status, !props.isDone)
    }

    const onSubmitDelete = async () : Promise<void> => {
        props.Delete(props.id);
    }  

    const showDetailsModal = () : void => {
        setShowDetails(!showDetails);
    }

    return(
        <div id={props.taskID} draggable={props.draggable} onDragStart={dragStart} onDragOver={dragOver} className={`task ${props.isDone? 'task-isdone' : null}`}>
            <TaskDetailsModal id={props.id} isClose={!showDetails} onClose={() => { setShowDetails(!showDetails) }} onSubmitTask={onSubmitUpdate} />
            <div className='status-container'>
                <div className={`status ${GetStatusColor()}`}>
                    <p>{props.status}</p>
                </div>
                <FontAwesomeIcon onClick={showDetailsModal} className='details-button' icon={faInfoCircle} />
            </div>
            <div className='task-name'>
                <h5>{props.title}</h5>
            </div>
            <div className='task-buttons-container'>
                <ButtonStyleTwo title='Complete' onClick={onComplete} color='blue' />
                <ButtonStyleTwo title='Delete' onClick={onSubmitDelete} color='red' />
            </div>
        </div>
    );
}