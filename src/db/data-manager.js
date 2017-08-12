/**
 * @function newPost
 * @description adds a new post for a logged in user to the database.
 */
function newPost(){
	
}

/**
 * @function newPost
 * @description adds a new post for a logged in user for whom the post 
 *			    originated from the database.
 */
function deletePost(){
	
}

/**
 * @function newPost
 * @description deletes a comment for a logged in user from any public post 
 *   			where they commented, or by the blog post author.
 */
function deleteComment(){
	
}

/**
 * @function newComment
 * @description adds a new comment for a logged in user to the database under 
 * 				the post commented on.
 */
function newComment(){
	
}

export const dataManager = {
	newPost,
	deletePost,
	deleteComment,
	newComment
};

export default dataManager;