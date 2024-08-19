import React from 'react'
import Header from './Header'
import Aside from './Aside'
import LatestTopic from '../questions/topics/topics'

const Landing = () => {
	return (
		<>
			<Header />
			<div style={{ display: 'flex' }}>
				<Aside />
				<div style={{ flexGrow: 1, padding: '20px' }}>
					<h1>Свежий вопрос</h1>
					<LatestTopic />
				</div>
			</div>
		</>
	)
}

export default Landing
