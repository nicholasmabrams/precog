import React from 'react';
import dataManager from '../db/data-manager';
import UUID from '../util/UUID.js';
import moment from 'moment';

class Comments extends React.Component {
	constructor(){
		super();
		this.saveBtnId = 'comment-save';
		this.commentContentId = 'comment-content';
		this.commentPlaceholder = 'Comment';
		this.state = {
			comments: null
		};
		this.UUID = new UUID(36);
		this.saveComment = this.saveComment.bind(this);
	}

	componentDidMount() {
		dataManager.comments.getAll(this.props.postUUID, (comments)=>{
			this.setState({comments});
		});
	}

	componentWillUnmount() {
		dataManager.posts.killListeners();
	}
	
	deleteComment(commentUUID){
		dataManager.comments.delete(this.props.postUUID, commentUUID);
	}

	saveComment(){
		const commentContent = document.getElementById(this.commentContentId).value;

		dataManager.comments.new(
			this.props.postUUID.replace('/posts/', ''), 
			this.UUID.output(), {
				content: commentContent,
				username: this.props.username,
				time: new Date().getTime(),
				UUID: this.UUID.output()
		});
	}

	render(){
		const commentUUIDs = Object.keys(this.state.comments || {});

		return (
			<div>
				{commentUUIDs.map((key)=>{
					const comment = this.state.comments[key],
						  commentAuthor = comment.username,
						  commentTime = moment(comment.time).format('MM/DD/YYYY hh:mm:ss'); 
				  	return (
				  		<div key={key}>
				  			{comment.content}
				  			{comment.username}
				  			{commentTime}
				  			{this.props.username === commentAuthor? (
				  					<button onClick={()=>{
				  						this.deleteComment(key)}
				  					}>Delete</button>) : ''}
				  		</div>
				  	);
			  	})}
				 {this.props.username? (<div><textarea id={this.commentContentId} placeholder="Comment">
				</textarea><button onClick={this.saveComment}>Save comment</button></div>) : ('')} 
				
			</div>)
	}
}

export default Comments;