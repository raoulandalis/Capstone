import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){

	const history = useHistory();
	const sessionUser = useSelector(state => state.session.user);
	const user = useSelector(state => state.session.user);

	return (
		<div className="nav-house">
			<div className="logo-container">
				<NavLink exact to="/"><img src="https://i.imgur.com/O8Vs0OX.png" id="logo"></img></NavLink>
			</div>
			{isLoaded && (
				<div className="prof-btn">
				{user && (
				  <>
					<i
					  className="fa-solid fa-square-plus"
					  style={{ cursor: 'pointer', fontSize: '25px' }}
					  onClick={() => history.push("/create")}
					></i>
					<i className="fa-solid fa-house" style={{ cursor: 'pointer', fontSize: '20px' }} onClick={() => history.push("/posts")}></i>
				  </>
				)}
				<ProfileButton user={sessionUser} />
			  </div>
			)}
		</div>
	);
}

export default Navigation;
