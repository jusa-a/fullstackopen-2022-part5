import { useState } from 'react'

const Blog = ({ blog, handleLike }) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

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

    return (
        <div style={blogStyle}>
            <div>
                {blog.title} {blog.author}{' '}
                <button style={hideWhenVisible} onClick={toggleVisibility}>
                    view
                </button>
            </div>
            <div style={showWhenVisible}>
                <div>{blog.url}</div>
                <div>
                    {blog.likes}{' '}
                    <button onClick={() => handleLike(blog)}>like</button>
                </div>
                <div>{blog.user.name}</div>
                <button onClick={toggleVisibility}>hide</button>
            </div>
        </div>
    )
}

export default Blog
