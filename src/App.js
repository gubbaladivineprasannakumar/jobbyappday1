import {Route, Switch, Redirect} from 'react-router-dom'

import LoginRoute from './Components/LoginRoute'
import HomeRoute from './Components/HomeRoute'
import JobsRoute from './Components/JobsRoute'
import NotFound from './Components/NotFound'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <Route exact path="/" component={HomeRoute} />
    <Route exact path="/jobs" component={JobsRoute} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
