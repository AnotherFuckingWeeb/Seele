import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { User } from '../../utils/user'
import { IProtectedRouteProps } from './ProtectedRoutePropsInterface'

export const ProtectedRoute = (props: IProtectedRouteProps) : JSX.Element => {
    const user = new User();
    const condition = user.Id !== undefined

    return(
        condition ? (<Route path={props.path} exact={props.exact} component={props.component} />) : (<Redirect to="/login" />)
    )
}