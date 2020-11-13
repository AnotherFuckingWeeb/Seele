import React from 'react'
import { ITextBoxProps } from './TextBoxPropsInterface'
import './style.css'

export const TextBox = (props: ITextBoxProps) : JSX.Element => {
    return(
        <input className='input' style={{...props.style}} value={props.value} name={props.name} type={props.type} placeholder={props.placeholder} maxLength={props.maxLength} onChange={props.onChange} onKeyDown={props.onKeyDown} />
    );
}
