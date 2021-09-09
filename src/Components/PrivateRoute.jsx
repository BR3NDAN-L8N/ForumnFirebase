import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../Contexts/AuthContext'

export default function PrivateRoute({ component: Component, ...rest }) {

    const { currentUser } = useAuth()

    if (currentUser === undefined || currentUser === null || !currentUser) {
        return (<Redirect to='/login' />)
    }

    // const Component = () => {
    //     return (component)
    // }

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
