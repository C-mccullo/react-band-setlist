import Firebase from 'firebase';

const config = {
	apiKey: "AIzaSyC_GumoLPgIALUv3ciIzidOYmvVl_H2zC4",
	authDomain: "set-list-app.firebaseapp.com",
	databaseURL: "https://set-list-app.firebaseio.com",
	projectId: "set-list-app",
	storageBucket: "set-list-app.appspot.com",
	messagingSenderId: "999433155297"
};

Firebase.initializeApp(config);

export const Provider = new Firebase.auth.GoogleAuthProvider();
export const Auth = Firebase.auth();
export default Firebase;