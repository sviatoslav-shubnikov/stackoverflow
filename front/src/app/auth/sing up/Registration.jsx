import React, { useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

const Registration = ({ setType }) => {
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(null)

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError(null)

		try {
			const response = await axios.post(
				'http://srv509462.hstgr.cloud:8001/user/sign-up/',
				{
					email,
					username,
					password,
				}
			)

			window.location.href = '/user/sign-in'
		} catch (err) {
			setError(err.response?.data || 'Registration failed')
		}
	}

	return (
		<div className='form-container sign-up-container'>
			<form onSubmit={handleSubmit}>
				<button
					type='button'
					className='btn btn-outline-dark m-2'
					onClick={() => setType('login')}
				>
					Login
				</button>

				<div className='form-group'>
					<label htmlFor='exampleInputEmail1'>Email address</label>
					<input
						type='email'
						className='form-control'
						id='exampleInputEmail1'
						aria-describedby='emailHelp'
						placeholder='Enter email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<small id='emailHelp' className='form-text text-muted'>
						We'll never share your email with anyone else.
					</small>
				</div>
				<div className='form-group'>
					<label htmlFor='exampleInputUsername'>Username</label>
					<input
						type='text'
						className='form-control'
						id='exampleInputUsername'
						placeholder='Enter Username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='exampleInputPassword1'>Password</label>
					<input
						type='password'
						className='form-control'
						id='exampleInputPassword1'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				{error && (
					<div style={{ color: 'red', fontWeight: '24px' }}>{error}</div>
				)}
				<button type='submit' className='btn btn-primary'>
					Sign Up
				</button>
			</form>
		</div>
	)
}

export default Registration
