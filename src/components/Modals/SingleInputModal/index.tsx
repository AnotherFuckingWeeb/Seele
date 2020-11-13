import React, { useState } from 'react'
import Images from '../../../images/images'
import { ButtonStyleOne } from '../../Button'
import { TextBox } from '../../TextBox'
import { ISingleInputModalProps } from './SingleInputModalPropsInterface'
import './style.css'

export const SingleInputModal = (props: ISingleInputModalProps) : JSX.Element | null => {
    
    const [inputText, setInputText] = useState('');

    let onClose = (e: React.MouseEvent<HTMLImageElement>) : void => {
        props.onClose && props.onClose(e);
    }

    let onChangeState = (event: React.ChangeEvent<HTMLInputElement>) : void => {
        
        const { value } = event.target;

        setInputText(value);
    }

    let Submit = async (e: React.MouseEvent<HTMLButtonElement>) : Promise<void> => {
        if (props.onSubmit) await props.onSubmit(inputText);
        setInputText('');
        props.onClose && props.onClose(e);
    }

    if (props.isClose) {
        return null;
    }

    return(
        <div className={props.isClose ? 'close-modal' : 'shadow'}>
            <div className='single-input-modal'>
                <div className='single-input-modal-label'>
                    <h4>{props.name}</h4>
                    <img className='pointer' onClick={onClose} style={{height: '100%'}} src={Images.close} alt=""/>
                </div>
                <div className='modal-input'>
                    <TextBox style={{width: '100%'}} name='inputText' value={inputText} type='text' placeholder='name...' maxLength={15} onChange={onChangeState} />
                </div>
                <div className='modal-button pointer' >
                    <ButtonStyleOne disabled={inputText.length > 0} title={props.name} onClick={Submit} />
                </div>
            </div>
        </div>
    );
}
