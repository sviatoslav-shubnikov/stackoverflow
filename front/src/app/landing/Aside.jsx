import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

const Aside = () => {
	return (
		<div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 '>
			<div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-black min-vh-100'>
				<ul
					className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-left align-items-sm-start'
					id='menu'
				>
					<li className='nav-item'>
						<Link style={{ textDecoration: 'none', color: 'black' }} to='/'>
							<i className='fs-4 bi-house'></i>
							<span className='ms-1 d-none d-sm-inline'>Home</span>
						</Link>
					</li>
					<li>
						<Link
							style={{ textDecoration: 'none', color: 'black' }}
							to='/questions'
						>
							<i className='fs-4 bi-speedometer2'></i>
							<span className='ms-1 d-none d-sm-inline'>Question</span>
						</Link>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Aside
