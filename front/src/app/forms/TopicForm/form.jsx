import React, { useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

const TopicForm = () => {
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [error, setError] = useState(null)

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError(null)

		try {
			const response = await axios.post('http://localhost:8000/api/topics/', {
				title,
			})

			const response2 = await axios.post(
				'http://localhost:8000/api/messages/',
				{
					topic: title,
					message_type: 'Q',
					text,
				}
			)

			window.location.href = '/questions'
		} catch (err) {
			setError(err.response?.data || 'Adding failed')
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='exampleInputEmail1'>Title</label>
					<input
						type='text'
						className='form-control'
						id='exampleInputEmail1'
						aria-describedby='emailHelp'
						placeholder='Enter question title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='exampleInputUsername'>Question Text</label>
					<input
						type='text'
						className='form-control'
						id='exampleInputUsername'
						placeholder='Enter question'
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
				</div>
				{error && (
					<div style={{ color: 'red', fontWeight: '24px' }}>{error}</div>
				)}
				<button type='submit' className='btn btn-primary'>
					Add Question
				</button>
			</form>
		</>
	)
}

export default TopicForm
