import firebase from '../db/connect';

/**
 * @function Login to firebase user mngmt.
 * @param email {String} The email address.
 * @param pw {String} The password.
 */
function login(email, pw) {
    return firebase.auth().signInWithEmailAndPassword(email, pw);
}
/**
 * @function Resister a new user to firebase user mngmt.
 * @param email {String} The email address.
 * @param pw {String} The password.
 */
function register(email, pw) {
    return firebase.auth().createUserWithEmailAndPassword(email, pw);
}

/**
 * @function Logout the current active session from firebase user mngmt.
 */
function logout() {
    return firebase.auth().signOut();
}

function auth(){
	return firebase.auth();
}

export const userManager = { 
	login, 
	register, 
	logout,
	auth,
	loggedIn: ()=> {
		return firebase.auth().currentUser 
	} 
};

export default userManager;