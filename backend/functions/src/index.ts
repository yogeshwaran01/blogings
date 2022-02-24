// import * as functions from "firebase-functions";
import * as express from 'express'
import * as cors from 'cors'
import * as dotenv from 'dotenv'
import * as blogRoutes from "./services/blogs";
import * as UserRoutes from "./services/users"
import auth from './util/auth'


dotenv.config()

const app = express()

app.use(express.json())
app.use(cors({origin: true}))

app.get('/blogs', blogRoutes.getAllBlogs)

app.post('/blog', auth, blogRoutes.postBlog)
app.delete('/blog/:blogId', auth, blogRoutes.deleteBlog)
app.put('/blog/:blogId', auth, blogRoutes.editBlog)


app.post('/login', UserRoutes.loginUser)
app.post('/register', UserRoutes.registerUser)

app.get('/user/:user', UserRoutes.getUserDetails)
app.get('/user/:user/blogs', blogRoutes.getAllBlogOfUser)

app.get('/me', auth, UserRoutes.getCurrenUserDetails)
app.get('/me/blogs', auth, blogRoutes.getAllBlogOfAuthUser)

app.get('/blog/:blogId', blogRoutes.getBlogbyID)

// export const api = functions.https.onRequest(app)

const PORT = 8000

app.listen(PORT, () => {
    
})

export default app
