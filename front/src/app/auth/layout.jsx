import React, { useState } from 'react'
import './style.css'
import Registration from './sing up/Registration'
import Login from './sign in/Login'

const Authentification = ({ types }) => {
	const [type, setType] = useState(types)
	return (
		<>
			<div className={`contain ${type === 'reg' ? 'reg-panel-active' : ''}`}>
				<Registration setType={setType} />
				<Login setType={setType} />
			</div>
		</>
	)
}

export default Authentification
