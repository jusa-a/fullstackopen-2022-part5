import { useState } from 'react'

const Blog = ({ blog, user, handleLike, deleteBlog }) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    const removeButton = () => (
        <button onClick={() => deleteBlog(blog)}>remove</button>
    )

    return (
        <div style={blogStyle} className='blogDiv'>
            <div>
                {blog.title} {blog.author}{' '}
                <button onClick={toggleVisibility}>
                    {visible ? 'hide' : 'view'}
                </button>
            </div>
            <div
                style={{ display: visible ? '' : 'none' }}
                className='togglableContent'
            >
                <div>{blog.url}</div>
                <div>
                    {blog.likes}{' '}
                    <button onClick={() => handleLike(blog)}>like</button>
                </div>
                <div>{blog.user.name}</div>
                {blog.user.username === user.username && removeButton()}
            </div>
        </div>
    )
}

export default Blog
