import React, { ReactElement } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../Contexts/AuthContext'

export default function PrivateRoute({ component: Component, ...rest }: any): ReactElement {

    const { currentUser } = useAuth()

    return (
        <Route
            {...rest}
            render={props => {
                return currentUser ?
                    <Component {...props} />
                    :
                    <Redirect to='/login' />
            }}
        >
        </Route>
    )
}
