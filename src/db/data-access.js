import firebase from '../db/connect';

/**
 * @function Login to firebase user mngmt.
 * @param email {String} The email address.
 * @param pw {String} The password.
 */
function login(email, pw) {
    firebase.auth().signInWithEmailAndPassword(email, pw, ()=>{
        alert('Signed in!');
    }).catch(function() {
        alert('Error!');
    });
}

/**
 * @function Resister a new user to firebase user mngmt.
 * @param email {String} The email address.
 * @param pw {String} The password.
 */
function register(username, pw) {
    firebase.auth().ref.createUser(username, pw, function(error, userData) {
        if (error) {
            switch (error.code) {
                case "EMAIL_TAKEN":
                    alert("The new user account cannot be created because the email is already in use.");
                    break;
                case "INVALID_EMAIL":
                    alert("The specified email is not a valid email.");
                    break;
                default:
                    alert("Error creating user:", error);
            }
        } 
        else {
            alert("Successfully created user account with uid:", userData.uid);
        }
    });
}

/**
 * @function Logout the current active session from firebase user mngmt.
 */
function logout() {
    firebase.auth().signOut().then(function(){
    	alert('Signed out!');
    });
}

export default { 
	login, 
	register, 
	logout 
};