import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Topic from './topic'

const LatestTopic = () => {
	const [latestTopic, setLatestTopic] = useState(null)
	const [loading, setLoading] = useState(true)

	const fetchLatestTopic = async () => {
		try {
			const response = await axios.get(
				'http://srv509462.hstgr.cloud:8001/api/latest-topic/'
			)
			if (response.status === 200) {
				setLatestTopic(response.data)
			} else {
				console.error('Failed to fetch the latest topic.')
			}
		} catch (error) {
			console.error('Error fetching latest topic:', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchLatestTopic()
	}, [])

	if (loading) {
		return <p>Loading latest topic...</p>
	}

	return latestTopic ? <Topic {...latestTopic} /> : <p>No topics found.</p>
}

export default LatestTopic
