import React from 'react';
import dataManager from '../db/data-manager';
import $ from 'jquery';
import userManager from '../db/user-manager';

import routeData from '../route-data';

export class NewPost extends React.Component {
	constructor(){
		super();
		this.newPostTitleID = 'new-post-title';
		this.newPostContentID = 'new-post-content';
		this.newPostCreateID = 'new-post-create';
		this.time = new Date().getTime();
	}

	newPost(event){
		const $newPostTitle = $(`#${this.newPostTitleID}`),
			  $newPostContent = $(`#${this.newPostContentID}`),
			  newPostSubmit = document.getElementById(this.newPostCreateID);
		
		event.preventDefault();
		this.props.toggleButtonDisable(newPostSubmit, 'off');
		dataManager.posts.new(this.props.UUID, {
				content: $newPostContent.val(),
				UUID: this.props.UUID,
				username: this.props.username,
				title: $newPostTitle.val(),
				time: this.time,
				userAuth: userManager.auth().currentUser.uid
		}).then(()=>{
			this.props.toggleButtonDisable(newPostSubmit, 'on');
			this.props.history.push(routeData.filter((route)=>{
				return route.label.toLowerCase() === 'main';
			})[0].path);
		});
	}

	componentDidMount() {
	  $(`#${this.newPostCreateID}`).on('click', (event)=> this.newPost(event));
	}

	componentWillUnmount() {
		dataManager.posts.killListeners();
		$(`#${this.newPostCreateID}`).off('click');
	}

	render(){
		return (
			<div>
				<input type="text" id={this.newPostTitleID} />
				<textarea id={this.newPostContentID}></textarea>
				<button id={this.newPostCreateID}>Create new post</button>
			</div>
		);
	}
}

export default NewPost;