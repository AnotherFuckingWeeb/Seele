import React from 'react'
import Home from './views/Home'
import Login from './views/Login'
import SignUp from './views/SignUp'
import Projects from './views/Projects'
import Board from './views/Board'
import ProfileSettings from './views/ProfileSettings'
import ProjectSettings from './views/ProjectSettings'
import ForgotPassword from './views/ForgotPassword'
import NotFoundPage from './views/NotFoundPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

export const App = () => {

    return(
        <Router>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={SignUp} />
                <Route exact path='/forgotpassword' component={ForgotPassword} />
                <ProtectedRoute exact path="/projects" component={Projects} />
                <ProtectedRoute exact path="/board/:projectID" component={Board as any} />
                <ProtectedRoute exact path="/profile" component={ProfileSettings} />
                <ProtectedRoute exact path="/projectsettings" component={ProjectSettings} />
                <Route component={NotFoundPage} />
            </Switch>
        </Router>
    )
}