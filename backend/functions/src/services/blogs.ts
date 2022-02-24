import { Blog, BlogBase } from "../interfaces/blog.interface";
import { Request, Response } from "express";
import admin from '../util/admin'

export const getAllBlogs = (_: Request, response: Response) => {
    admin.db
        .collection('blogs')
        .orderBy('timestamp', 'desc')
        .get()
        .then(data => {
            let blogs: { id: string; title: any; content: any; timestamp: any; tags: any; userName: any}[] = []
            data.forEach(doc => {
                blogs.push(
                    {
                        id: doc.id,
                        title: doc.data().title,
                        content: doc.data().content,
                        timestamp: doc.data().timestamp,
                        tags: doc.data().tags,
                        userName: doc.data().userName
                    }
                )
            })
            return response.json(blogs)
        })
        .catch(err => {
            console.error(err)
            return response.status(500).json({ err: 'internal server error' })
        })
}

export const postBlog = (request: Request, response: Response) => {
    const newBlog: BlogBase = {
        title: request.body.title,
        content: request.body.content,
        tags: request.body.tags,
        userName: request.cred.userName,
        timestamp: new Date().toISOString()
    }
    console.log(newBlog)
    admin.db
        .collection('blogs')
        .add(newBlog)
        .then(doc => {
            const resBlog: Blog = { ...newBlog, id: doc.id }
            return response.json(resBlog)
        })
        .catch(err => {
            console.error(err)
            return response.status(500).json({ err: 'internal server error' })
        })
}


export const deleteBlog = (request: Request, response: Response) => {
    const document = admin.db.doc(`/blogs/${request.params.blogId}`)
    document.get()
        .then(doc => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'not found' })
            }
            document.delete()
            return response.json({ message: 'deleted' })
        })
        
        .catch(err => {
            console.error(err)
            return response.status(500).json({ err: 'internal server error' })
        })
}


export const editBlog = (request: Request, response: Response) => {
    let document = admin.db.collection('blogs').doc(`${request.params.blogId}`)
    let updatedBlog = {
        title: request.body.title,
        content: request.body.content,
        tags: request.body.tags,
        timestamp: new Date().toISOString()
    }
    document.update(updatedBlog)
    .then(() => {
        response.json({message: 'updated'})
    })
    .catch(err => {
        console.error(err)
        return response.status(500).json({ err: 'internal server error' })
    })
}


export const getAllBlogOfUser = (request: Request, response: Response) => {
    admin.db
        .collection('blogs')
        .orderBy('timestamp', 'desc')
        .where('userName', '==', request.params.user)
        .get()
        .then(data => {
            let blogs: { id: string; title: any; content: any; timestamp: any; tags: any; userName: any }[] = []
            data.forEach(doc => {
                blogs.push(
                    {
                        id: doc.id,
                        title: doc.data().title,
                        content: doc.data().content,
                        timestamp: doc.data().timestamp,
                        tags: doc.data().tags,
                        userName: doc.data().userName
                    }
                )
            })
            return response.json(blogs)
        })
        .catch(err => {
            console.error(err)
            return response.status(500).json({ err: 'internal server error' })
        })
}


export const getAllBlogOfAuthUser = (request: Request, response: Response) => {
    admin.db
        .collection('blogs')
        .orderBy('timestamp', 'desc')
        .where('userName', '==', request.cred.userName)
        .get()
        .then(data => {
            let blogs: { id: string; title: any; content: any; timestamp: any; tags: any; userName: any}[] = []
            data.forEach(doc => {
                blogs.push(
                    {
                        id: doc.id,
                        title: doc.data().title,
                        content: doc.data().content,
                        timestamp: doc.data().timestamp,
                        tags: doc.data().tags,
                        userName: doc.data().userName
                    }
                )
            })
            return response.json(blogs)
        })
        .catch(err => {
            console.error(err)
            return response.status(500).json({ err: 'internal server error' })
        })
}


export const getBlogbyID = (request: Request, response: Response) => {
    admin.db.collection('blogs').doc(`${request.params.blogId}`).get()
        .then(doc => {
            response.json(doc.data())
        })
}
