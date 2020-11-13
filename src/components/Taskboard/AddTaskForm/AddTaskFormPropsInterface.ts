import React from 'react'

export interface IAddTaskFormProps {
    close: () => void;
    onSubmit: (e: any) => void;
}