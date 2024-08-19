import React from 'react'
import Header from '../landing/Header'
import Aside from '../landing/Aside'
import { useParams } from 'react-router-dom'
const FullTopic = () => {
	return (
		<>
			<Header />
			<div style={{ display: 'flex' }}>
				<Aside />
				<div style={{ flexGrow: 1, padding: '20px' }}></div>
				{/* questions */}
				<div>soon</div>
				{/* answers */}
			</div>
		</>
	)
}

export default FullTopic
