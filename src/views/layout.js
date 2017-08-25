// 3rd party libs.
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// Only the bootstrap styles are needed.
import 'bootstrap/dist/css/bootstrap.css';

// User management.
import userManager from '../db/user-manager';

import UUID from '../util/UUID.js';

// Views.
import Main from './main';
import Login from './login';
import Register from './register';
import NewPost from './new-post';
import Post from './post';

// Layout "global" components.
import NavBar from '../components/navbar.js';

// Main global component housing all other views dynamically.
export class Layout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: userManager.loggedIn(),
			mounted: false
		};
		this.loginView = this.loginView.bind(this);
		this.logout = this.logout.bind(this);
		this.login = this.login.bind(this);
		this.newPostView = this.newPostView.bind(this);
		this.mainSummaryView = this.mainSummaryView.bind(this);
		this.fullPostDetailedView = this.fullPostDetailedView.bind(this);
		this.UUID = new UUID(36);
	}

	formatEmailToUsername(email){
		return email;
	}

	componentDidMount() {

		this.setState({
			mounted: true
		});

		userManager.auth().onAuthStateChanged((user)=>{
			  	/**
			  	 * In this case the return of loggedIn should always be
			  	 * null from the return of the firebase API 
			  	 */
			    this.setState({
			    	loggedIn: user ? this.formatEmailToUsername(user.email) : null
			    });
		});
	}

	toggleButtonDisable(btn, onOff){
		switch(onOff){
			case 'off':
				btn.innerHTML = 'Saving...'
				btn.disabled = true;
				btn.setAttribute('disabled', 'disabled');
			break;

			case 'on':
			default: 
				setTimeout(()=>{
					btn.innerHTML = 'Create new post'
					btn.disabled = false;
					btn.removeAttribute('disabled');
				}, 200);
		}
	}

	logout(){
		userManager.logout().then(()=>{
			this.setState({
				loggedIn: null
			});
		});
	}

	login(email, pw){
		return userManager.login(email, pw).then(()=>{
			this.setState({
				loggedIn:  this.formatEmailToUsername(email)
			});
		});	
	}

	loginView(props){
		return <Login 
		            history={props.history}
					toggleButtonDisable={this.toggleButtonDisable} 
					login={this.login} 
					loggedIn={this.state.loggedIn} />;
	}

	newPostView(props){
		return <NewPost 
					history={props.history}
					toggleButtonDisable={this.toggleButtonDisable} 
					username={this.state.loggedIn} 
					UUID={this.UUID.output()} />;
	}

	mainSummaryView(){
		return <Main 
					posts={this.state.posts} />;
	}

	fullPostDetailedView(props){
			return (
				<Post
					toggleButtonDisable={this.toggleButtonDisable} 
					history={props.history} 
					username={this.state.loggedIn} 
					postUUID={props.location.pathname.replace('/posts/','')}/>)
	}

	render(){
		return (
			<div>
				<h1>Welcome!</h1>
				<BrowserRouter>
					<div>
						{this.state.loggedIn}
						<NavBar 
							loggedIn={this.state.loggedIn} 
							logout={this.logout}/>
						<Route 
							exact 
							path='/' 
							render={this.mainSummaryView}/>
						<Route 
							exact 
							path='/newPost' 
							render={this.newPostView}/>
						<Route 
							exact 
							path='/login' 
							render={this.loginView}/>
						<Route 
							exact 
							path='/register' 
							component={Register}/>
						<Route 
							path='/posts/:postuuiid'
							component={this.fullPostDetailedView}/>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}
 
export default Layout;