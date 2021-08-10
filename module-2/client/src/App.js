import { useRoutes } from "./routes"
import { BrowserRouter } from "react-router-dom"
import "./App.css"
import { useAuth } from "./hooks/auth.hook"
import { AuthContext } from "./context/Auth.context"
import { Logout } from "./pages/Logout"

function App() {
    const { token, login, logout, userId } = useAuth()
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated)
    return (
        <AuthContext.Provider value={{
            token,
            logout,
            login,
            userId,
            isAuthenticated
        }}>
            <BrowserRouter>
                <div className="App">{routes}</div>
            </BrowserRouter>
            {login && <Logout />}
        </AuthContext.Provider>
    )
}

export default App
