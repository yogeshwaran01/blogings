import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Cards from "../components/Cards"
import Spinner from "../components/Spinner"

const Profile = () => {
    const [blogs, setBlogs] = useState([])
    const [userData, setUserData] = useState({})
    const { userName } = useParams()
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetchContents()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchContents = async () => {
        let url = `https://blogings.herokuapp.com/user/${userName}`
        let userRes = await axios.get(url)
        let blogRes = await axios.get(url + '/blogs')
        let user_data = await userRes.data
        let blog_data = await blogRes.data
        setLoading(false)
        setBlogs(blog_data)
        setUserData(user_data)
    }
    return (
        <section className="bg-gradient-to-br from-green-500 to-yellow-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    {isLoading ? <Spinner /> : <><div className="m-1 mr-2 h-12 relative flex justify-center items-center rounded-full">
                        <img src={`https://robohash.org/${userData.userName}`} alt={userData.userName} className="rounded-full w-48" />
                    </div>
                        <div className="pt-28">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{userData.firstName}</h1>
                            <h2 className="text-large text-indigo-500 tracking-widest font-medium title-font mb-1">{userData.userName}</h2>
                            <Cards blogs={blogs} />
                        </div></>}

                </div>
            </div>
        </section>
    )
}

export default Profile
