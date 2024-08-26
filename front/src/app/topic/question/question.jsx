import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import MessageForm from '../../forms/MessageForm/messFrom'
import Answers from '../answers/answers'

function TopicPage() {
	const { id } = useParams()
	const [title, setTitle] = useState('')
	const [questions, setQuestions] = useState([])
	const [topic, setTopic] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			await fetchTitle()
			if (title) {
				await fetchQuestions()
			}
		}
		fetchData()
	}, [title])

	const fetchTitle = async () => {
		try {
			const response = await axios.get(
				`http://srv509462.hstgr.cloud:8001/api/topics/${id}/`
			)
			if (response.status === 200) {
				setTitle(response.data.title)
				setTopic(response.data)
			} else {
				console.error('Failed to fetch the title of the topic.')
			}
		} catch (error) {
			console.error('Error fetching title: ', error)
		}
	}

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

	const handleReaction = async (messageId, reaction) => {
		try {
			const response = await axios.post(
				`http://srv509462.hstgr.cloud:8001/api/messages/${messageId}/react/`,
				{ reaction }
			)
			if (response.status === 200) {
				setQuestions((prevQuestions) =>
					prevQuestions.map((question) =>
						question.id === messageId
							? { ...question, reactions: response.data.reactions }
							: question
					)
				)
			} else {
				console.error('Failed to send reaction.')
			}
		} catch (error) {
			console.error('Error sending reaction: ', error)
		}
	}

	if (loading) {
		return <p>Loading questions...</p>
	}

	return (
		<div className='p-4 max-w-2xl'>
			<h1 className='text-2xl font-bold'>{title}</h1>
			{questions.length > 0 ? (
				questions.map((question) => (
					<div
						key={question.id}
						className='bg-white p-4 border border-gray-200 rounded-lg shadow-sm'
					>
						<div className='mb-2'>
							<strong className='text-gray-700'>Username:</strong>{' '}
							{question.username}
						</div>
						<div className='mb-2'>
							<strong className='text-gray-700'>Text:</strong> {question.text}
						</div>
						<div className='flex items-center space-x-4'>
							<button onClick={() => handleReaction(question.id, 'up')}>
								<span>⬆️</span>
							</button>
							<span>{question.reactions}</span>
							<button onClick={() => handleReaction(question.id, 'down')}>
								<span>⬇️</span>
							</button>
						</div>
						<div>
							<strong className='text-gray-700'>Created At:</strong>{' '}
							{formatDate(question.created_at)}
						</div>
					</div>
				))
			) : (
				<p className='text-center text-gray-500'>No questions found.</p>
			)}
			<MessageForm topic={topic} />
			<Answers title={title} />
		</div>
	)
}

export default TopicPage
