import { useContext } from "react"
import { AuthContext } from "../context/Auth.context"
import { useHttp } from "../hooks/http.hook"
import {useHistory} from 'react-router-dom'

export const NewChallenge = () => {
  const { loading, request, error } = useHttp()
  const history = useHistory()
  const auth = useContext(AuthContext)

  const handleNewChallenge = async () => {
    try {
      const data = await request("/api/challenge/newChallenge", "POST", null, {
        Authorization: `Bearer ${auth.token}`
      })
      history.push(`/activeChallenge/${data.data._id}`)
    } catch (e) {
      console.log(e.message)
    }
  }
    return (
        <div className="container">
            <h1>
                <div>NewChallenge page</div>
                <button onClick={handleNewChallenge}>New Challenge</button>
            </h1>
        </div>
    )
}
