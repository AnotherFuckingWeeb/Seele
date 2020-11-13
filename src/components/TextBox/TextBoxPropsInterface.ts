import React from 'react'

export interface ITextBoxProps {
    value: string;
    type: 'text' | 'email' | 'password' ;
    name: string;
    placeholder: string;
    maxLength: number;
    style?: React.CSSProperties;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown? : (event: React.KeyboardEvent<HTMLInputElement>) => void;
}