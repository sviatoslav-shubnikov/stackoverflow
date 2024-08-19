import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './app/landing/Header'
import Landing from './app/landing/Landing'
import Authentification from './app/auth/layout'
import Questions from './app/questions/layout'
import useAuth from './hook/useAuth'
import TopicForm from './app/forms/TopicForm/form'
import FullTopic from './app/topic/layout'

function App() {
	const { isAuthenticated, logout } = useAuth()

	return (
		<>
			<Router>
				<Routes>
					{isAuthenticated ? (
						<>
							<Route path='/' exact element={<Landing />} />
							<Route
								path='/user/sign-up'
								exact
								element={<Authentification types={'reg'} />}
							/>
							<Route
								path='/user/sign-in'
								exact
								element={<Authentification types={'login'} />}
							/>
							<Route path='/questions' exact element={<Questions />} />
							<Route path='/add/topic' exact element={<TopicForm />} />
							<Route path='/question/:id' element={<FullTopic />} />
						</>
					) : (
						<>
							<Route path='/' exact element={<Landing />} />
							<Route
								path='/user/sign-up'
								exact
								element={<Authentification types={'reg'} />}
							/>
							<Route
								path='/user/sign-in'
								exact
								element={<Authentification types={'login'} />}
							/>
							<Route path='/questions' exact element={<Questions />} />
							<Route path='/question/:id' element={<FullTopic />} />
						</>
					)}
				</Routes>
			</Router>
		</>
	)
}

export default App
