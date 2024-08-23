import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Topic from './topic'

const AllTopic = () => {
	const [topics, setTopics] = useState([])
	const [loading, setLoading] = useState(true)

	const fetchTopics = async () => {
		try {
			const response = await axios.get(
				'http://srv509462.hstgr.cloud:8001/api/topics/'
			)
			if (response.status === 200) {
				const sortedTopics = response.data.sort((a, b) => b.id - a.id)
				setTopics(sortedTopics)
			} else {
				console.error('Failed to fetch the topics.')
			}
		} catch (error) {
			console.error('Error fetching topics:', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchTopics()
	}, [])

	if (loading) {
		return <p>Loading topics...</p>
	}

	return (
		<div>
			{topics.length > 0 ? (
				topics.map((topic) => <Topic key={topic.id} {...topic} />)
			) : (
				<p>No topics found.</p>
			)}
		</div>
	)
}

export default AllTopic
