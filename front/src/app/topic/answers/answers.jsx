import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Answer from './answer'

const Answers = ({ title }) => {
	const [answers, setAnswers] = useState([])
	const [loading, setLoading] = useState(true)

	const fetchAnswers = async () => {
		try {
			const response = await axios.get(
				`http://localhost:8000/api/messages/by-topic-title/${title}/answers/`
			)
			if (response.status === 200) {
				setAnswers(response.data)
			} else {
				console.error('Faild to fetch the answers of topic.')
			}
		} catch (error) {
			console.error('Error fetching answers: ', error)
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		fetchAnswers()
	}, [])
	return answers ? <Answer {...answers} /> : <p>No topics found.</p>
}

export default Answers
