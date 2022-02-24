import axios from "axios"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { Remarkable } from 'remarkable'

const md = new Remarkable()

let authToken = localStorage.getItem('AuthToken')
axios.defaults.headers.common = { Authorization: `${authToken}`}


const Edit = () => {

    const navigate = useNavigate()
    const [title, setTitle] = useState(" ")
    const [text, setText] = useState(" ");
    const { id } = useParams()
    useEffect(() => {
        fetchContents()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchContents = async () => {
        let url = `http://localhost:5001/market-9c3c5/us-central1/api/me/blogs`
        try {
            let blogRes = await axios.get(url)
            let blogs = await blogRes.data
            let required = blogs.filter(b => b.id === id)
            setTitle(required[0].title)
            setText(required[0].content)

        } catch (e) {
            navigate('/login')
        }
        
    }

    const submitForm = (e) => {
        e.preventDefault()
        let url = `http://localhost:5001/market-9c3c5/us-central1/api/blog/${id}`
        axios.put(url, {
            title: title,
            content: text,
            tags: ['python', 'javascript']
        })
        .then(d => {
            navigate('/me')
        })
        .catch(e => {
            navigate('/login')
        })
    }

    return (
        <div className="bg-gradient-to-br from-green-500 to-yellow-600">
            <div className="p-5 md:max-w-4xl md:mx-auto">
                <form onSubmit={submitForm}>
                    <label htmlFor="title" className="mt-5 mb-3 block">Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="bg-white p-5 rounded shadow w-full" name="title" required />
                    <label htmlFor="markdown" className="mt-5 mb-3 block">
                        Content</label>
                    <textarea
                        name="textarea"
                        id="markdown"
                        cols="30"
                        rows="10"
                        required
                        placeholder="Write in some markdown"
                        className="bg-white p-5 rounded shadow w-full"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    ></textarea>
                    <button className="mt-4 w-full bg-gradient-to-br from-green-500 to-pink-600 text-black py-2 rounded-md text-lg tracking-wide">POST</button>
                </form>
                <article>
                    <h3 className="text-center">Preview</h3>
                    <div className="prose" dangerouslySetInnerHTML={{ __html: md.render(text) }}>
                    </div>
                </article>
            </div>
        </div>
    )
}

export default Edit