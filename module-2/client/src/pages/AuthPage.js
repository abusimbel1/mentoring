import { useContext, useState } from "react"
import { AuthContext } from "../context/Auth.context"
import {useHistory} from 'react-router-dom'
import { useHttp } from "../hooks/http.hook"

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const history = useHistory()

    const { loading, request, error } = useHttp()

    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const loginHandler = async () => {
        try {
            const data = await request("/api/auth/login", "POST", {...form})
            await auth.login(data.token, data.userId)
            console.log(auth)
            const isActiveChallenge = await request("/api/challenge/", "GET", null, {
              Authorization: `Bearer ${data.token}`
            })
            if (!!isActiveChallenge) {history.push(`/activeChallenge/${isActiveChallenge.data}`)}
        } catch (e) {
            console.error(e.message)
        }
    }
    return (
        <h1>
            <div className="container">
                AuthPage page
                <input
                    placeholder="email"
                    id="email"
                    type="text"
                    name="email"
                    onChange={changeHandler}
                ></input>
                <input
                    placeholder="password"
                    id="password"
                    type="password"
                    name="password"
                    onChange={changeHandler}
                ></input>
                <button onClick={loginHandler} disabled={loading}>Login</button>
            </div>
        </h1>
    )
}
