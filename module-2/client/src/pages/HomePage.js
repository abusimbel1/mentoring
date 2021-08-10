import { useContext } from "react"
import { AuthContext } from "../context/Auth.context"
import { useHttp } from "../hooks/http.hook"
import { useHistory } from "react-router-dom"

export const HomePage = () => {
    const { loading, request, error } = useHttp()
    const history = useHistory()
    const auth = useContext(AuthContext)

    const handleChallenge = async () => {
        try {
            const data = await request("/api/challenge/", "GET", null, {
                Authorization: `Bearer ${auth.token}`,
            })
            console.log(data)
            history.push(`/activeChallenge/${data.data}`)
        } catch (e) {
            console.log(e.message)
        }
    }
    return (
        <div className="container">
            <h1>Home page</h1>
            <button onClick={handleChallenge}>Active challenge</button>
        </div>
    )
}
