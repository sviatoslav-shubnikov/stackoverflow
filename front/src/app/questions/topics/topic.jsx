import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Topic = ({ id, title, owner, created_at, views }) => {
	const [questions, setQuestions] = useState([])

	const handleClick = async () => {
		try {
			const response = await axios.put(
				`http://srv509462.hstgr.cloud:8001/api/topics/${id}/increment-views/`
			)
			console.log('Views incremented:', response.data)
		} catch (error) {
			console.error('Error incrementing views:', error)
		}
	}
	useEffect(() => {
		fetchQuestions()
	}, [])
	const fetchQuestions = async () => {
		try {
			const response = await axios.get(
				`http://srv509462.hstgr.cloud:8001/api/messages/by-topic-title/${encodeURIComponent(
					title
				)}/questions/`
			)
			if (response.status === 200) {
				setQuestions(response.data)
			} else {
				console.error('Failed to fetch the questions of the topic.')
			}
		} catch (error) {
			console.error('Error fetching questions: ', error)
		} finally {
			setLoading(false)
		}
	}
	return (
		<div>
			<div className='bg-white shadow-md rounded p-4 border border-gray-300'>
				<Link
					style={{ textDecoration: 'none', color: 'black' }}
					to={`/question/${id}`}
					onClick={async (e) => {
						e.preventDefault()

						console.log('Hi')
						await handleClick()
						window.location.href = `/question/${id}`
					}}
				>
					<h4>{title}</h4>
				</Link>
				<div>{owner}</div>
				<div>{questions.reaction} reactions</div>
				<div>{views} views</div>
				<div>{created_at}</div>
			</div>
		</div>
	)
}

export default Topic
