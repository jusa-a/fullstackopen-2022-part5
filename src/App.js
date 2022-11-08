import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState({})

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
    }, [blogs])

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

    const addBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()
        blogService
            .create(blogObject)
            .then((returnedBlog) => {
                setBlogs(blogs.concat(returnedBlog))
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

    const handleLike = async (blogObject) => {
        const updatedBlog = await blogService.update(blogObject.id, {
            likes: blogObject.likes + 1,
        })
        setBlogs(
            blogs.map((blog) =>
                blog.id !== blogObject.id ? blog : updatedBlog
            )
        )
    }

    const blogFormRef = useRef()

    const blogView = () => (
        <div>
            <h2>Blogs</h2>

            <div>
                {user.name} logged-in{' '}
                <button onClick={handleLogout}>logout</button>
            </div>
            <Togglable buttonLabel='new blog' ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
            </Togglable>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} handleLike={handleLike} />
            ))}
        </div>
    )

    return (
        <div>
            <Notification notification={notification} />
            {user === null ? (
                <LoginForm
                    username={username}
                    password={password}
                    handleUsernameChange={({ target }) =>
                        setUsername(target.value)
                    }
                    handlePasswordChange={({ target }) =>
                        setPassword(target.value)
                    }
                    handleSubmit={handleLogin}
                />
            ) : (
                blogView()
            )}
        </div>
    )
}

export default App
