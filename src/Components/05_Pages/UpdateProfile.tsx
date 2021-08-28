import React, { ReactElement, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Card, Form, Button, Alert } from 'react-bootstrap'

import { useAuth } from '../../Contexts/AuthContext'

// interface Props {

// }

export default function UpdateProfile(): ReactElement {

    const { currentUser, updateEmail, updatePassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const emailRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)
    const passwordConfirmRef = useRef<HTMLInputElement | null>(null)

    const handleSubmit = async (event: React.SyntheticEvent) => {
        console.log('handle submit');
        
        event.preventDefault()

        

        // if (passwordRef.current !== null && passwordConfirmRef.current !== null) {
            if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
                console.log("passwords don't match");
                return setError("Passwords don't match.\nLearn to spell and try again!")
                
            } 
        // }
        // if (passwordRef.current !== null || passwordConfirmRef.current !== null) {
        //     return setError("Passwords don't match.\nLearn to spell and try again!")
        // }

        const promises = []
        setLoading(true)
        setError('')

        if (emailRef.current !== null) {
            if (emailRef.current.value !== currentUser.email) {
                console.log('email entered does not match email in firebase');
                
                promises.push(updateEmail(emailRef.current.value))
            }
        }

        if (passwordRef.current?.value) {
            promises.push(updatePassword(passwordRef.current?.value))
            console.log('passwords match');
        }

        console.log('promises: ', promises);
        
        Promise.all(promises).then(() => {
            history.push('/')
        }).catch(() => {
            setError('Failed to update your information')
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {
                        error &&
                        <Alert variant="danger">{error}</Alert>
                    }
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email: </Form.Label>
                            <Form.Control
                                type="email"
                                ref={emailRef}
                                defaultValue={currentUser.email}
                            />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password: </Form.Label>
                            <Form.Control
                                type="password"
                                ref={passwordRef}
                                placeholder="Leave here blank to keep password unchanged"
                            />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Confirm Password: </Form.Label>
                            <Form.Control
                                type="password"
                                ref={passwordConfirmRef}
                                placeholder="Leave here blank to keep password unchanged"
                            />
                        </Form.Group>
                        <Button disabled={loading} type="submit" className="w-100">UPDATE</Button>
                    </Form>
                </Card.Body>
            </Card >
            <div className="w-100 text-center mt-2">
                <Link to="/">Cancel</Link>
            </div>
        </>
    )
}
