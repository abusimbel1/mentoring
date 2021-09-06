import { useContext } from "react"
import { AuthContext } from "../context/Auth.context"


export const Logout = () => {
  const auth = useContext(AuthContext)
  const logoutHandler = (e) => {
    e.preventDefault();
    auth.logout();
  }
  return (
    <h1>
      <button onClick={logoutHandler}>Logout</button>
    </h1>
  )
}