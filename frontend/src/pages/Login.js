import { useState } from "react"
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../components/Spinner";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");
    const [isLoading, setLoading] = useState(false)
    let navigate = useNavigate()

    const submitForm = (e) => {
        setLoading(true)
        e.preventDefault()
        if (!email && !password) {
            setErrors("Don't Submit empty form")
            setLoading(false)
            return
        }

        axios.post("http://localhost:5001/market-9c3c5/us-central1/api/login", {
            email: email,
            password: password
        })
            .then(response => {
                localStorage.setItem('AuthToken', `Bearer ${response.data.token}`)
                localStorage.setItem('isAuth', true)
                setLoading(false)
                navigate("/me")
            })
            .catch(error => {
                console.log(error)
                setErrors("Login Failed")
                setLoading(false)
            })

    }

    return (
        <div className="h-screen bg-gradient-to-br from-green-500 to-yellow-600 flex justify-center items-center w-full">
            <form onSubmit={submitForm}>
                <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
                    <div className="space-y-4">
                        <h1 className="text-center text-2xl font-semibold text-gray-600">Login</h1>
                        <div>
                            <label htmlFor="email" className="block mb-1 text-gray-600 font-semibold">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-green-50 px-4 py-2 outline-none rounded-md w-full" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-1 text-gray-600 font-semibold">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-green-50 px-4 py-2 outline-none rounded-md w-full" required />
                        </div>
                    </div>
                    {!isLoading ? <button type="submit" className="mt-4 w-full bg-gradient-to-br from-green-500 to-yellow-600 text-green-100 py-2 rounded-md text-lg tracking-wide">Login</button> : <Spinner />}
                    <p className="text-sm mt-3 text-red-500">{errors}</p>
                    <Link to="/register">
                        <button className="mt-4 w-full bg-gradient-to-br from-green-500 to-yellow-600 text-green-100 py-2 rounded-md text-lg tracking-wide" onClick={(e) => navigate('/register')}>New User</button>
                    </Link>
                </div>
            </form>

        </div>
    )
}

export default Login
