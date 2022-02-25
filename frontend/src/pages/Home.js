import axios from "axios"
import { useEffect, useState } from "react"
import Cards from "../components/Cards"
import Spinner from "../components/Spinner"

const Home = () => {

    const [blogs, setBlogs] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetchBlogs()
    }, [])

    const fetchBlogs = async () => {
        let res = await axios.get('https://blogings.herokuapp.com/blogs')
        let data = await res.data
        setLoading(false)
        setBlogs(data)
    }

    return (

        <>{isLoading ? <Spinner /> : <Cards blogs={blogs} />}</>
    )
}

export default Home
