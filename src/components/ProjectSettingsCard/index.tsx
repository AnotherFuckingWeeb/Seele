import React from 'react'
import { IProjectSettingsCardProps } from './ProjectSettingsCardPropsInterface'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import './style.css'

export const ProjectSettingsCard = (props: IProjectSettingsCardProps) : JSX.Element => {

    const getProjectData = async () : Promise<void> => {
        await props.GetProjectData(props.id);
    } 

    return(
        <div onClick={getProjectData} className='project-settings-card'>
            <div className='edit-icon'>
                <FontAwesomeIcon icon={faPencilAlt} />
            </div>
            <div className='project-settings-name'>
                <h3>{props.name}</h3>
            </div>
        </div>
    );
}
