import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faHashtag, faAlignLeft } from '@fortawesome/free-solid-svg-icons'
import { ITaskDetailsProps } from './TaskDetailsPropsInterface'
import { ButtonStyleThree } from '../../Button'
import { Loading } from '../../Loading'
import Images from '../../../images/images'
import './style.css'

export const TaskDetailsModal = (props: ITaskDetailsProps) : JSX.Element | null => {

    useEffect(() => {
        getTaskData();
    }, []);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState({ name: '', class: '' });

    const statusButtons = [
        {
            class: 'status status-todo',
            name: 'TODO',
            onClick: (event: React.MouseEvent<HTMLDivElement>) => ChangeStatus('TODO')
        },
        {
            class: 'status status-doing',
            name: 'DOING',
            onClick: (event: React.MouseEvent<HTMLDivElement>) => ChangeStatus('DOING')
        },
        {
            class: 'status status-review',
            name: 'REVIEW',
            onClick: (event: React.MouseEvent<HTMLDivElement>) => ChangeStatus('REVIEW')
        },
        {
            class: 'status status-urgent',
            name: 'URGENT',
            onClick: (event: React.MouseEvent<HTMLDivElement>) => ChangeStatus('URGENT')
        },
        {
            class: 'status status-done',
            name: 'DONE',
            onClick: (event: React.MouseEvent<HTMLDivElement>) => ChangeStatus('DONE')
        },
    ];

    const onSubmitUpdateTask = async (event: React.MouseEvent<HTMLButtonElement>) : Promise<void> => {
        if (props.onSubmitTask) await props.onSubmitTask(title, description, status.name, false)
        getTaskData();
        props.onClose && props.onClose(event);
    }

    const getTaskData = async () : Promise<void> => {
        const url = `http://localhost:4000/tasks/${props.id}`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        const taskData = data[0][0];

        setTitle(taskData.title);
        setDescription(taskData.description);
        setStatus({ name: taskData.status, class: ChangeStatus(taskData.status as any) });

    }

    const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) : void => {
        const { value } = event.target;

        setTitle(value);
    }

    const onChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) : void => {
        const { value } = event.target;

        setDescription(value);
    }

    const onClose = (e: any) : void => {
        getTaskData();
        props.onClose && props.onClose(e);
    }

    const ChangeStatus = (type: 'TODO' | 'DOING' | 'REVIEW' | 'URGENT' | 'DONE') : string => {

        let style;

        switch (type) {
            case 'TODO':
                style = 'status-todo';
                setStatus({name: 'TODO', class: style});
                break;
            case 'DOING':
                style = 'status-doing';
                setStatus({name: 'DOING', class: style});
                break;
            case 'REVIEW':
                style = 'status-review';
                setStatus({name: 'REVIEW', class: style});
                break;
            case 'URGENT':
                style = 'status-urgent';
                setStatus({name: 'URGENT', class: style});
                break;
            case 'DONE':
                style = 'status-done';
                setStatus({name: 'DONE', class: style});
                break;
        }   

        return style;
    }

    if (props.isClose) {
        return null;
    }
    
    return(
        <div className='shadow'>
            <div className='task-detail-modal'>
                <div className='task-detail-modal-title-and-close'>
                    <div className='task-detail-modal-title-container' >
                        <FontAwesomeIcon icon={faTasks} />
                        <input className='input-task-title' value={title} type="text" name="title" id="" onChange={onChangeTitle} />
                    </div>
                    <img onClick={onClose} className='close-image' src={Images.close} alt=""/>
                </div>
                <div className='task-status-title' >
                    <FontAwesomeIcon icon={faHashtag} />
                    <h3>Status</h3>
                    <div className={`status ${status.class}`}>
                        <p>{status.name}</p>
                    </div>
                </div>
                <div className='status-list-container'>
                    <div className='status-list'>
                        {
                            statusButtons.map((status) => {
                                return(
                                    <div className={status.class} onClick={status.onClick}>
                                        <p>{status.name}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='task-description-title'>
                    <FontAwesomeIcon icon={faAlignLeft} />
                    <h3 className='description-title' >Description</h3>
                </div>
                <div className='description-container'>
                    <textarea className='input-task-description' spellCheck='false' value={description} name='description' onChange={onChangeDescription} />
                </div>
                <ButtonStyleThree title='Save Changes' onClick={onSubmitUpdateTask} color='blue' />
            </div>
        </div>
    );
}