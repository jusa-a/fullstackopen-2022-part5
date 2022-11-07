import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [newBlog, setNewBlog] = useState({})
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState({})

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username,
                password,
            })

            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setNotification({
                message: exception.response.data.error,
                type: 'error',
            })
            setTimeout(() => {
                setNotification({})
            }, 3000)
        }
    }

    const handleLogout = async () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
        blogService.setToken('')
    }

    const addBlog = (event) => {
        event.preventDefault()

        blogService
            .create(newBlog)
            .then((returnedBlog) => {
                setBlogs(blogs.concat(returnedBlog))
                setNewBlog({})
                setNotification({
                    message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
                })
                setTimeout(() => {
                    setNotification({})
                }, 3000)
            })
            .catch((error) => {
                setNotification({
                    message: error.response.data.error,
                    type: 'error',
                })
                setTimeout(() => {
                    setNotification({})
                }, 3000)
            })
    }

    const handleBlogChange = (event) => {
        const blogObject = {
            ...newBlog,
            [event.target.name]: event.target.value,
        }
        setNewBlog(blogObject)
    }

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <h2>log in to application</h2>
            <div>
                username{' '}
                <input
                    type='text'
                    value={username}
                    name='Username'
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password{' '}
                <input
                    type='password'
                    value={password}
                    name='Password'
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type='submit'>login</button>
        </form>
    )

    const blogForm = () => (
        <form onSubmit={addBlog}>
            <h2>create new</h2>
            <div>
                title{' '}
                <input
                    value={newBlog.title || ''}
                    name='title'
                    onChange={handleBlogChange}
                />
            </div>
            <div>
                author{' '}
                <input
                    value={newBlog.author || ''}
                    name='author'
                    onChange={handleBlogChange}
                />
            </div>
            <div>
                url{' '}
                <input
                    value={newBlog.url || ''}
                    name='url'
                    onChange={handleBlogChange}
                />
            </div>
            <button type='submit'>create</button>
        </form>
    )

    const blogView = () => (
        <div>
            <h2>blogs</h2>
            <div>
                {user.name} logged-in{' '}
                <button onClick={handleLogout}>logout</button>
            </div>
            {blogForm()}
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    )

    return (
        <div>
            <Notification notification={notification} />
            {user === null ? loginForm() : blogView()}
        </div>
    )
}

export default App
