import firebase from '../db/connect';
const db = firebase.database(),
	  allPosts = db.ref('posts');

/**
 * @function getAllPostSummaries
 * @param {Function} watcher Receives the posts data, fires on each model & db update. 
 */
function getAllPostSummaries(watcher){
    // Get the posts collection from the db.
    allPosts.on('value', (snapshot) => {
        const val = snapshot.val() || {},
              postUUIDs = Object.keys(val);

        // Pull the post summary data away from the UUID top layer key.
        watcher(postUUIDs.map((UUID) => {
            const post = val[UUID];

            // Clean up the post object since only summary data is needed.
            delete post.content;

            // Give the filtered post back to the caller
            return post;
        }));
    });
}

function killListeners(node){
	allPosts.off();
	db.ref('comments').off();
	db.ref('posts').off();
}

/**
 * @function retPostRef Provides a referemce to the posts collections.
 * @param {  } UUID [description]
 * @return {[type]}      [description]
 */
function retPostRef(UUID){
	return db.ref(`posts/${UUID}`);
}

function retCommentRef(postUUID, commentUUID){
	return db.ref(`comments/${postUUID}/${commentUUID}`)
}

function retCommentsRef(postUUID){
	return db.ref(`comments/${postUUID}`);
}

function getPost(postUUID, watcher){
	return retPostRef(postUUID).on('value', (snapshot)=> {
		watcher(snapshot.val())
	});
}

function newPost(newPostUUID, postDetails){
	return retPostRef(newPostUUID).set(postDetails);
}

function deletePost(postUUID){
	return retPostRef(postUUID).set({});
}

function getAllCommentsForPost(postUUID, watcher){
	return retCommentsRef(postUUID).on('value', (snapshot)=>{
		watcher(snapshot.val());
	});
}

function newComment(existingPostUUID, newCommentUUID, commentDetails){
	return retCommentRef(
		existingPostUUID, 
		newCommentUUID).set(commentDetails);
}

function deleteComment(existingPostUUID, exisitingCommentUUID){
	return  retCommentRef(
		existingPostUUID, 
		exisitingCommentUUID).set({});	
}

function deleteAllCommentsForPost(existingPostUUID){
	return  retCommentsRef(
		existingPostUUID).set({});
}

/**
 * @Object  dataManager
 * @description  Handles all IO for posts and comments.
 */
export const dataManager = {
    posts: {
        delete: deletePost,
        get: getPost,
        getAll: getAllPostSummaries,
        new: newPost,
        killListeners,
    },
    comments: {
        delete: deleteComment,
        deleteAllForPost: deleteAllCommentsForPost,
        getAll: getAllCommentsForPost,
        new: newComment
    }
};

export default dataManager;