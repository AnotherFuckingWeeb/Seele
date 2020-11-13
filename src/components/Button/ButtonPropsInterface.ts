import React from 'react'

export interface IButtonProps {
    title: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    color ? : 'blue' | 'red';
    disabled? : boolean;
}