import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Topic = ({ id, title, owner, created_at, views }) => {
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

	return (
		<div>
			<div className='bg-white shadow-md rounded p-4 border border-gray-300 mb-2'>
				<Link
					style={{ textDecoration: 'none', color: 'black' }}
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
				<div>{views} views</div>
				<div>{created_at}</div>
			</div>
		</div>
	)
}

export default Topic
