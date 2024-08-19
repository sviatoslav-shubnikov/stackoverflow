import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const Answer = ({username,
	text,
	positive_reactions,
	negative_reactions,
	created_at}) =>{
	

	return (<>
	<div>
			<div>{username}</div>
			<div>{text}</div>

			<div>
				<div>{positive_reactions}</div>
				<div>{negative_reactions}</div>
				<div>{created_at}</div>
			</div>

			</div>
	</>)
}


export default Answer;
