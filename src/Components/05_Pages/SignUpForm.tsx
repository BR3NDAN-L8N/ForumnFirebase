import React, { ReactElement, useRef } from 'react'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Card, Form, Button, Alert } from 'react-bootstrap'

import { useAuth } from '../../Contexts/AuthContext'

// interface Props {

// }

export default function SignUpForm(): ReactElement {

    const { signUp } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const emailRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)
    const passwordConfirmRef = useRef<HTMLInputElement | null>(null)

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()

        if (passwordRef.current === null || passwordConfirmRef.current === null) {
            return setError("Refs are 'null'")
        }
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords don't match.\nLearn to spell and try again!")
        }
        try {
            setLoading(true)
            setError("")
            await signUp(emailRef.current?.value, passwordRef.current.value)
            history.push('/')
        } catch {
            setError("Failed to create account.")
        }
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">SIGN UP</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email: </Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password: </Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Confirm Password: </Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        {
                            error &&
                            <Alert variant="danger">{error}</Alert>
                        }
                        <Button disabled={loading} type="submit" className="w-100">SIGN UP</Button>
                    </Form>
                </Card.Body>
            </Card >
            <div className="w-100 text-center mt-2">
                Already Have An Account? <Link to="/login">Log In</Link>
            </div>
        </>
    )
}
