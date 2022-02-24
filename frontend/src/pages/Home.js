import axios from "axios"
import { useEffect, useState } from "react"
import Cards from "../components/Cards"

const Home = () => {

    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        fetchBlogs()
    }, [])

    const fetchBlogs = async() => {
        let res = await axios.get('http://localhost:5001/market-9c3c5/us-central1/api/blogs')
        let data = await res.data
        setBlogs(data)
    }

    return (
        <Cards blogs={blogs} />
    )
}

export default Home
