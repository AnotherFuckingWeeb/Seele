import React from 'react'

export interface IModal {
    isClose: boolean;
    onSubmit?: (title: string) => Promise<void>;
    onClose: (e: any) => void;
}