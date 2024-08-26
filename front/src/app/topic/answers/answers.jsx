import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Answer from './answer'

const Answers = ({ title }) => {
	const [answers, setAnswers] = useState([])
	const [loading, setLoading] = useState(true)

	const fetchAnswers = async () => {
		try {
			const response = await axios.get(
				`http://srv509462.hstgr.cloud:8001/api/messages/by-topic-title/${title}/answers/`
			)
			if (response.status === 200) {
				setAnswers(response.data)
			} else {
				console.error('Failed to fetch the answers of the topic.')
			}
		} catch (error) {
			console.error('Error fetching answers: ', error)
		} finally {
			setLoading(false)
		}
	}

	const handleReactUp = async (id) => {
		try {
			await axios.post(
				`http://srv509462.hstgr.cloud:8001/api/messages/${id}/react-up/`
			)
			fetchAnswers()
		} catch (error) {
			console.error('Error reacting up: ', error)
		}
	}

	const handleReactDown = async (id) => {
		try {
			await axios.post(
				`http://srv509462.hstgr.cloud:8001/api/messages/${id}/react-down/`
			)
			fetchAnswers()
		} catch (error) {
			console.error('Error reacting down: ', error)
		}
	}

	useEffect(() => {
		fetchAnswers()
	}, [title])

	if (loading) {
		return <p>Loading answers...</p>
	}

	return (
		<div>
			{answers.length > 0 ? (
				answers.map((answer) => (
					<Answer
						key={answer.id}
						username={answer.username}
						text={answer.text}
						reactions={answer.reactions}
						created_at={answer.created_at}
						onReactUp={() => handleReactUp(answer.id)}
						onReactDown={() => handleReactDown(answer.id)}
					/>
				))
			) : (
				<p>No answers found.</p>
			)}
		</div>
	)
}

export default Answers
