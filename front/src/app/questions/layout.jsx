import React from 'react'
import Header from '../landing/Header'
import Aside from '../landing/Aside'
import AllTopic from './all topics/topics'

const Questions = () => {
	return (
		<>
			<Header />
			<div style={{ display: 'flex' }}>
				<Aside />
				<div style={{ flexGrow: 1, padding: '20px' }}>
					<h1>Все вопросы</h1>
					<AllTopic />
				</div>
			</div>
		</>
	)
}

export default Questions
