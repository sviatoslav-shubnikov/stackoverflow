import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Answers from '../answers/answers';
import MessageForm from '../../forms/MessageForm/messFrom';

function TopicPage() {
  const { id } = useParams();
	const [title, setTitle]=useState('')
	const [question, setQuestion]=useState(null)
	const [loading, setLoading] = useState(true)


	const fetchTitle = async() =>{
		try {
			const response = await axios.get(`http://localhost:8000/api/topics/${id}`)
			if(response.status ===200){
				setTitle(response.data.title)
			}
			else{
				console.error('Faild to fetch the title of topic.');
			}
		}
		catch(error){
			console.error('Error fetching title: ', error)
		}
	}


	const fetchQuestion = async() =>{
		try {
			const response = await axios.get(`http://localhost:8000/api/messages/by-topic-title/${title}/questions/`)
			if(response.status ===200){
				setQuestion(response.data)
			}
			else{
				console.error('Faild to fetch the question of topic.');
			}
		}
		catch(error){
			console.error('Error fetching question: ', error)
		}
		finally {
			setLoading(false)
		}
	}



	useEffect(()=>{
		fetchTitle()
		fetchQuestion()
	},[])
	if (loading) {
		return <p>Loading question...</p>
	}
  if(question){return (
    
      <><h1>{title}</h1>
			<div>
			<div>{question.username}</div>
			<div>{question.text}</div>

			<div>
				<div>{question.positive_reactions}</div>
				<div>{question.negative_reactions}</div>
				<div>{question.created_at}</div>
			</div>

			</div>
			
			<MessageForm /> 
			<Answers title={title}/>

			</> 



			) }
			else{
				return (<p>No topics found.</p>)
			}
}

export default TopicPage;