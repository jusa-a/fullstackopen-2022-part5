import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

let container
const handleLike = jest.fn()

beforeEach(() => {
    const blog = {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        user: {
            username: 'Jusa',
            name: 'Jusa',
            id: '63611eb9a7b64eab7a2f6b8f',
        },
    }

    container = render(
        <Blog blog={blog} user={blog.user} handleLike={handleLike} />
    ).container
})

test('renders title and author', () => {
    const div = container.querySelector('.blogDiv')
    expect(div).toHaveTextContent(
        'Go To Statement Considered Harmful Edsger W. Dijkstra'
    )
})

test('does not render url or likes by default', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
})

test('after clicking the button, detials are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
})

test('clicking the like button twice calls event handler twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(handleLike.mock.calls).toHaveLength(2)
})
