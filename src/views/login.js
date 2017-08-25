import React from 'react';
import $ from 'jquery';
import routeData from '../route-data';

// View where an existing user can login.
export class Login extends React.Component {
	constructor(props){
		super(props);
		this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
	}

	// Pull the data from the UI on click, call the userManager login method directly.
	handleLoginSubmit(event){
		const email = $('#login_email').val(),
			  pw = $('#login_pw').val();

	  	event.preventDefault();
	  	this.props.login(email, pw).then(()=>{
	  		this.props.history.push(routeData.filter((route)=>{
				return route.label.toLowerCase() === 'main';
			})[0].path);
	  	});
	}

	render(){
		return (
			<div>
				<input id="login_email" placeholder="Email" type="email" />
				<input id="login_pw" defaultValue="password"  placeholder="Password" type="password" />
				<button onClick={this.handleLoginSubmit}>Login</button>	
			</div>
		);
	}
}

export default Login;