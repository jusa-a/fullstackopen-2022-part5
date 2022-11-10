describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Blog Tester',
            username: 'blogtester',
            password: 'secret',
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.get('#login-form')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('blogtester')
            cy.get('#password').type('secret')
            cy.get('#login-button').click()

            cy.contains('Blog Tester logged-in')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('invaliduser')
            cy.get('#password').type('password')
            cy.get('#login-button').click()

            cy.get('.notification')
                .should('contain', 'invalid username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')

            cy.get('html').should('not.contain', 'logged-in')
        })
    })

    describe('When logged in,', function () {
        beforeEach(function () {
            cy.login({ username: 'blogtester', password: 'secret' })
        })

        it('a new blog can be created', function () {
            cy.contains('new blog').click()
            cy.get('input[name="title"]').type('a blog created by cypress')
            cy.get('input[name="author"]').type('cypress')
            cy.get('input[name="url"]').type('blog.cypress')
            cy.contains('create').click()
            cy.contains('a blog created by cypress cypress')
        })

        describe('and some blogs exist', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'first blog',
                    author: 'cypress',
                    url: 'blog.cy.1',
                })
                cy.createBlog({
                    title: 'second blog',
                    author: 'cypress',
                    url: 'blog.cy.2',
                })
                cy.createBlog({
                    title: 'third blog',
                    author: 'cypress',
                    url: 'blog.cy.2',
                })
            })

            it('user can like a blog', function () {
                cy.contains('first blog').contains('view').click()

                cy.contains('like').click()
                cy.contains('like').parent().should('contain', '1')
            })
        })
    })
})
