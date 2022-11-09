import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('Blog form calls the event handler with the right details', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const inputs = screen.getAllByRole('textbox')
    const sendButton = screen.getByText('create')

    await user.type(inputs[0], 'testing blog form')
    await user.type(inputs[1], 'blog form tester')
    await user.type(inputs[2], 'testing.blog.form')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing blog form')
    expect(createBlog.mock.calls[0][0].author).toBe('blog form tester')
    expect(createBlog.mock.calls[0][0].url).toBe('testing.blog.form')
})
