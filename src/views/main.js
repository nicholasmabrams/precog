import React from 'react';

import PostSummary from '../components/posts-summary';

// Main default view.
export class Main extends React.Component {
	
	render(){
		return(
			<div>
				Main!
				<PostSummary posts={this.props.posts} />
			</div>
		);
	}
}

export default Main;