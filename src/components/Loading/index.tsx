import React from 'react'
import Loader from 'react-loader-spinner'
import { ILoadingProps } from './LoadingPropsInterface'
import './style.css'

export const Loading = (props: ILoadingProps): JSX.Element => {
    return(
        <div className={props.loading ? 'loading-shadow' : ''}>
            <Loader visible={props.loading} type='TailSpin' color='#3a80de' />
        </div>
    );
}
