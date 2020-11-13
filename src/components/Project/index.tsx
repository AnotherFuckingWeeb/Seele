import React from 'react'
import { Link } from 'react-router-dom'
import { IProjectProps } from './ProjectPropsInterface'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import Images from '../../images/images'
import './style.css'

export const Project = (props: IProjectProps) : JSX.Element => {

    return(
        <div className='project-card'>
            <div className='project-data'>
                <h4>{props.title}</h4>
                <span className='datetime'>
                    <FontAwesomeIcon icon={faClock} style={{ marginRight: 5 }} />
                    {props.date}
                </span>
            </div>
            <div className='project-placeholder'>
                <img src={Images.taskPlaceholder} alt="" />
            </div>
            <div className='project-link'>
                <Link className='link' to={`/board/${props.id}`}>Go to project</Link>
            </div>
        </div>
    );
}
