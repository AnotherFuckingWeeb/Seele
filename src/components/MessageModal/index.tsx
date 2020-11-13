import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faTimes, faExclamationTriangle, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { IMessageModalProps } from './MessageModalPropsInterface'
import './style.css'

export const MessageModal = (props: IMessageModalProps) : JSX.Element => {

    let ResponseStatus  = () : string => {

        let response;

        switch (props.type) {
            case 'SUCESS':
                response = 'message-modal-response-success';
                break;
        
            case 'WARNING':
                response = 'message-modal-response-warning';
                break;

            case 'ERROR':
                response = 'message-modal-response-error';
                break;
        }

        return response;
    }

    let ResponseIcon = () : IconDefinition => {

        let response;

        switch (props.type) {
            case 'SUCESS':
                response = faEnvelope;
                break;
        
            case 'WARNING':
                response = faExclamationTriangle;
                break;

            case 'ERROR':
                response = faTimes;
                break;
        }

        return response;
    }

    const response = {
        status: ResponseStatus(),
        icon: ResponseIcon()
    };

    return(
        <div className={`message-modal ${response.status}`} /*style={{...Styles.modal, ...response.status}}*/>
            <FontAwesomeIcon icon={response.icon} style={{fontSize: 20, marginRight: 10}} />
            <h4>{props.message}</h4>
        </div>
    );
}
