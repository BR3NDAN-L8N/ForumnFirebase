// REACT
import React, { FC } from 'react'
import { Container } from 'react-bootstrap'

// DATABASE
// import {
//     DB_getAllThreads,
//     DB_addNewThread
// } from './DatabaseQueries/Threads'

// CSS
import './App.css';

// Components
// import { Threads } from './Components/03_Organisms/Threads'
import SignUpForm from './Components/03_Organisms/SignUpForm';
import { AuthProvider } from './Contexts/AuthContext';

export const App: FC = () => {


    return (
        <AuthProvider>
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <SignUpForm />
                </div>
            </Container>
        </AuthProvider>
    );
}
