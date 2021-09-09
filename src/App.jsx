// REACT
import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// DATABASE
// import {
//     DB_getAllThreads,
//     DB_addNewThread
// } from './DatabaseQueries/Threads'

// CSS
// import './App.css';

// COMPONENTS
// - templates
import MainTemplate from './Components/04_Templates/Main/Main'
// - pages
import {
    MAIN_PAGES
} from './Components/05_Pages/_index'

import SignUpForm from './Components/05_Pages/SignUpForm';
import {LoginForm} from './Components/05_Pages/LoginForm';
import UpdateProfile from './Components/05_Pages/UpdateProfile'
import { AuthProvider } from './Contexts/AuthContext';
import PrivateRoute from './Components/PrivateRoute';

export const App = () => {

    // const wrapPagesInTemplate = (pages) => {
    //     console.log('pages: ', pages)
    //     let wrappedPages = {}
    //     for (let page in pages) {
    //         console.log('page: ', page)
    //         const newComponent = pages[page]
    //         wrappedPages[page] = () => { return newComponent }
    //     }
    //     console.log('wrappedPages ', wrappedPages)
    //     return wrappedPages
    // }

    // const mainPages = wrapPagesInTemplate(MAIN_PAGES)
    // console.log('mainPages: ', mainPages);

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Router>
                    <AuthProvider>
                        <Switch>
                            <PrivateRoute exact path="/" component={MAIN_PAGES.Dashboard} />
                            <PrivateRoute path="/update-profile" component={UpdateProfile} />
                            <Route path="/signup" component={SignUpForm} />
                            <Route path="/login" component={LoginForm} />
                            <Route path="/forgot-password" component={MAIN_PAGES.ForgotPassword} />
                            <Route exact path="/threads/thread/:id" component={MAIN_PAGES.Thread} />
                            <Route path="/threads" component={MAIN_PAGES.Threads} />
                        </Switch>

                    </AuthProvider>
                </Router>
            </div>
        </Container>
    );
}
