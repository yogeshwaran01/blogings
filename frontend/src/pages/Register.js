import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"


const Register = () => {

    const [userName, setUserName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [errors, setErrors] = useState(false)
    const navigate = useNavigate()

    const submitForm = (e) => {
        setLoading(true)
        e.preventDefault()
        const newUserData = {
            firstName: firstName,
            lastName: "zz",
            email: email,
            password: password,
            confirmPassword: password,
            userName: userName
        }
        axios.post("http://localhost:5001/market-9c3c5/us-central1/api/register", newUserData)
        .then(response => {
            localStorage.setItem('AuthToken', `Bearer ${response.data.token}`)
            localStorage.setItem('isAuth', true)
            setLoading(false)
            navigate("/")
        }) 
        .catch(error => {
            setLoading(false)
            setErrors("Registerisation Failed")
        })
    }

    return (
        <div className="h-screen bg-gradient-to-br from-green-500 to-yellow-600 flex justify-center items-center w-full">
            <form onSubmit={submitForm}>
                <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
                    <div className="space-y-4">
                        <h1 className="text-center text-2xl font-semibold text-gray-600">Register</h1>
                        <div>
                            <label htmlFor="username" className="block mb-1 text-gray-600 font-semibold">Username</label>
                            <input value={userName} onChange={e => setUserName(e.target.value)} type="text" name="username" className="bg-green-50 px-4 py-2 outline-none rounded-md w-full" required />
                        </div>
                        <div>
                            <label htmlFor="firstName" className="block mb-1 text-gray-600 font-semibold">Name</label>
                            <input value={firstName} onChange={e => setFirstName(e.target.value)} type="text" name="firstName" className="bg-green-50 px-4 py-2 outline-none rounded-md w-full" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-1 text-gray-600 font-semibold">Email</label>
                            <input value={email} onChange={e => setEmail(e.target.value)} type="email" name="email" className="bg-green-50 px-4 py-2 outline-none rounded-md w-full" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-1 text-gray-600 font-semibold">Password</label>
                            <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" className="bg-green-50 px-4 py-2 outline-none rounded-md w-full" required />
                        </div>
                    </div>
                    
                    {!isLoading ? <button className="mt-4 w-full bg-gradient-to-br from-green-500 to-yellow-600 text-green-100 py-2 rounded-md text-lg tracking-wide" type="submit">Register</button> : <Spinner />}
                    <p className="text-sm mt-3 text-red-500">{errors}</p>
                    <Link to="/login">
                        <button className="mt-4 w-full bg-gradient-to-br from-green-500 to-yellow-600 text-green-100 py-2 rounded-md text-lg tracking-wide">Already Have Account</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Register
