import React, { useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

const MessageForm = ({ title }) => {
	const [text, setText] = useState('')
	const [error, setError] = useState(null)

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError(null)

		try {
			const response = await axios.post('http://localhost:8000/api/messages/', {
				topic: title,
				message_type: 'A',
				text,
			})

			window.location.href = '/questions'
		} catch (err) {
			setError(err.response?.data || 'Adding failed')
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div class='mb-3'>
					<label for='exampleFormControlTextarea1' class='form-label'>
						Add Answer
					</label>
					<textarea
						class='form-control'
						id='exampleFormControlTextarea1'
						rows='3'
						placeholder='Enter Answer...'
						value={text}
						onChange={(e) => setText(e.target.value)}
					></textarea>
				</div>
				{error && (
					<div style={{ color: 'red', fontWeight: '24px' }}>{error}</div>
				)}
				<button type='submit' className='btn btn-primary'>
					Add
				</button>
			</form>
		</>
	)
}

export default MessageForm
