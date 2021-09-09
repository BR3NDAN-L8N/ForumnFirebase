import { useRef } from 'react'
import { useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

import { useAuth } from '../../Contexts/AuthContext'

// interface Props {

// }

export const LoginForm = () => {

    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const emailRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (passwordRef.current === null || emailRef.current === null) {
            return setError("Refs are 'null'")
        }
        try {
            setLoading(true)
            setError("")
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch {
            setError("Failed to log in.")
        }
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email: </Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password: </Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        {
                            error &&
                            <Alert variant="danger">{error}</Alert>
                        }
                        <Button disabled={loading} type="submit" className="w-100">LOG IN</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card >
            <div className="w-100 text-center mt-2">
                Need An Account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}
