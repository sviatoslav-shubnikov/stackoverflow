import React from 'react'
import Header from '../landing/Header'
import Aside from '../landing/Aside'
import TopicPage from './question/question'
import Answers from './answers/answers'

const FullTopic = () => {
	return (
		<>
			<Header />
			<div style={{ display: 'flex' }}>
				<Aside />
				<div style={{ flexGrow: 0, padding: '20px' }}></div>
				<TopicPage />
				<Answers />
			</div>
		</>
	)
}

export default FullTopic
