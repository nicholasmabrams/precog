import React from 'react';
import { NavLink } from 'react-router-dom';
// Route data.
import routeData from './../route-data';

// The main navbar
class NavBar extends React.Component {
	constructor(props){
		super(props);
		this.handleLogoutFromUI = this.handleLogoutFromUI.bind(this);
	}

	handleLogoutFromUI(event){
		event.preventDefault();
		this.props.logout();
	}

	render(){
		return (
			<nav>
				{routeData.map((item)=>{
					let navItem;
					switch (item.label.toLowerCase()){
						// Toggle logged in or logged out.
						case 'login':
							this.props.loggedIn? 
								navItem = <a onClick={this.handleLogoutFromUI} href="#">Logout</a>  
								: navItem = <NavLink to='/login'>Login</NavLink>;
								
								return navItem;
						break;

						case 'register':
							// No need to register if the user is logged in.
							if (this.props.loggedIn){
								return;
							}
						break;
					}
					return (<NavLink key={item.label} 
									 to={item.path}> {item.label}
							</NavLink>);
				})}
			</nav>
		);
		}
}

export default NavBar;