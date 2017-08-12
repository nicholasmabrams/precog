import React from 'react';
import userManager from '../db/user-manager';
import $ from 'jquery';

// Pull the data from the UI on click, call the userManager login method directly.


// View where an existing user can login.
export class Login extends React.Component {
	constructor(props){
		super(props);
		this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
	}

	handleLoginSubmit(event){
		const email = $('#login_email').val(),
			  pw = $('#login_pw').val();
	  	event.preventDefault();

	  	this.props.login(email, pw);
	}

	render(){
		return (
			<div>
				<input id="login_email" value="nicholasmabrams@gmail.com" placeholder="Email" type="email" />
				<input id="login_pw" value="password"  placeholder="Password" type="password" />
				<button onClick={this.handleLoginSubmit}>Login</button>	
			</div>
		);
	}
}

export default Login;