import React from 'react';
import { NavLink } from 'react-router-dom';
import UUID from '../util/UUID.js';

// Route data.
import routeData from './../route-data';

// The main navbar
class NavBar extends React.Component {
	constructor(props){
		super(props);
		this.handleLogoutFromUI = this.handleLogoutFromUI.bind(this);
		this.dynamicallyCreateNavigationItems = this.dynamicallyCreateNavigationItems.bind(this);
		this.UUID = new UUID(routeData.length);
	}

	handleLogoutFromUI(event){
		event.preventDefault();
		this.props.logout();
	}

	dynamicallyCreateNavigationItems(item){ 
			const templateItem = (
				<li key={this.UUID.output()}>
					<NavLink 
						key={this.UUID.output()}
						to={item.path}> {item.label}
					</NavLink>
				</li>
			),
			LogOutComponent = (
				<li key={this.UUID.output()}>
					<a onClick={this.handleLogoutFromUI} href="#!dsfs">Logout</a>
				</li>
			),
			normalizedItemName = item.label.toLowerCase().replace(' ', '_');

			// Allow items to flow through the filter, act on the ones defined below.
			switch (normalizedItemName){
				// Toggle logged in or logged out link.
				case 'login': {
					const LoginComponent = templateItem;
					
					return this.props.loggedIn? LogOutComponent : LoginComponent;
				}
				// No need to register if the user is logged in.
				case 'register': {
					if (this.props.loggedIn) return false;
					break;
				}
				// Only enable new posts for logged-in users.
				case 'new_post': {
					if (!this.props.loggedIn) return false;
					break;
				}
				// This is intentional to stop react cli from complaining for no reason here.
				default: break;
			}

			// Anthing not acted upon by here has the generic template for the nav item.
			return templateItem;
	}

	render(){
		return (
				<nav>
					<ul>
						{routeData.map(this.dynamicallyCreateNavigationItems)}
					</ul>
				</nav>
			);
		}
}

export default NavBar;