import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { ITaskboardProps } from './TaskboardPropsInterface'
import { Task } from '../Task'
import { OptionsPopUp } from './OptionsPopUp'
import { AddTaskForm } from './AddTaskForm'
import { ShowAddTask } from './ShowAddTask'
import { SingleInputModal } from '../Modals/SingleInputModal'
import './style.css'

export const Taskboard = (props: ITaskboardProps) : JSX.Element => {

    useEffect(() => {
        getTasks();
    }, []);
    
    const [tasks, setTasks ] = useState([]);
    const [showOptionPopUp, setShowOptionsPopUp] = useState(false);
    const [showAddTask, setShowAddTask] = useState(false);
    const [showEditTask, setShowEditTask] = useState(false);

    const getTasks = async () : Promise<void> => {
        const url = `http://localhost:4000/tasks/taskboard_id=${props.id}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log(data[0])
        setTasks(data[0]);
    }

    const createTask = async (title: string) : Promise<void> => {
        const url = 'http://localhost:4000/tasks/';
        const request = {
            taskboard_id: props.id,
            title: title
        };

        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        await getTasks();
    }

    const updateTask = async (id: number, title: string, description: string, status: string, isDone: boolean) : Promise<void> => {
        const url  = `http://localhost:4000/tasks/${id}`;
        const request = {
            title: title,
            description: description,
            status: status,
            done: isDone
        };

        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        await getTasks();
    }

    const deleteTask = async (id: number) : Promise<void> => {
        const url = `http://localhost:4000/tasks/${id}`;
        
        await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        await getTasks();
    } 

    const drop = (e: any) : void => {
        e.preventDefault();
        const task_id = e.dataTransfer.getData('task_id');
        const task = document.getElementById(task_id);

        if (task) task.style.display = 'block';

        e.target.appendChild(task);
    }

    const dragOver = (e: any) : void => {
        e.preventDefault();
    }
 
    const showEditTaskModal = () : void => {
        setShowEditTask(!showEditTask);
    }

    const showOptionPopUpModal = () : void => {
        setShowOptionsPopUp(!showOptionPopUp);
    }

    const ShowAddTaskComponent = () : void => {
        setShowAddTask(!showAddTask);
    }

    const onSubmitUpdate = async (name: string) : Promise<void> => {
        props.update(props.id, name);
    }

    const onSubmitDelete = async () : Promise<void> => {
        props.delete(props.id);
    }

    return(
        <div className='taskboard'>
            <div className='taskboard-name'>
                <h4>{props.title}</h4>
                <FontAwesomeIcon style={{cursor: 'pointer'}} onClick={showOptionPopUpModal} icon={faEllipsisH} className='ellipsis-color' />
            </div>
            {
                showOptionPopUp ? <div className='options-popup-container'><OptionsPopUp update={showEditTaskModal} delete={onSubmitDelete} /></div> : null
            }
            <div className='tasks-container' id={props.idName} onDrop={drop} onDragOver={dragOver} >
                {
                    tasks.map((task: any) => {
                        return(
                            <Task taskID={task.taskID} draggable={true} id={task.id} title={task.title} description={task.description} status={task.status} isDone={task.done} Update={updateTask} Delete={deleteTask} />
                        )
                    })
                }
            </div>
            { showAddTask ? <AddTaskForm onSubmit={createTask} close={() => { setShowAddTask(false) }} /> : <ShowAddTask show={ShowAddTaskComponent} /> } 
            <SingleInputModal name='Edit Taskboard' isClose={!showEditTask} onSubmit={onSubmitUpdate} onClose={showEditTaskModal} />
        </div>
    );
}
