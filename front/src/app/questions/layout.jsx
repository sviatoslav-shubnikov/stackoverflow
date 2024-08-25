import React, { useState } from 'react'
import Header from '../landing/Header'
import Aside from '../landing/Aside'
import AllTopic from './all topics/topics'
import useAuth from '../../hook/useAuth'
import { Link } from 'react-router-dom'

const Questions = () => {
	const { isAuthenticated } = useAuth()
	const [searchText, setSearchText] = useState('')

	return (
		<>
			<Header onSearch={setSearchText} />{' '}
			<div style={{ display: 'flex' }}>
				<Aside />
				<div style={{ flexGrow: 1, padding: '20px' }}>
					<button type='button' className='btn btn-primary justify-center'>
						<Link
							style={{ textDecoration: 'none', color: 'black' }}
							to={isAuthenticated ? '/add/topic' : '/user/sign-in'}
						>
							Create Question
						</Link>
					</button>
					<h1>Все вопросы</h1>
					<AllTopic searchText={searchText} />{' '}
				</div>
			</div>
		</>
	)
}

export default Questions
