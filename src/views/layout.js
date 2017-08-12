// 3rd party libs.
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// Only the bootstrap styles are needed.
import 'bootstrap/dist/css/bootstrap.css';

import userManager from '../db/user-manager';

// Views.
import Main from './main';
import Login from './login';
import Register from './register';

// Layout "global" components.
import NavBar from '../components/navbar.js';

// Main global component housing all other views dynamically.
export class Layout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: userManager.loggedIn() 
		};
		this.loginView = this.loginView.bind(this);
		this.logout = this.logout.bind(this);
		this.login = this.login.bind(this);
	}

	componentDidMount() {
		userManager.auth().onAuthStateChanged((user)=>{
			  if (user) {
			    // User is signed in.
			    this.setState({loggedIn: true});
			  } else {
			    this.setState({loggedIn: true});
			  }
		});
	}		

	logout(){
		userManager.logout().then(()=>{
			this.setState({
				loggedIn: false
			});
		});
	}

	login(email, pw){
		userManager.login(email, pw).then(()=>{
			this.setState({
				loggedIn: true
			});
		});	
	}

	loginView(){
		return <Login login={this.login} loggedIn={this.state.loggedIn} />;
	}

	render(){
		return (
			<div>
				<h1>Welcome!</h1>
				<BrowserRouter>
					<div>
						<NavBar loggedIn={this.state.loggedIn} 
								logout={this.logout}/>
						<Route exact path='/' component={Main}/>
						<Route exact path='/login' render={this.loginView} />
						<Route exact path='/register' component={Register} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
}
 
export default Layout;