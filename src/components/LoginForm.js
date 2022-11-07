const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password,
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <h2>log in to application</h2>
            <div>
                username{' '}
                <input
                    type='text'
                    value={username}
                    onChange={handleUsernameChange}
                />
            </div>
            <div>
                password{' '}
                <input
                    type='password'
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <button type='submit'>login</button>
        </form>
    )
}
export default LoginForm
