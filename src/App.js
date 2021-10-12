import {Route, Switch} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import HomeRoute from './components/HomeRoute'
import LoginRoute from './components/LoginRoute'
import JobsRoute from './components/JobsRoute'
import JobDetailsView from './components/JobItemsDetailsRoute'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={HomeRoute} />
    <ProtectedRoute exact path="/jobs" component={JobsRoute} />
    <ProtectedRoute exact path="/jobs/:id" component={JobDetailsView} />
    <Route component={NotFound} />
  </Switch>
)

export default App
