import React from 'react'

const Answer = ({
	username,
	text,
	positive_reactions,
	negative_reactions,
	created_at,
}) => {
	return (
		<div className='bg-white p-4 border border-gray-200 rounded-lg shadow-sm'>
			<div>
				<strong>Username:</strong> {username}
			</div>
			<div>
				<strong>Text:</strong> {text}
			</div>
			<div>
				<strong>Positive Reactions:</strong> {positive_reactions}
			</div>
			<div>
				<strong>Negative Reactions:</strong> {negative_reactions}
			</div>
			<div>
				<strong>Created At:</strong> {created_at}
			</div>
		</div>
	)
}

export default Answer
