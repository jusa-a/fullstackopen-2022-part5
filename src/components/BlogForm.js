import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState({})

    const handleChange = (event) => {
        const blogObject = {
            ...newBlog,
            [event.target.name]: event.target.value,
        }
        setNewBlog(blogObject)
    }

    const addNote = (event) => {
        event.preventDefault()
        createBlog(newBlog)
    }

    return (
        <div>
            <h2>Create a new blog</h2>

            <form onSubmit={addNote}>
                <div>
                    title:{' '}
                    <input
                        value={newBlog.title || ''}
                        name='title'
                        onChange={handleChange}
                    />
                </div>
                <div>
                    author:{' '}
                    <input
                        value={newBlog.author || ''}
                        name='author'
                        onChange={handleChange}
                    />
                </div>
                <div>
                    url:{' '}
                    <input
                        value={newBlog.url || ''}
                        name='url'
                        onChange={handleChange}
                    />
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default BlogForm
