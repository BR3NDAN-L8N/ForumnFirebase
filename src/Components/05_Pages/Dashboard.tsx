// REACT
import React, { ReactElement, useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

// HOOKS
import { useAuth } from '../../Contexts/AuthContext'

// COMPONENTS
import Main from '../04_Templates/Main/Main'


export default function Dashboard(): ReactElement {

    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    const handleLogout = async () => {
        setError('')

        try {
            await logout()
            history.push('/login')
        } catch {
            setError('Failed To Log Out')
        }
    }
    return (
        <Main
            mainContent={
                <>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Profile</h2>
                            {
                                error &&
                                <Alert variant="danger">{error}</Alert>
                            }
                            <strong>Email: </strong>{currentUser.email}
                            <Link
                                to="/update-profile"
                                className="btn btn-primary w-100 mt-3"
                            >Update Profile</Link>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        <Button
                            variant="link"
                            onClick={handleLogout}
                        >
                            Log Out
                        </Button>
                    </div>
                </>}
        >

        </Main>
    )
}
