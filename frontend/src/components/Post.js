import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import gfm from 'remark-gfm'
import Spinner from './Spinner';

const Post = () => {

    const { id } = useParams();
    const [post, setPost] = useState("");
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            const data = await axios.get(`https://blogings.herokuapp.com/blog/${id}`)
            setLoading(false)
            setPost(data.data)
        };
        fetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="py-12 px-4 bg-gradient-to-br from-green-500 to-yellow-600 ">
            <h1 className="text-4xl text-center mb-4 font-semibold font-heading">{post.title}</h1>
            <p className="text-center">
                <span>{post.timestamp}  </span>
                <a className="ml-1 text-indigo-600 hover:underline" href={`/user/${post.userName}`}>{post.userName}</a>
            </p>
            <br />
            <hr />
            <br />
            <div className="prose text-black max-w-3xl mx-auto">
                {isLoading ? <Spinner /> : <></>}
                <ReactMarkdown remarkPlugins={[gfm]}>{post.content}</ReactMarkdown>
            </div>
        </div>
    )
}



export default Post
