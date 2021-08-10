import { useContext } from "react"
import { AuthContext } from "../context/Auth.context"
import { useHttp } from "../hooks/http.hook"
import {useHistory, useParams} from 'react-router-dom'


export const ActiveChallenge = () => {
  const { loading, request, error } = useHttp()
  const idFromURL = useParams().id
  const history = useHistory()
  const auth = useContext(AuthContext)
  const redirectToArchiveHandler = () => {
    history.push(`/archiveChallenge/${idFromURL}`)
  }
  return (
    <h1>
      <div>ActiveChallenge page</div>
      //Active challenfe info
      <button onClick={redirectToArchiveHandler}>Archive</button>
    </h1>
  )
}