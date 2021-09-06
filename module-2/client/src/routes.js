import {Route, Switch, Redirect} from 'react-router-dom'
import { ActiveChallenge } from './pages/ActiveChallengePage'
import { Archive } from './pages/ArchivePage'
import { AuthPage } from './pages/AuthPage'
import { ChallengeResult } from './pages/ChallengeResultPage'
import { HomePage } from './pages/HomePage'
import { NewChallenge } from './pages/NewChallengePage'

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/newChallenge" exact>
          <NewChallenge />
        </Route>
        <Route path="/archiveChallenge/:id" >
          <Archive />
        </Route>
        <Route path="/result/:id" >
          <ChallengeResult />
        </Route>
        <Route path="/activeChallenge/:id">
          <ActiveChallenge />
        </Route>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Redirect to="/"/>
      </Switch>
    )
  }
  return (
    <Switch>
      <Route path="/login" exact>
          <AuthPage />
      </Route>
        <Redirect to="/login"/>
    </Switch>
  )
}