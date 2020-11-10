import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Airlines from './airlines'
import Review from './review'
import Reports from './reports'

// A tag de Redirect irá redirecionar qualquer chamada que não foi mapeada nas Routes para a rota especificada.
export default props => (
 <Router>
 <Route path='/airlines' component={Airlines} />
 <Route path='/review' component={Review} />
 <Route path='/reports' component={Reports} />
 </Router>
)