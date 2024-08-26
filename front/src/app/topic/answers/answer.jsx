import React from 'react'

const Answer = ({
	username,
	text,
	reactions,
	created_at,
	onReactUp,
	onReactDown,
}) => {
	return (
		<div className='bg-white p-4 border border-gray-200 rounded-lg shadow-sm'>
			<div>
				<strong>Username:</strong> {username}
			</div>
			<div>
				<strong>Text:</strong> {text}
			</div>
			<div className='flex items-center space-x-4'>
				<button onClick={onReactUp} className='focus:outline-none'>
					<span>⬆️</span>
				</button>
				<span>{reactions}</span>
				<button onClick={onReactDown} className='focus:outline-none'>
					<span>⬇️</span>
				</button>
			</div>
			<div>
				<strong>Created At:</strong> {created_at}
			</div>
		</div>
	)
}

export default Answer
