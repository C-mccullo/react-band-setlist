import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css"

const Header = (props) => {

	function hasUserImg({currentUser}) {
		const user = currentUser;
		// console.log(user.displayName, user.photoURL);
		if (currentUser !== "") {
			return (
				<div className="user">
					<img className="user_gravatar" src={user.photoURL} alt={ user.displayName }/>
					<h5>{user.displayName}</h5>
				</div>
			)
		}
	}

	return(
		<header className="app_header">
			<nav>
				<ul>
					<li><NavLink activeClassName="current" exact to="/">Home</NavLink></li>
					<li>
						<NavLink activeClassName="current" to="/setlists">
							All lists 
							{ props.count ? <span className="link_notificationBadge">{props.count}</span> : ""}
						</NavLink>
					</li>
					{/* <li><NavLink activeClassName="current" to="/generatelist">Make new list</NavLink></li> */}
					<li><NavLink activeClassName="current" to="/login">Log in</NavLink></li>
				</ul>
			</nav>
			{ props.currentUser ? hasUserImg(props) : "" }
		</header>
	)
}

export default Header
