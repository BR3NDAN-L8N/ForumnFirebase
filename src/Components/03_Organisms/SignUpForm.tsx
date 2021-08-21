import React, { ReactElement, useRef } from 'react'
import { Card, Form, Button } from 'react-bootstrap'

import { useAuth } from '../../Contexts/AuthContext'

// interface Props {

// }

export default function SignUpForm(): ReactElement {

    const {signUp} = useAuth()

    const emailRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)
    const passwordConfirmRef = useRef<HTMLInputElement | null>(null)

    // const handleSubmit = (event) => {
    //     event.preventDefault()

    //     signUp(emailRef.current?.value, passwordRef.current.value)
    // }

    return (
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">SIGN UP</h2>
                <Form>
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
                    <Button type="submit" className="w-100">SIGN UP</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}
