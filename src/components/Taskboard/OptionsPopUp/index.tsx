import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { IOptionsPopUpProps } from './OptionsPopUpPropsInterface'
import './style.css'

export const OptionsPopUp = (props: IOptionsPopUpProps) : JSX.Element => {

    return(
        <div className='option-popup-modal' >
            <div className='option update' onClick={props.update}>
                <FontAwesomeIcon icon={faEdit} /> 
                <h5>Update</h5>
            </div>
            <div className='option delete' onClick={props.delete}>
                <FontAwesomeIcon icon={faTrash} /> 
                <h5>Delete</h5>
            </div>
        </div>
    );
}
 