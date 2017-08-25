import React from 'react';
import dataManager from '../db/data-manager';
import moment from 'moment';

import Comments from '../components/comments.js';

export class Post extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			postData: null
		};

		this.deletePost = this.deletePost.bind(this);
	}
	componentWillMount() {
		dataManager.posts.get(this.props.postUUID, (postData)=>{
			this.setState({
				postData
			});
		});
	}
	componentWillUnmount() {
		dataManager.posts.killListeners();
	}

	deletePost(){		
		// Delete the comments for the post, and also the comments related to the post.
		dataManager.posts.delete(this.props.postUUID).then(()=>{
			dataManager.comments.deleteAllForPost(this.props.postUUID).then(()=>{
				// Bring the user home after deleting the post.
				this.props.history.push('/');				
			});
		});

	}

	render(){
		let title = 'Loading', 
			content = '...',
			username,
			time;

			if (this.state.postData){
				title = this.state.postData.title;
				content = this.state.postData.content;
				username = this.state.postData.username;
				time = moment(this.state.postData.time).format('MM/DD/YYYY');
			}

			return (<div>
						<div>
							<h4>Title: {title}</h4>
							<p>Content: {content}</p>
							<datetime>{time}</datetime>
							<span>{username}</span>
							<button to='/' onClick={this.deletePost}>Delete post</button>
								{ username === this.props.username? (<button to='/' onClick={this.deletePost}>Delete post</button>) : ''}
						</div>
						<Comments postUUID={this.props.postUUID} username={this.props.username}/>
						</div>);	
	}
} 

export default Post;