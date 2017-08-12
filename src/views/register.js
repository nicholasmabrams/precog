import React from 'react';
import $ from 'jquery';
import userManager from '../db/user-manager';

function handleRegisterFromUI(event){
	const email = $('#register_email').val(),
		  pw = $('#register_pw').val();

	event.preventDefault();
	userManager.register(email, pw).then((error, userData)=>{
        if (error) {
            switch (error.code) {
                case "EMAIL_TAKEN":
                    alert("The new user account cannot be created because the email is already in use.");
                    break;
                case "INVALID_EMAIL":
                    alert("The specified email is not a valid email.");
                    break; 
                case "auth/email-already-in-use":
                	  alert('Existing user!');
                	break;
                default:
                    console.log("Error creating user:", error);
            }
        } 
        else {
            alert("Successfully created user account with uid:", userData.uid);
        }
    });
}

// View where a new user can register.
export class Register extends React.Component {
	render(){
		return (
			<div>
				<input id="register_email" placeholder="Email" type="email" />
				<input id="register_pw"  placeholder="Password" type="password" />
				<button onClick={handleRegisterFromUI}>Register</button>
			</div>
		);
	}
}

export default Register;