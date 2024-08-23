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
				console.log(response.data)
			} else {
				console.error('Failed to fetch the answers of the topic.')
			}
		} catch (error) {
			console.error('Error fetching answers: ', error)
		} finally {
			setLoading(false)
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
						positive_reactions={answer.positive_reactions}
						negative_reactions={answer.negative_reactions}
						created_at={answer.created_at}
					/>
				))
			) : (
				<></>
			)}
		</div>
	)
}

export default Answers
