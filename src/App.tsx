// REACT
import React, { FC } from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// DATABASE
// import {
//     DB_getAllThreads,
//     DB_addNewThread
// } from './DatabaseQueries/Threads'

// CSS
// import './App.css';

// Components
// import { Threads } from './Components/03_Organisms/Threads'
import SignUpForm from './Components/05_Pages/SignUpForm';
import LoginForm from './Components/05_Pages/LoginForm';
import Dashboard from './Components/05_Pages/Dashboard'
import ForgotPassword from './Components/05_Pages/ForgotPassword'
import UpdateProfile from './Components/05_Pages/UpdateProfile'
import { AuthProvider } from './Contexts/AuthContext';
import PrivateRoute from './Components/PrivateRoute';

export const App: FC = () => {


    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Router>
                    <AuthProvider>
                        <Switch>
                            <PrivateRoute exact path="/" component={Dashboard} />
                            <PrivateRoute path="/update-profile" component={UpdateProfile} />
                            <Route path="/signup" component={SignUpForm} />
                            <Route path="/login" component={LoginForm} />
                            <Route path="/forgot-password" component={ForgotPassword} />
                        </Switch>

                    </AuthProvider>
                </Router>
            </div>
        </Container>
    );
}
