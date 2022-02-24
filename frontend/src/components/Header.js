import { useEffect, useState } from "react";

const Header = () => {

    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        setIsAuth(localStorage.getItem('isAuth'))
    }, [])


    return (
        <header className="text-gray-400 bg-blue-900 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a href="/" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                    <span className="ml-3 text-xl">Blogings</span>
                </a>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    {isAuth ? <><a href="/me" className="mr-5 hover:text-white">Profile</a>
                        <a href="/create" className="mr-5 hover:text-white">Create</a>
                        <a onClick={() => {localStorage.clear();}} className="mr-5 hover:text-white" href="/login">Logout</a></> : <><a className="mr-5 hover:text-white" href="/login">Login</a>
                        <a className="mr-5 hover:text-white" href="/register">Register</a></>}
                </nav>
            </div>

        </header>

    )
}
export default Header
