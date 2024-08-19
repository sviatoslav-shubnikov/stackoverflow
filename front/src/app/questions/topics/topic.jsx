import React from 'react'
import { Link } from 'react-router-dom'

const Topic = ({ id, title, owner, created_at, views }) => {
	return (
		<div>
			<div className='bg-white shadow-md rounded p-4 border border-gray-300'>
				<Link
					style={{ textDecoration: 'none', color: 'black' }}
					to={`/question/${id}`}
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
