import { useRef } from 'react'
import { useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useAuth } from '../../Contexts/AuthContext'


export default function ForgotPassword() {

    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const emailRef = useRef()

    const handleSubmit = async (event) => {
        event.preventDefault()

        // if (passwordRef.current === null) {
        //     return setError("Refs are 'null'")
        // }
        try {
            setLoading(true)
            setError("")
            await resetPassword(emailRef.current?.value)
            setMessage("Check your email's inbox for further instructions.")
        } catch {
            setError("Failed to reset password.")
        }
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Reset Password</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email: </Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        {
                            error &&
                            <Alert variant="danger">{error}</Alert>
                        }
                        {
                            message &&
                            <Alert variant="success">{message}</Alert>
                        }
                        <Button disabled={loading} type="submit" className="w-100 mt-3">Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/login">Login</Link>
                    </div>
                </Card.Body>
            </Card >
            <div className="w-100 text-center mt-2">
                Need An Account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}
