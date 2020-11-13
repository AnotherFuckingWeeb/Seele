import React from 'react'
import { IButtonProps } from './ButtonPropsInterface'
import './style.css'


const isDisable = (props: IButtonProps) : string => {
    return props.disabled ? '' : 'disabled'
}

const getColorButton = (props: IButtonProps) : string => {
    return props.color === 'blue' ? 'blue' : 'red';
}

export const ButtonStyleOne = (props: IButtonProps) : JSX.Element => {
    return(
        <button className={`style-one ${isDisable(props)}`} disabled={!props.disabled} onClick={props.onClick}>{props.title}</button>
    );
}

export const ButtonStyleTwo = (props: IButtonProps) : JSX.Element => {
    return(
        <button className={`style-two ${`style-two-${getColorButton(props)}`}`} onClick={props.onClick}>{props.title}</button>
    );
}

export const ButtonStyleThree = (props: IButtonProps) : JSX.Element => {
    return(
        <button className={`style-three ${`style-three-${getColorButton(props)}`}`} onClick={props.onClick}>{props.title}</button>
    );
}
