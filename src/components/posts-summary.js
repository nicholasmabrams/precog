import React from 'react';
import dataManager from '../db/data-manager';
import moment from 'moment';
import {Link} from 'react-router-dom';

export class PostSummary extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			postSummaryData: []
		};
	}

	componentDidMount() {
		dataManager.posts.getAll((postSummaryData)=>{
			this.setState({
				// If posts or no posts no posts
				postSummaryData
			});
		});
	}

	componentWillUnmount() {
		dataManager.posts.killListeners();
	}

	render(){
		const sortedPosts = this.state.postSummaryData.sort(sortByTime);

		function sortByTime(postA, postB){
			return postA.time < postB.time;
		}

		return (
			<div>
				{ 
				sortedPosts.map((post)=> {
					return (	
							<ul key={post.UUID}>
								<li>Title: {post.title}</li>
								<li>ID: {post.UUID}</li>
								<li>By: {post.username}</li>
								<li>On: {moment(post.time).format('MM/DD/YYYY hh:mm:ss')}</li>
								<li>Location: <Link to={`posts/${post.UUID}`}>Goto</Link></li>
							</ul>)
					})
				}
			</div>
		);
	}
}

export default PostSummary;