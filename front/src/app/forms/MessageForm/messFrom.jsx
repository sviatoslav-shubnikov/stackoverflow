import React, { useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

const MessageForm = ({ topic }) => {
	// Проверьте, что topic и topic.id существуют
	console.log('Topic:', topic)
	console.log('Topic ID:', topic?.id)

	const [text, setText] = useState('')
	const [error, setError] = useState(null)

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError(null)
		const token = localStorage.getItem('token')

		if (!text) {
			setError('Text is required')
			return
		}

		if (!topic || !topic.id) {
			setError('Invalid topic information')
			return
		}

		try {
			const response = await axios.post(
				'http://localhost:8000/api/messages/',
				{
					topic: topic.id,
					message_type: 'A',
					text,
				},
				{
					headers: {
						Authorization: `token ${token}`,
					},
				}
			)

			console.log('Message added successfully:', response.data)
		} catch (err) {
			let errorMessage = 'Adding failed'

			if (err.response) {
				if (err.response.data) {
					if (typeof err.response.data === 'string') {
						errorMessage = err.response.data
					} else if (err.response.data.message) {
						errorMessage = err.response.data.message
					} else {
						errorMessage = 'Unknown server error'
					}
				}
			} else if (err.request) {
				errorMessage =
					'No response from server. Please check your connection or try again later.'
			} else {
				errorMessage = `Error in request setup: ${err.message}`
			}

			console.log('Error response:', err.response)
			console.log('Error status:', err.response?.status)
			console.log('Error data:', err.response?.data)
			setError(errorMessage)
		}
	}
	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className='mb-3'>
					<label htmlFor='messageInput' className='form-label'>
						Add Answer
					</label>
					<textarea
						className='form-control'
						id='messageInput'
						rows='3'
						placeholder='Enter Answer...'
						value={text}
						onChange={(e) => setText(e.target.value)}
					></textarea>
				</div>
				{error && (
					<div style={{ color: 'red', fontWeight: 'bold' }}>{error}</div>
				)}
				<button type='submit' className='btn btn-primary'>
					Add
				</button>
			</form>
		</>
	)
}

export default MessageForm
