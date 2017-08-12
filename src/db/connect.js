import firebase from 'firebase'; 
import dbConfig from './db-config.js';

firebase.initializeApp(dbConfig);

export default firebase;