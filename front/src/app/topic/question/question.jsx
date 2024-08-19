import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Answers from '../answers/answers'
import MessageForm from '../../forms/MessageForm/messFrom'

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
				`http://localhost:8000/api/topics/${id}/`
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
				`http://localhost:8000/api/messages/by-topic-title/${encodeURIComponent(
					title
				)}/questions/`
			)
			if (response.status === 200) {
				setQuestions(response.data)
				console.log(response.data)
			} else {
				console.error('Failed to fetch the questions of the topic.')
			}
		} catch (error) {
			console.error('Error fetching questions: ', error)
		} finally {
			setLoading(false)
		}
	}

	// Форматирование даты
	const formatDate = (dateString) => {
		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
			timeZoneName: 'short',
		}
		return new Date(dateString).toLocaleDateString(undefined, options)
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
						<div className='flex flex-col space-y-2'>
							<div>
								<strong className='text-gray-700'>Positive Reactions:</strong>{' '}
								{question.positive_reactions}
							</div>
							<div>
								<strong className='text-gray-700'>Negative Reactions:</strong>{' '}
								{question.negative_reactions}
							</div>
							<div>
								<strong className='text-gray-700'>Created At:</strong>{' '}
								{formatDate(question.created_at)}
							</div>
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
